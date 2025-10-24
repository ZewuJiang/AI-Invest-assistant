import React, { useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { EXPERTS, LEAD_STRATEGIST } from '../constants';

const allExperts = [...EXPERTS, {id: 'system', name: 'System', title: 'System', avatar: LEAD_STRATEGIST.avatar}];

const ChatWindow: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getExpert = (expertId: string) => {
    return allExperts.find(e => e.id === expertId);
  }

  return (
    <div className="h-96 p-4 space-y-4 overflow-y-auto bg-gray-800/50">
      {messages.map((msg, index) => {
        const expert = getExpert(msg.expertId);
        if (!expert) return null;

        // This is a placeholder for the "typing" indicator
        if (msg.expertId === 'system' && msg.text === '') {
          return null;
        }

        const Avatar = expert.avatar;

        return (
          <div key={msg.id || index} className="flex items-start gap-4 animate-fade-in">
            <div className="flex-shrink-0">
              <Avatar className="w-10 h-10 text-gray-400" />
            </div>
            <div className="flex-1 bg-gray-700/60 rounded-lg p-3">
              <p className="font-semibold text-sky-300">{expert.name}</p>
              <p className="text-gray-300 whitespace-pre-wrap">{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 border-t border-gray-600 pt-2">
                  <h4 className="text-xs font-semibold text-gray-400 mb-1">参考来源:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    {msg.sources.map((source, i) => (
                      <li key={i}>
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sky-500 hover:text-sky-400 hover:underline"
                          title={source.title}
                        >
                          {source.title.length > 60 ? `${source.title.substring(0, 60)}...` : source.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;