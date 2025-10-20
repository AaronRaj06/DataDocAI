"""
Test script for Phase 2 - Document Ingestion Pipeline
"""

import os
from rag.rag_pipeline import RAGPipeline

def create_test_document():
    """Create a sample text document for testing."""
    test_content = """
    DataDocAI - Document Q&A System
    
    This is a test document for the RAG pipeline. The system can process various document formats
    including PDF, TXT, and DOCX files.
    
    Key Features:
    1. Document Upload: Users can upload documents in multiple formats
    2. Text Extraction: The system extracts text from uploaded documents
    3. Chunking: Large documents are split into manageable chunks
    4. Embeddings: Each chunk is converted into vector embeddings
    5. Storage: Chunks and embeddings are stored in ChromaDB
    6. Query: Users can ask questions about the uploaded documents
    7. Retrieval: The system finds relevant chunks
    8. Answer Generation: LLM generates answers based on retrieved context
    
    Technical Stack:
    - Backend: FastAPI
    - Vector Database: ChromaDB
    - Embeddings: Sentence Transformers
    - LLM: OpenAI GPT models
    - Frontend: React
    
    This document will be chunked into multiple pieces and stored in the vector database.
    Each chunk will maintain metadata about its source document and position within it.
    """
    
    # Create test file
    os.makedirs("test_documents", exist_ok=True)
    test_file = "test_documents/sample.txt"
    
    with open(test_file, "w", encoding="utf-8") as f:
        f.write(test_content)
    
    return test_file

def test_document_ingestion():
    """Test the complete document ingestion pipeline."""
    print("=" * 60)
    print("🧪 Testing Phase 2 - Document Ingestion Pipeline")
    print("=" * 60)
    
    # Initialize pipeline
    print("\n1️⃣  Initializing RAG Pipeline...")
    pipeline = RAGPipeline(
        chunk_size=500,  # Smaller chunks for testing
        chunk_overlap=50
    )
    
    # Create test document
    print("\n2️⃣  Creating test document...")
    test_file = create_test_document()
    print(f"✅ Test document created: {test_file}")
    
    # Get initial stats
    print("\n3️⃣  Initial vector store stats:")
    initial_stats = pipeline.get_collection_stats()
    print(f"   Documents: {initial_stats['document_count']}")
    
    # Process document
    print("\n4️⃣  Processing document...")
    result = pipeline.process_documents(
        file_path=test_file,
        metadata={"source": "test", "category": "documentation"}
    )
    
    # Display results
    print("\n5️⃣  Processing Results:")
    print(f"   Status: {result['status']}")
    print(f"   Message: {result['message']}")
    print(f"   Document ID: {result.get('document_id')}")
    print(f"   Chunks Created: {result.get('chunks_created')}")
    print(f"   Total Characters: {result.get('total_characters')}")
    
    # Get updated stats
    print("\n6️⃣  Updated vector store stats:")
    final_stats = pipeline.get_collection_stats()
    print(f"   Documents: {final_stats['document_count']}")
    print(f"   New chunks added: {final_stats['document_count'] - initial_stats['document_count']}")
    
    # Test completion
    print("\n" + "=" * 60)
    if result['status'] == 'success' and result['chunks_created'] > 0:
        print("✅ Phase 2 Test PASSED!")
        print(f"   Successfully ingested document with {result['chunks_created']} chunks")
    else:
        print("❌ Phase 2 Test FAILED!")
        print(f"   Error: {result.get('message')}")
    print("=" * 60)
    
    return result

if __name__ == "__main__":
    test_document_ingestion()