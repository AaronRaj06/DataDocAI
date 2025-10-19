"""
Vector Store Management - ChromaDB wrapper for document embeddings
"""

from typing import Dict, Any, List, Optional
import chromadb
from chromadb.config import Settings


class VectorStore:
    """
    Manages ChromaDB vector database for document embeddings.
    """

    def __init__(self, 
                 collection_name: str = "documents",
                 persist_directory: str = "./chroma_db"):
        """
        Initialize ChromaDB vector store.

        Args:
            collection_name: Name of the ChromaDB collection
            persist_directory: Directory to persist vector database
        """
        self.collection_name = collection_name
        self.persist_directory = persist_directory
        self.client = None
        self.collection = None
        self._initialize()

    def _initialize(self):
        """Initialize ChromaDB client and collection."""
        try:
            # Initialize persistent ChromaDB client
            self.client = chromadb.PersistentClient(path=self.persist_directory)
            
            # Get or create collection
            self.collection = self.client.get_or_create_collection(
                name=self.collection_name,
                metadata={"description": "Document embeddings for RAG"}
            )
            print(f"✅ ChromaDB initialized: {self.collection_name}")
        except Exception as e:
            print(f"❌ Error initializing vector database: {e}")
            raise

    def add_documents(self, 
                     ids: List[str],
                     documents: List[str],
                     metadatas: Optional[List[Dict[str, Any]]] = None,
                     embeddings: Optional[List[List[float]]] = None) -> Dict[str, str]:
        """
        Add documents to the vector store.

        Args:
            ids: List of unique document IDs
            documents: List of document text chunks
            metadatas: Optional list of metadata dicts
            embeddings: Optional pre-computed embeddings

        Returns:
            Status dictionary
        """
        try:
            self.collection.add(
                ids=ids,
                documents=documents,
                metadatas=metadatas,
                embeddings=embeddings
            )
            return {"status": "success", "count": len(ids)}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def query(self, 
             query_texts: List[str],
             n_results: int = 3) -> Dict[str, Any]:
        """
        Query the vector store for similar documents.

        Args:
            query_texts: List of query strings
            n_results: Number of results to return

        Returns:
            Query results with documents and distances
        """
        try:
            results = self.collection.query(
                query_texts=query_texts,
                n_results=n_results
            )
            return {"status": "success", "results": results}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def get_stats(self) -> Dict[str, Any]:
        """Get collection statistics."""
        try:
            count = self.collection.count()
            return {
                "collection_name": self.collection_name,
                "document_count": count,
                "status": "active"
            }
        except Exception as e:
            return {
                "collection_name": self.collection_name,
                "document_count": 0,
                "status": "error",
                "error": str(e)
            }

    def clear(self) -> Dict[str, str]:
        """Clear all documents from the collection."""
        try:
            self.client.delete_collection(name=self.collection_name)
            self.collection = self.client.create_collection(
                name=self.collection_name,
                metadata={"description": "Document embeddings for RAG"}
            )
            return {"status": "success", "message": "Collection cleared"}
        except Exception as e:
            return {"status": "error", "message": str(e)}