import { useState } from 'react';
import { FileText, MessageSquare, Sparkles } from 'lucide-react';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';
import { AnimatedText, BlurFadeText } from './components/reactbits/AnimatedText';
import { GradientOrbs, GridBackground } from './components/reactbits/AnimatedBackground';

function App() {
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const handleUploadSuccess = (response) => {
    if (response.filename) {
      setUploadedDocs((prev) => [...prev, response]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <GradientOrbs orbCount={3} />
      <GridBackground size={50} opacity={0.08} />
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <AnimatedText text="DataDocAI" />
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <BlurFadeText text="AI-Powered Document Q&A System" delay={0.5} />
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Upload section */}
          <div className="lg:col-span-1">
            <FileUpload onUploadSuccess={handleUploadSuccess} />
            
            {/* Uploaded documents list */}
            {uploadedDocs.length > 0 && (
              <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl border border-white/20 p-6 animate-slideUp">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-lg mr-2 animate-float">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>Documents</span>
                  <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    {uploadedDocs.length}
                  </span>
                </h3>
                <ul className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {uploadedDocs.map((doc, index) => (
                    <li
                      key={index}
                      className="group text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-indigo-50 p-3 rounded-xl flex items-center space-x-3 hover:shadow-md hover:scale-[1.02] transition-all duration-200 border border-gray-100 animate-slideUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                        <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      </div>
                      <span className="truncate flex-1 font-medium">{doc.filename}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right section - Chat interface */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 backdrop-blur-sm bg-white/80 px-6 py-3 rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all hover:scale-105">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-full animate-pulse">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Powered by RAG (Retrieval-Augmented Generation)</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
