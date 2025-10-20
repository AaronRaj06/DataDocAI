"""
Document Processor - Handles document ingestion and chunking
"""

from typing import Dict, Any, Optional, List
import os
import hashlib
from pathlib import Path

# Document parsing libraries
from PyPDF2 import PdfReader
from docx import Document

# Langchain for text splitting
try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter
except ImportError:
    from langchain.text_splitter import RecursiveCharacterTextSplitter


class DocumentProcessor:
    """
    Handles document processing: extraction, chunking, and preparation for embedding.
    """

    def __init__(self, chunk_size: int = 1000, chunk_overlap: int = 200):
        """
        Initialize document processor.

        Args:
            chunk_size: Size of text chunks in characters
            chunk_overlap: Overlap between chunks in characters
        """
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        
        # Initialize text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )

    def process(self, 
                file_path: str, 
                file_content: Optional[bytes] = None,
                metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Process and prepare documents for embedding.

        Args:
            file_path: Path to the document file
            file_content: Optional raw file content (for in-memory processing)
            metadata: Optional metadata about the document

        Returns:
            Dictionary with processing status, chunks, and metadata
        """
        try:
            print(f"📄 Processing document: {file_path}")
            
            # Generate unique document ID
            doc_id = self._generate_document_id(file_path)
            
            # Extract text from file
            text = self.extract_text(file_path, file_content)
            
            if not text or len(text.strip()) == 0:
                return {
                    "status": "error",
                    "message": "No text content extracted from document",
                    "document_id": doc_id,
                    "chunks": [],
                    "chunks_created": 0
                }
            
            # Split text into chunks
            chunks = self.chunk_text(text)
            
            # Prepare metadata for each chunk
            file_name = Path(file_path).name
            file_ext = Path(file_path).suffix
            
            chunk_metadata = []
            for i, chunk in enumerate(chunks):
                chunk_meta = {
                    "document_id": doc_id,
                    "chunk_index": i,
                    "total_chunks": len(chunks),
                    "file_name": file_name,
                    "file_type": file_ext,
                    "chunk_size": len(chunk)
                }
                # Add any additional metadata
                if metadata:
                    chunk_meta.update(metadata)
                chunk_metadata.append(chunk_meta)
            
            print(f"✅ Document processed: {len(chunks)} chunks created")
            
            return {
                "status": "success",
                "message": f"Document processed successfully into {len(chunks)} chunks",
                "document_id": doc_id,
                "chunks": chunks,
                "metadata": chunk_metadata,
                "chunks_created": len(chunks),
                "total_characters": len(text)
            }
            
        except Exception as e:
            print(f"❌ Error processing document: {e}")
            return {
                "status": "error",
                "message": f"Error processing document: {str(e)}",
                "document_id": None,
                "chunks": [],
                "chunks_created": 0
            }

    def extract_text(self, file_path: str, file_content: Optional[bytes] = None) -> str:
        """
        Extract text from various file formats.
        
        Args:
            file_path: Path to the document file
            file_content: Optional raw file content for in-memory processing

        Returns:
            Extracted text content
        """
        file_ext = Path(file_path).suffix.lower()
        
        try:
            if file_ext == '.pdf':
                return self._extract_pdf(file_path, file_content)
            elif file_ext == '.txt':
                return self._extract_txt(file_path, file_content)
            elif file_ext in ['.docx', '.doc']:
                return self._extract_docx(file_path, file_content)
            else:
                raise ValueError(f"Unsupported file format: {file_ext}")
        except Exception as e:
            raise Exception(f"Text extraction failed: {str(e)}")

    def _extract_pdf(self, file_path: str, file_content: Optional[bytes] = None) -> str:
        """Extract text from PDF file using PyPDF2."""
        text = ""
        reader = PdfReader(file_path)
        
        for page_num, page in enumerate(reader.pages):
            try:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"
            except Exception as e:
                print(f"⚠️  Warning: Could not extract text from page {page_num + 1}: {e}")
                continue
        
        return text.strip()

    def _extract_txt(self, file_path: str, file_content: Optional[bytes] = None) -> str:
        """Extract text from TXT file."""
        if file_content:
            return file_content.decode('utf-8', errors='ignore')
        
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()

    def _extract_docx(self, file_path: str, file_content: Optional[bytes] = None) -> str:
        """Extract text from DOCX file using python-docx."""
        doc = Document(file_path)
        text = ""
        
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text += paragraph.text + "\n\n"
        
        return text.strip()

    def chunk_text(self, text: str) -> List[str]:
        """
        Split text into chunks with overlap using langchain.
        
        Args:
            text: Text to split into chunks

        Returns:
            List of text chunks
        """
        if not text or len(text.strip()) == 0:
            return []
        
        chunks = self.text_splitter.split_text(text)
        return chunks

    def _generate_document_id(self, file_path: str) -> str:
        """
        Generate a unique ID for the document based on file path and name.
        
        Args:
            file_path: Path to the document

        Returns:
            Unique document ID (hash)
        """
        file_name = Path(file_path).name
        return hashlib.md5(file_name.encode()).hexdigest()[:16]


if __name__ == "__main__":
    # Test document processor
    processor = DocumentProcessor(chunk_size=500, chunk_overlap=50)
    print("\n🧪 Testing Document Processor...")
    print(f"Chunk size: {processor.chunk_size}")
    print(f"Chunk overlap: {processor.chunk_overlap}")
    
    # Test with sample text
    sample_text = "This is a test document. " * 100
    chunks = processor.chunk_text(sample_text)
    print(f"\nTest text chunking: {len(chunks)} chunks created")