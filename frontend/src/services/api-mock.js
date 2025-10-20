/**
 * Mock API for testing frontend without backend
 */

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock upload document
export const uploadDocument = async (file) => {
  await delay(1500); // Simulate upload time
  
  return {
    filename: file.name,
    size: file.size,
    message: 'File uploaded successfully',
  };
};

// Mock query RAG - with conversational awareness
export const queryRAG = async (question) => {
  await delay(2000); // Simulate processing time
  
  const lowerQuestion = question.toLowerCase();
  
  // Detect conversational queries
  const conversationalPatterns = [
    { pattern: /^(hi|hello|hey|good morning|good evening|good afternoon)/i, 
      response: "Hello! 👋 I'm your AI document assistant. I can help you understand and query your uploaded documents. Feel free to ask me anything about your documents, or just chat!" },
    
    { pattern: /how are you|how r u|whats up|wassup/i, 
      response: "I'm doing great, thank you for asking! 😊 I'm here and ready to help you with your documents. Have you uploaded any documents yet? If so, feel free to ask me questions about them!" },
    
    { pattern: /^(thank|thanks|thx)/i, 
      response: "You're welcome! 😊 Is there anything else you'd like to know about your documents?" },
    
    { pattern: /^(bye|goodbye|see you|see ya)/i, 
      response: "Goodbye! 👋 Feel free to come back anytime you need help with your documents. Have a great day!" },
    
    { pattern: /what can you do|what are you|who are you|your capabilities/i, 
      response: "I'm DataDocAI, an AI-powered document assistant! 🤖 I can help you:\n\n• Upload and analyze documents (PDF, TXT, etc.)\n• Answer questions about your uploaded documents\n• Find relevant information across multiple documents\n• Provide sources and references for my answers\n\nJust upload a document and start asking questions!" },
    
    { pattern: /help|how to use|how does this work/i, 
      response: "I'd be happy to help! 🚀\n\nHere's how to use DataDocAI:\n1. Upload your documents using the upload section on the left\n2. Once uploaded, ask me any questions about your documents\n3. I'll analyze the content and provide answers with sources\n4. You can give feedback (👍/👎) on my responses\n\nTry uploading a document and asking something like 'What is this document about?'" },
  ];
  
  // Check for conversational patterns
  for (const { pattern, response } of conversationalPatterns) {
    if (pattern.test(lowerQuestion)) {
      return {
        answer: response,
        sources: [], // No sources for conversational responses
        message_id: `mock_msg_${Date.now()}`,
      };
    }
  }
  
  // Document-related query (default behavior)
  return {
    answer: `Based on the uploaded documents, here's what I found about "${question}":\n\nThis is a mock response to demonstrate the interface. In production, I would analyze your actual documents and provide specific answers with relevant excerpts.\n\nThe React Bits animations are working beautifully! ✨ Try asking more questions to see different responses.`,
    sources: [
      {
        document: 'sample-document.pdf',
        page: 1,
        score: 0.95,
      },
      {
        document: 'another-doc.pdf',
        page: 3,
        score: 0.87,
      },
    ],
    message_id: `mock_msg_${Date.now()}`,
  };
};

// Mock submit feedback
export const submitFeedback = async (messageId, feedback) => {
  await delay(500);
  
  return {
    message: 'Feedback submitted',
    feedback,
  };
};
