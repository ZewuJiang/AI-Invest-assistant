import React, { useState, useRef, useCallback } from 'react';
import type { ChatMessage, SimulationStatus, Source } from './types';
import UserInput from './components/UserInput';
import ChatWindow from './components/ChatWindow';
import SummaryReport from './components/SummaryReport';
import ExpertProfiles from './components/ExpertProfiles';
import { runSimulation } from './services/geminiService';

const BearLogo = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 inline-block mr-3 text-sky-400" fill="currentColor">
        <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 72c-17.7 0-32-14.3-32-32S32.3 18 50 18s32 14.3 32 32-14.3 32-32 32z"/>
        <path d="M38 42c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm24 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/>
        <path d="M50 62c-6.1 0-11.5 3.1-14.8 7.9 1.5 1.3 3.3 2.1 5.3 2.1h19c2 0 3.8-.8 5.3-2.1C61.5 65.1 56.1 62 50 62z"/>
    </svg>
);

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [summarySources, setSummarySources] = useState<Source[]>([]);
  const [status, setStatus] = useState<SimulationStatus>('idle');
  const [currentExpert, setCurrentExpert] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleStart = useCallback(async (query: string, rounds: number) => {
    if (status !== 'idle' && status !== 'done' && status !== 'error') return;

    abortControllerRef.current = new AbortController();
    setMessages([]);
    setSummary('');
    setSummarySources([]);
    setStatus('discussing');
    setError(null);
    setCurrentExpert(null);

    try {
      await runSimulation(
        query,
        rounds,
        (newMessage, expertName) => {
          setMessages(prev => [...prev, newMessage]);
          setCurrentExpert(expertName);
        },
        (summaryText, sources) => {
          setSummary(summaryText);
          setSummarySources(sources);
          setStatus('summarizing');
        },
        abortControllerRef.current.signal
      );
      setStatus('done');
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('分析已取消 (Analysis cancelled)');
        setStatus('idle');
      } else {
        console.error("Simulation Error:", err);
        setError('分析过程中出现错误，请稍后重试 (An error occurred during analysis. Please try again later.)');
        setStatus('error');
      }
    } finally {
        setCurrentExpert(null);
    }
  }, [status]);

  const handleCancel = () => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
  };

  const isLoading = status === 'discussing' || status === 'summarizing';

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <BearLogo />
            <h1 className="text-2xl font-bold text-white">
              投研熊 <span className="text-sky-400">AI Analyst</span>
            </h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky top-24">
          <UserInput onStart={handleStart} isLoading={isLoading} onCancel={handleCancel} />
        </div>
        
        <div className="lg:col-span-2 space-y-8">
           {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {(messages.length > 0 || isLoading) && (
              <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-4 bg-gray-700/50 border-b border-gray-600">
                    <h2 className="text-xl font-semibold text-gray-200">专家讨论室 (Expert Discussion)</h2>
                    {status === 'discussing' && currentExpert && (
                        <p className="text-sm text-sky-400 animate-pulse mt-1">{currentExpert} 正在输入...</p>
                    )}
                </div>
                <ChatWindow messages={messages} />
              </div>
            )}

            {(summary || status === 'summarizing') && (
              <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                 <div className="p-4 bg-gray-700/50 border-b border-gray-600">
                    <h2 className="text-xl font-semibold text-gray-200">最终投资建议 (Final Investment Report)</h2>
                </div>
                <SummaryReport summaryText={summary} isLoading={status === 'summarizing'} sources={summarySources} />
              </div>
            )}

            {status === 'idle' && messages.length === 0 && (
                <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-white mb-4">欢迎使用 投研熊</h2>
                    <p className="text-gray-400">
                        请在左侧输入您想分析的公司或投资问题，选择分析深度，然后点击“开始分析”。我们的 AI 专家团队将为您进行深入讨论并生成一份投资报告。
                    </p>
                </div>
            )}
        </div>
        <div className="lg:col-span-3 mt-8">
            <ExpertProfiles />
        </div>
      </main>
    </div>
  );
}