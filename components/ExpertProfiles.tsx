
import React, { useState } from 'react';
import { EXPERTS } from '../constants';

const ExpertProfileCard = ({ expert, isExpanded, onToggle }) => {
    const Avatar = expert.avatar;

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300">
            <button
                onClick={onToggle}
                className="w-full p-4 text-left flex items-center justify-between focus:outline-none focus:bg-gray-700/50"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 text-sky-400 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-white">{expert.name}</h3>
                        <p className="text-sm text-gray-400">{expert.title}</p>
                    </div>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out grid ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-2 border-t border-gray-700">
                        <p className="text-sm text-gray-300 mb-4">{expert.introduction}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 className="font-semibold text-sky-400 mb-2">核心框架</h4>
                                <p className="text-gray-400">{expert.framework}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sky-400 mb-2">关注要点</h4>
                                <ul className="list-disc list-inside text-gray-400 space-y-1">
                                    {expert.focusPoints.map(point => <li key={point}>{point}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ExpertProfiles = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">专家团队介绍 (Meet the Experts)</h2>
            <div className="space-y-4">
                {EXPERTS.map((expert) => (
                    <ExpertProfileCard
                        key={expert.id}
                        expert={expert}
                        isExpanded={expandedId === expert.id}
                        onToggle={() => handleToggle(expert.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpertProfiles;
