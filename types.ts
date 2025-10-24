import type React from 'react';

export interface Source {
  uri: string;
  title: string;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: React.FC<{ className?: string }>;
  promptPersona: string;
  introduction: string;
  framework: string;
  focusPoints: string[];
}

export interface ChatMessage {
  id: string;
  expertId: string;
  text: string;
  sources?: Source[];
}

export type SimulationStatus = 'idle' | 'discussing' | 'summarizing' | 'done' | 'error';