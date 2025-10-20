import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageCircle, Sparkles } from 'lucide-react';
// Temporarily using mock API - switch back to '../services/api' when backend is ready
import { queryRAG } from '../services/api-mock';
import MessageBubble from './MessageBubble';
import { AnimatedText, BlurFadeText } from './reactbits/AnimatedText';
import { MagneticButton } from './reactbits/AnimatedButton';
import { BouncingDots, GradientSpinner } from './reactbits/LoadingAnimations';
import { ParticlesBackground } from './reactbits/AnimatedBackground';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await queryRAG(inputValue);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.answer || response.response || 'No response received',
        isUser: false,
        timestamp: new Date(),
        sources: response.sources || [],
        messageId: response.message_id || `msg_${Date.now()}`,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: error.response?.data?.detail || 
              'Sorry, I encountered an error processing your request. Please try again.',
        isUser: false,
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl border border-white/20 flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-5 rounded-t-2xl relative overflow-hidden">
        <ParticlesBackground particleCount={20} />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm animate-float">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">
              <AnimatedText text="Chat with Your Documents" />
            </h2>
          </div>
          <p className="text-sm text-white/90 flex items-center gap-1">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <BlurFadeText text="Ask questions about your uploaded documents" delay={0.3} />
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-gray-50/50 to-transparent">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-2xl inline-block mb-4">
                <MessageCircle className="w-16 h-16 text-indigo-600" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">No messages yet</p>
              <p className="text-sm text-gray-500">
                Upload a document and start asking questions!
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.text}
                isUser={msg.isUser}
                sources={msg.sources}
                messageId={msg.messageId}
              />
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3 animate-slideUp">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-md">
                  <GradientSpinner size="sm" />
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl px-5 py-3 shadow-sm border border-indigo-100">
                  <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <BouncingDots color="indigo" size="sm" />
                    <span className="animate-pulse">Thinking...</span>
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-indigo-100 bg-white/50 backdrop-blur-sm p-4">
        <div className="flex space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about your documents..."
            disabled={isLoading}
            className="flex-1 border-2 border-indigo-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm bg-white/80 backdrop-blur-sm placeholder-gray-400 transition-all"
          />
          <MagneticButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
