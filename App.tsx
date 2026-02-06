
import React, { useState, useRef } from 'react';
import { Panel, View } from './types';
import { INITIAL_PANELS } from './constants';
import PanelCard from './components/PanelCard';
import ContentView from './components/ContentView';

/**
 * A professional arrow component using the provided 24x24 SVG.
 * Supports an optional tail extension to bridge larger gaps.
 */
const ProcessArrow = ({ 
  direction = 'right', 
  tailLength = 0, 
  className = "" 
}: { 
  direction?: 'up' | 'down' | 'left' | 'right'; 
  tailLength?: number; 
  className?: string 
}) => {
  const rotationMap = {
    'right': 0,
    'down': 90,
    'left': 180,
    'up': -90
  };

  return (
    <div 
      className={`flex items-center justify-center pointer-events-none transition-all duration-500 ${className}`}
      style={{ 
        transform: `rotate(${rotationMap[direction]}deg)`,
      }}
    >
      <div className="flex items-center">
        {/* Tail Extension - thickness set to 1.5px to exactly match the SVG icon's internal line weight */}
        {tailLength > 0 && (
          <div 
            className="bg-[#121331]" 
            style={{ 
              width: `${tailLength}px`, 
              height: '1.5px', 
              marginRight: '-1.5px', // Pull it into the SVG slightly to ensure a seamless join
              borderRadius: '0.5px'
            }} 
          />
        )}
        {/* User provided 24x24 SVG arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="shrink-0">
          <path 
            fill="#121331" 
            d="M13.375 4.85a.75.75 0 0 1 .905.12l6.5 6.5a.7.7 0 0 1 .118.16q.025.04.044.083a.75.75 0 0 1-.078.715 1 1 0 0 1-.084.102l-6.5 6.5a.75.75 0 0 1-1.255-.725l1.495-5.555H3.75a.75.75 0 1 1 0-1.5h10.77l-1.495-5.555a.75.75 0 0 1 .35-.844"
          />
        </svg>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [panels, setPanels] = useState<Panel[]>(INITIAL_PANELS);
  const [currentView, setCurrentView] = useState<View>('intro');
  const [activePanelId, setActivePanelId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePanelClick = (id: number) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, isVisited: true } : p));
    setActivePanelId(id);
    setCurrentView('content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setCurrentView('hub');
    setActivePanelId(null);
  };

  const handleIntroComplete = () => {
    setPanels(prev => prev.map(p => p.id === 1 ? { ...p, isVisited: true } : p));
    setCurrentView('hub');
  };

  const introPanel = panels.find(p => p.id === 1);
  
  // Grid layout (3x3):
  // Row 0: 2, 3, 4
  // Row 1: (empty), (empty), 5
  // Row 2: 8, 7, 6
  const gridLayout = [
    panels.find(p => p.id === 2), 
    panels.find(p => p.id === 3), 
    panels.find(p => p.id === 4), 
    null,                         
    null,                         
    panels.find(p => p.id === 5), 
    panels.find(p => p.id === 8), 
    panels.find(p => p.id === 7), 
    panels.find(p => p.id === 6), 
  ];

  const isAllCompleted = panels.every(p => p.isVisited);
  const activePanel = panels.find(p => p.id === activePanelId);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-10">
        
        {currentView === 'intro' && introPanel && (
          <div className="animate-in fade-in zoom-in-95 duration-700">
            <ContentView panel={introPanel} onBack={handleIntroComplete} isIntroMode />
          </div>
        )}

        {currentView === 'hub' && (
          <div className="animate-in fade-in duration-700">
            <header className="text-center mb-16 space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight">
                IVM Process
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Click each step in the IVM process to see how each role plays an important part.
              </p>
              <div className="pt-4">
                <button 
                  onClick={() => setCurrentView('intro')}
                  className="inline-flex items-center gap-2 bg-white text-[#5E3B8E] border-2 border-[#5E3B8E]/20 px-8 py-3 rounded-2xl font-bold hover:bg-[#5E3B8E] hover:text-white transition-all shadow-lg shadow-[#5E3B8E]/10"
                >
                  Replay Introduction
                </button>
              </div>
            </header>

            <div className="py-10">
              <div 
                ref={containerRef}
                className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center"
              >
                {/* Arrow Overlay: Matches the content grid to ensure perfect visual centering in gutters */}
                <div className="absolute inset-0 hidden lg:grid grid-cols-3 grid-rows-3 gap-8 md:gap-12 lg:gap-16 pointer-events-none z-0">
                  {/* Horizontal Arrows Row 0 */}
                  <div className="relative col-start-1 row-start-1">
                    <div className="absolute top-1/2 -right-4 md:-right-6 lg:-right-8 translate-x-1/2 -translate-y-1/2">
                      <ProcessArrow direction="right" />
                    </div>
                  </div>
                  <div className="relative col-start-2 row-start-1">
                    <div className="absolute top-1/2 -right-4 md:-right-6 lg:-right-8 translate-x-1/2 -translate-y-1/2">
                      <ProcessArrow direction="right" />
                    </div>
                  </div>

                  {/* Vertical Arrows Column 2 */}
                  <div className="relative col-start-3 row-start-1">
                    <div className="absolute left-1/2 -bottom-4 md:-bottom-6 lg:-bottom-8 translate-y-1/2 -translate-x-1/2">
                      <ProcessArrow direction="down" />
                    </div>
                  </div>
                  <div className="relative col-start-3 row-start-2">
                    <div className="absolute left-1/2 -bottom-4 md:-bottom-6 lg:-bottom-8 translate-y-1/2 -translate-x-1/2">
                      <ProcessArrow direction="down" />
                    </div>
                  </div>

                  {/* Horizontal Arrows Row 2 */}
                  <div className="relative col-start-3 row-start-3">
                    <div className="absolute top-1/2 -left-4 md:-left-6 lg:-left-8 -translate-x-1/2 -translate-y-1/2">
                      <ProcessArrow direction="left" />
                    </div>
                  </div>
                  <div className="relative col-start-2 row-start-3">
                    <div className="absolute top-1/2 -left-4 md:-left-6 lg:-left-8 -translate-x-1/2 -translate-y-1/2">
                      <ProcessArrow direction="left" />
                    </div>
                  </div>

                  {/* Loop Back Arrow: Adaptive -> Develop Vegetation */}
                  {/* Spans the vertical distance of the empty Row 1 cell. */}
                  <div className="relative col-start-1 row-start-2 flex items-center justify-center">
                    <ProcessArrow direction="up" tailLength={220} />
                  </div>
                </div>

                {gridLayout.map((panel, index) => (
                  <div key={panel ? panel.id : `empty-${index}`} className="panel-card-wrapper z-10 flex items-stretch h-full">
                    {panel ? (
                      <PanelCard 
                        panel={panel} 
                        onClick={handlePanelClick} 
                      />
                    ) : (
                      <div className="hidden lg:block min-h-[160px]" /> 
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isAllCompleted && (
              <div className="mt-20 flex justify-center">
                <button 
                  onClick={() => setCurrentView('finish')}
                  className="bg-[#10B981] text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-[#059669] transition-all hover:scale-105 shadow-2xl"
                >
                  Finalize Completion
                </button>
              </div>
            )}
          </div>
        )}

        {currentView === 'content' && activePanel && (
          <ContentView panel={activePanel} onBack={handleBackToHub} />
        )}

        {currentView === 'finish' && (
          <div className="max-w-3xl mx-auto text-center py-20 bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-500 border border-slate-100">
            <div className="text-8xl mb-10 animate-bounce">🏆</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-6 tracking-tight">
              Complete!
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-12 px-6">
              You have learned about the steps in the IVM Process.
            </p>
            <button 
              onClick={() => {
                setPanels(INITIAL_PANELS);
                setCurrentView('intro');
              }}
              className="bg-[#5E3B8E] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#4a2e70] transition-all shadow-lg shadow-[#5E3B8E]/20"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
