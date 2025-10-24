
import React, { useState } from 'react';

interface UserInputProps {
  onStart: (query: string, rounds: number) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onStart, onCancel, isLoading }) => {
  const [query, setQuery] = useState('');
  const [rounds, setRounds] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onStart(query.trim(), rounds);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
            分析需求 (Analysis Request)
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="例如: 分析一下特斯拉未来的投资价值..."
            className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 text-gray-200 placeholder-gray-500 resize-none"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            分析深度 (Analysis Depth)
          </label>
          <div className="flex justify-between items-center bg-gray-900 border border-gray-600 rounded-md p-1">
            {[1, 2, 3].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => !isLoading && setRounds(r)}
                className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  rounds === r
                    ? 'bg-sky-600 text-white'
                    : 'bg-transparent text-gray-400 hover:bg-gray-700'
                } ${isLoading ? 'cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {r === 1 ? '快速' : r === 2 ? '标准' : '深入'} ({r} 轮)
              </button>
            ))}
          </div>
        </div>

        <div>
           {isLoading ? (
             <button
                type="button"
                onClick={onCancel}
                className="w-full flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 font-medium rounded-lg text-sm px-5 py-3 transition-colors duration-300"
            >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                取消分析
            </button>
           ) : (
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-full text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 focus:ring-4 focus:ring-sky-500/50 font-medium rounded-lg text-sm px-5 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              开始分析 (Start Analysis)
            </button>
           )}
        </div>
      </form>
    </div>
  );
};

export default UserInput;
