"""
RAG Pipeline - Main orchestrator for document processing and query handling

This module coordinates:
- Document ingestion via DocumentProcessor
- Vector storage via VectorStore
- Query handling via QueryHandler
"""

from typing import Dict, Any, Optional
from .vector_store import VectorStore
from .document_processor import DocumentProcessor
from .query_handler import QueryHandler


class RAGPipeline:
    """
    Main RAG pipeline orchestrator that coordinates all RAG components.
    """

    def __init__(self, 
                 collection_name: str = "documents",
                 persist_directory: str = "./chroma_db",
                 chunk_size: int = 1000,
                 chunk_overlap: int = 200,
                 top_k: int = 3):
        """
        Initialize RAG pipeline with all components.

        Args:
            collection_name: Name of the ChromaDB collection
            persist_directory: Directory to persist vector database
            chunk_size: Size of text chunks for document processing
            chunk_overlap: Overlap between chunks
            top_k: Default number of results for retrieval
        """
        # Initialize components
        self.vector_store = VectorStore(collection_name, persist_directory)
        self.document_processor = DocumentProcessor(chunk_size, chunk_overlap)
        self.query_handler = QueryHandler(top_k)
        
        print(f"✅ RAG Pipeline initialized with modular components")

    def process_documents(self, 
                         file_path: str, 
                         file_content: Optional[bytes] = None,
                         metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Process and store documents in vector database.

        Args:
            file_path: Path to the document file
            file_content: Optional raw file content (for in-memory processing)
            metadata: Optional metadata about the document

        Returns:
            Dictionary with processing status and document ID
        """
        try:
            # Step 1: Process document (extract text and chunk)
            process_result = self.document_processor.process(
                file_path=file_path,
                file_content=file_content,
                metadata=metadata
            )
            
            if process_result["status"] != "success":
                return process_result
            
            # Step 2: Get chunks and metadata
            chunks = process_result["chunks"]
            chunk_metadata = process_result["metadata"]
            document_id = process_result["document_id"]
            
            if not chunks:
                return {
                    "status": "error",
                    "message": "No chunks created from document",
                    "document_id": document_id,
                    "chunks_created": 0
                }
            
            # Step 3: Generate unique IDs for each chunk
            chunk_ids = [f"{document_id}_chunk_{i}" for i in range(len(chunks))]
            
            # Step 4: Store in vector database (ChromaDB handles embeddings automatically)
            store_result = self.vector_store.add_documents(
                ids=chunk_ids,
                documents=chunks,
                metadatas=chunk_metadata
            )
            
            if store_result["status"] != "success":
                return {
                    "status": "error",
                    "message": f"Failed to store in vector database: {store_result.get('message')}",
                    "document_id": document_id,
                    "chunks_created": len(chunks)
                }
            
            print(f"🎉 Document stored successfully: {len(chunks)} chunks in vector DB")
            
            return {
                "status": "success",
                "message": f"Document processed and stored successfully",
                "document_id": document_id,
                "chunks_created": len(chunks),
                "total_characters": process_result.get("total_characters", 0),
                "file_name": metadata.get("file_name") if metadata else file_path
            }
            
        except Exception as e:
            print(f"❌ Error in process_documents: {e}")
            return {
                "status": "error",
                "message": f"Error processing document: {str(e)}",
                "document_id": None,
                "chunks_created": 0
            }
        

    def get_answer(self, 
                   query: str, 
                   top_k: int = 3,
                   score_threshold: float = 0.7) -> Dict[str, Any]:
        """
        Retrieve relevant context and generate answer using LLM.

        Args:
            query: User's question
            top_k: Number of top relevant chunks to retrieve
            score_threshold: Minimum similarity score for retrieved chunks

        Returns:
            Dictionary containing answer, sources, and metadata
        """
        # TODO: Implement in Phase 3
        # - Embed the query
        # - Retrieve top-k relevant chunks from ChromaDB
        # - Format context for LLM
        # - Call LLM API to generate answer
        # - Return answer with sources
        
        print(f"❓ Query received: {query}")
        
        return {
            "query": query,
            "answer": "Query processing placeholder - to be implemented in Phase 3",
            "sources": [],
            "confidence": 0.0
        }

    def get_collection_stats(self) -> Dict[str, Any]:
        """
        Get statistics about the current document collection.

        Returns:
            Dictionary with collection statistics
        """
        return self.vector_store.get_stats()

    def clear_collection(self) -> Dict[str, str]:
        """
        Clear all documents from the collection.

        Returns:
            Status dictionary
        """
        return self.vector_store.clear()


if __name__ == "__main__":
    # Test initialization
    pipeline = RAGPipeline()
    print("\n🧪 Testing RAG Pipeline...")
    print(pipeline.get_collection_stats())