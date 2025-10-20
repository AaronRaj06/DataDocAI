import { User, Bot, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
// Temporarily using mock API - switch back to '../services/api' when backend is ready
import { submitFeedback } from '../services/api-mock';
import { RippleButton } from './reactbits/AnimatedButton';

const MessageBubble = ({ message, isUser, sources, messageId }) => {
  const [feedback, setFeedback] = useState(null);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const handleFeedback = async (type) => {
    if (submittingFeedback || feedback) return;
    
    setSubmittingFeedback(true);
    try {
      await submitFeedback(messageId, type);
      setFeedback(type);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-slideUp">
        <div className="flex items-start space-x-3 max-w-[70%]">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message}</p>
          </div>
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-md border-2 border-white animate-scaleIn">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4 animate-slideUp">
      <div className="flex items-start space-x-3 max-w-[80%]">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-md border-2 border-white animate-scaleIn">
          <Bot className="w-5 h-5 text-gray-700" />
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{message}</p>
          </div>
          
          {/* Sources display */}
          {sources && sources.length > 0 && (
            <div className="mt-3 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs font-bold text-indigo-900 mb-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                Sources:
              </p>
              <ul className="space-y-2">
                {sources.map((source, index) => (
                  <li key={index} className="text-xs text-gray-700 bg-white rounded-lg p-2 border border-indigo-100">
                    <span className="font-semibold text-indigo-700">📄 {source.document}</span>
                    {source.page && <span className="text-gray-500"> • Page {source.page}</span>}
                    {source.score && (
                      <span className="ml-2 inline-flex items-center bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                        {(source.score * 100).toFixed(0)}% match
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Feedback buttons */}
          {!isUser && messageId && (
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-xs text-gray-500 font-medium">Was this helpful?</span>
              <RippleButton
                onClick={() => handleFeedback('positive')}
                disabled={submittingFeedback || feedback}
                className={`p-2 rounded-lg transition-all ${
                  feedback === 'positive'
                    ? 'text-green-600 bg-green-100 shadow-sm scale-110'
                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50 hover:scale-110'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ThumbsUp className="w-4 h-4" />
              </RippleButton>
              <RippleButton
                onClick={() => handleFeedback('negative')}
                disabled={submittingFeedback || feedback}
                className={`p-2 rounded-lg transition-all ${
                  feedback === 'negative'
                    ? 'text-red-600 bg-red-100 shadow-sm scale-110'
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50 hover:scale-110'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ThumbsDown className="w-4 h-4" />
              </RippleButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
