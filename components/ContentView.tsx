
import React from 'react';
import { Panel } from '../types';

interface ContentViewProps {
  panel: Panel;
  onBack: () => void;
  isIntroMode?: boolean;
}

const ContentView: React.FC<ContentViewProps> = ({ panel, onBack, isIntroMode }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
      {/* Top back button - hidden in intro mode */}
      {!isIntroMode && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white bg-[#0F172A] font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-all mb-8 self-start shadow-lg"
        >
          <span>← Back to Process</span>
        </button>
      )}

      {/* Title - centered in intro mode */}
      <h2 className={`text-[#0F172A] text-3xl md:text-4xl font-extrabold tracking-tight mb-8 whitespace-pre-line ${isIntroMode ? 'text-center' : ''}`}>
        {panel.title}
      </h2>

      <div className="space-y-8 flex-grow">
        {panel.imageUrl && (
          <img 
            src={panel.imageUrl} 
            alt={panel.title} 
            className="w-full h-auto rounded-2xl shadow-lg border border-slate-100"
          />
        )}

        {panel.type === 'video' && panel.videoUrl && (
          <div className="space-y-4">
            <div className="relative pt-[56.25%] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-black">
              <video 
                className="absolute top-0 left-0 w-full h-full"
                src={panel.videoUrl} 
                controls
                autoPlay
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-sm text-slate-400 italic">
              Playing local file: {panel.videoUrl}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Button - centered for Intro Mode */}
      {isIntroMode && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={onBack}
            className="text-white bg-[#0F172A] font-bold px-12 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            View the Steps
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentView;
