
import React from 'react';
import { Panel } from '../types';

interface PanelCardProps {
  panel: Panel;
  onClick: (id: number) => void;
  isFirst?: boolean;
}

const PanelCard: React.FC<PanelCardProps> = ({ panel, onClick, isFirst }) => {
  const hasBg = !!panel.bgColor;
  
  return (
    <div
      onClick={() => onClick(panel.id)}
      style={hasBg ? { backgroundColor: panel.bgColor, borderColor: 'transparent' } : {}}
      className={`
        relative w-full min-h-[140px] flex flex-col items-center justify-center text-center px-6 py-8 rounded-2xl
        transition-all duration-300 cursor-pointer border-2
        ${panel.isVisited 
          ? `shadow-md ${!hasBg ? 'bg-white border-[#10B981]' : ''}` 
          : `shadow-sm ${!hasBg ? 'bg-white border-slate-200' : ''} hover:-translate-y-1 hover:shadow-xl`
        }
        ${hasBg ? 'hover:brightness-110' : 'hover:border-[#3B82F6] hover:shadow-[#3b82f626]'}
      `}
    >
      {panel.isVisited && (
        <div className={`absolute top-2 right-2 w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm animate-[pop_0.4s_cubic-bezier(0.68,-0.55,0.265,1.55)] border-2 ${hasBg ? 'border-white' : 'border-[#10B981]'}`}>
          ✓
        </div>
      )}
      
      {isFirst && !panel.isVisited && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md">
          {panel.tag}
        </div>
      )}

      <h3 className={`font-bold text-base md:text-lg leading-snug whitespace-pre-line ${hasBg ? 'text-white' : 'text-[#0F172A]'}`}>
        {panel.title}
      </h3>
      
      <p className={`mt-3 text-[10px] uppercase tracking-wider font-extrabold ${panel.isVisited ? (hasBg ? 'text-white/80' : 'text-[#10B981]') : (hasBg ? 'text-white/60' : 'text-slate-400')}`}>
        {panel.isVisited ? 'COMPLETED' : 'CLICK TO START'}
      </p>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PanelCard;
