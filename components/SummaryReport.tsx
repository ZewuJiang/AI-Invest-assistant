import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { LEAD_STRATEGIST } from '../constants';
import type { Source } from '../types';

interface SummaryReportProps {
  summaryText: string;
  isLoading: boolean;
  sources: Source[];
}

const SummaryReport: React.FC<SummaryReportProps> = ({ summaryText, isLoading, sources }) => {
  if (isLoading && !summaryText) {
    return (
      <div className="p-6 text-center">
        <LoadingSpinner />
        <p className="mt-2 text-gray-400 animate-pulse">首席策略师正在整合专家观点并撰写报告...</p>
      </div>
    );
  }

  if (!summaryText) {
    return null;
  }
  
  const LeadAvatar = LEAD_STRATEGIST.avatar;

  return (
    <div className="p-6 prose prose-invert prose-sm sm:prose-base max-w-none prose-h2:text-sky-400 prose-strong:text-white">
        <div className="flex items-center gap-4 mb-4 not-prose">
            <LeadAvatar className="w-12 h-12 text-sky-300 flex-shrink-0" />
            <div>
                <h3 className="text-lg font-bold text-white m-0">{LEAD_STRATEGIST.name}</h3>
                <p className="text-sm text-gray-400 m-0">{LEAD_STRATEGIST.title}</p>
            </div>
        </div>
        {summaryText.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.substring(3)}</h2>;
            }
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <strong key={index} className="block my-2">{paragraph.slice(2,-2)}</strong>;
            }
             if (paragraph.startsWith('* ')) {
                return <li key={index}>{paragraph.substring(2)}</li>;
            }
            return <p key={index}>{paragraph}</p>;
        })}

        {sources && sources.length > 0 && (
            <div className="mt-8 pt-4 border-t border-gray-700 not-prose">
                <h2 className="text-lg font-bold text-sky-400 mb-3">参考来源 (References)</h2>
                <ul className="list-disc list-inside space-y-2">
                    {sources.map((source, i) => (
                        <li key={i} className="text-gray-300">
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 hover:underline">
                                {source.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};

export default SummaryReport;