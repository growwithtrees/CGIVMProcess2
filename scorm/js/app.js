(function () {
  'use strict';

  // =========================================================================
  // Panel Data (mirrors constants.tsx)
  // =========================================================================

  var PANELS = [
    {
      id: 1,
      title: 'The IVM Process',
      tag: 'START HERE',
      type: 'video',
      videoUrl: 'videos/Panel_01.mp4',
      text: 'This introduction covers the basics of the Integrated Vegetation Management (IVM) process.',
      isVisited: false
    },
    {
      id: 2,
      title: 'Develop Vegetation Management Program Specifications and Goals',
      type: 'video',
      videoUrl: 'videos/Panel_02.mp4',
      text: 'Learn how to set clear goals and specifications.',
      isVisited: false,
      bgColor: '#5E3B8E'
    },
    {
      id: 3,
      title: 'Create Maintenance Plans and Objectives',
      type: 'video',
      videoUrl: 'videos/Panel_03.mp4',
      text: 'Step-by-step guide to maintenance plans.',
      isVisited: false,
      bgColor: '#5E3B8E'
    },
    {
      id: 4,
      title: 'Conduct Assessments, Select Control Methods, Write Statement of Work',
      type: 'video',
      videoUrl: 'videos/Panel_04.mp4',
      text: 'Understanding assessments and documentation.',
      isVisited: false,
      bgColor: '#E66B41'
    },
    {
      id: 5,
      title: 'Landowner Notifications / Communicate with Shareholders',
      type: 'video',
      videoUrl: 'videos/Panel_05.mp4',
      text: 'Effective communication strategies.',
      isVisited: false,
      bgColor: '#E66B41'
    },
    {
      id: 6,
      title: 'Schedule and Perform Work',
      type: 'video',
      videoUrl: 'videos/Panel_06.mp4',
      text: 'Efficient execution management.',
      isVisited: false,
      bgColor: '#82A44B'
    },
    {
      id: 7,
      title: 'Evaluate (QA/QC), Record Data',
      type: 'video',
      videoUrl: 'videos/Panel_07.mp4',
      text: 'Quality control measures.',
      isVisited: false,
      bgColor: '#E66B41'
    },
    {
      id: 8,
      title: 'Adaptive Management',
      type: 'video',
      videoUrl: 'videos/Panel_08.mp4',
      text: 'Iterative improvement through learning.',
      isVisited: false,
      bgColor: '#5E3B8E'
    }
  ];

  // Grid layout: 3x3
  // Row 0: Panel 2 -> Panel 3 -> Panel 4
  // Row 1: (empty)    (empty)    Panel 5
  // Row 2: Panel 8 <- Panel 7 <- Panel 6
  var GRID_IDS = [2, 3, 4, null, null, 5, 8, 7, 6];

  var currentView = 'intro';
  var activePanelId = null;

  // =========================================================================
  // Helpers
  // =========================================================================

  function findPanel(id) {
    for (var i = 0; i < PANELS.length; i++) {
      if (PANELS[i].id === id) return PANELS[i];
    }
    return null;
  }

  function getVisitedIds() {
    var ids = [];
    for (var i = 0; i < PANELS.length; i++) {
      if (PANELS[i].isVisited) ids.push(PANELS[i].id);
    }
    return ids;
  }

  function allCompleted() {
    for (var i = 0; i < PANELS.length; i++) {
      if (!PANELS[i].isVisited) return false;
    }
    return true;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function titleToHtml(title) {
    return escapeHtml(title).replace(/\n/g, '<br>');
  }

  // =========================================================================
  // View Management
  // =========================================================================

  function stopAllVideos() {
    var videos = document.querySelectorAll('video');
    for (var i = 0; i < videos.length; i++) {
      videos[i].pause();
      videos[i].removeAttribute('src');
      videos[i].load();
    }
  }

  function showView(name) {
    stopAllVideos();
    currentView = name;
    var views = document.querySelectorAll('.view');
    for (var i = 0; i < views.length; i++) {
      views[i].classList.remove('active');
    }
    var target = document.getElementById('view-' + name);
    if (target) target.classList.add('active');

    if (name === 'intro') renderIntro();
    if (name === 'hub') renderHub();
    if (name === 'content') renderContent();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // Intro View
  // =========================================================================

  function renderIntro() {
    var panel = findPanel(1);
    if (!panel) return;
    document.getElementById('intro-title').innerHTML = titleToHtml(panel.title);
    var video = document.getElementById('intro-video');
    video.src = panel.videoUrl;
    video.load();

    // Reset: show play overlay, hide "View the Steps" button
    var overlay = document.getElementById('intro-play-overlay');
    var btnContainer = document.getElementById('intro-btn-container');
    overlay.style.display = '';
    overlay.style.opacity = '1';
    btnContainer.style.display = 'none';
  }

  function handleIntroPlayClick() {
    var video = document.getElementById('intro-video');
    var overlay = document.getElementById('intro-play-overlay');
    var btnContainer = document.getElementById('intro-btn-container');

    // Start video
    video.play();

    // Fade out and hide overlay
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 300);

    // Reveal the "View the Steps" button
    btnContainer.style.display = '';
  }

  function handleIntroComplete() {
    var panel = findPanel(1);
    if (panel) panel.isVisited = true;
    ScormAPI.saveVisitedPanels(getVisitedIds());
    showView('hub');
  }

  // =========================================================================
  // Hub View - Panel Cards
  // =========================================================================

  function createPanelCard(panel) {
    var card = document.createElement('div');
    var hasBg = !!panel.bgColor;

    // Base classes - written as complete strings for Tailwind scanner
    card.className = 'relative w-full min-h-[140px] flex flex-col items-center justify-center text-center px-6 py-8 rounded-2xl transition-all duration-300 cursor-pointer border-2';

    if (panel.isVisited) {
      if (hasBg) {
        card.className += ' shadow-md';
      } else {
        card.className += ' shadow-md bg-white border-[#10B981]';
      }
    } else {
      if (hasBg) {
        card.className += ' hover:-translate-y-1 hover:shadow-xl hover:brightness-110';
      } else {
        card.className += ' shadow-sm bg-white border-slate-200 hover:-translate-y-1 hover:shadow-xl hover:border-[#3B82F6]';
      }
    }

    if (hasBg) {
      card.style.backgroundColor = panel.bgColor;
      card.style.borderColor = 'transparent';
    }

    // Visited checkmark
    if (panel.isVisited) {
      var check = document.createElement('div');
      if (hasBg) {
        check.className = 'absolute top-2 right-2 w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm animate-pop border-2 border-white';
      } else {
        check.className = 'absolute top-2 right-2 w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm animate-pop border-2 border-[#10B981]';
      }
      check.textContent = '\u2713';
      card.appendChild(check);
    }

    // Title
    var h3 = document.createElement('h3');
    if (hasBg) {
      h3.className = 'font-bold text-base md:text-lg leading-snug whitespace-pre-line text-white';
    } else {
      h3.className = 'font-bold text-base md:text-lg leading-snug whitespace-pre-line text-[#0F172A]';
    }
    h3.innerHTML = titleToHtml(panel.title);
    card.appendChild(h3);

    // Status text
    var status = document.createElement('p');
    if (panel.isVisited) {
      if (hasBg) {
        status.className = 'mt-3 text-[10px] uppercase tracking-wider font-extrabold text-white/80';
      } else {
        status.className = 'mt-3 text-[10px] uppercase tracking-wider font-extrabold text-[#10B981]';
      }
      status.textContent = 'COMPLETED';
    } else {
      if (hasBg) {
        status.className = 'mt-3 text-[10px] uppercase tracking-wider font-extrabold text-white/60';
      } else {
        status.className = 'mt-3 text-[10px] uppercase tracking-wider font-extrabold text-slate-400';
      }
      status.textContent = 'CLICK TO START';
    }
    card.appendChild(status);

    // Click handler
    card.addEventListener('click', function () {
      handlePanelClick(panel.id);
    });

    return card;
  }

  function renderHub() {
    var container = document.getElementById('grid-container');
    // Remove old card wrappers (keep the arrow overlay which is the first child)
    var arrowOverlay = container.querySelector('.arrow-overlay');
    while (container.children.length > (arrowOverlay ? 1 : 0)) {
      container.removeChild(container.lastChild);
    }

    for (var i = 0; i < GRID_IDS.length; i++) {
      var wrapper = document.createElement('div');
      wrapper.className = 'panel-card-wrapper z-10 flex items-stretch h-full';

      if (GRID_IDS[i] !== null) {
        var panel = findPanel(GRID_IDS[i]);
        if (panel) {
          wrapper.appendChild(createPanelCard(panel));
        }
      } else {
        var empty = document.createElement('div');
        empty.className = 'hidden lg:block min-h-[100px]';
        wrapper.appendChild(empty);
      }

      container.appendChild(wrapper);
    }

    // Show/hide finalize button
    var finalizeContainer = document.getElementById('finalize-container');
    if (allCompleted()) {
      finalizeContainer.style.display = '';
    } else {
      finalizeContainer.style.display = 'none';
    }
  }

  // =========================================================================
  // Content View
  // =========================================================================

  function renderContent() {
    var panel = findPanel(activePanelId);
    if (!panel) return;
    document.getElementById('content-title').innerHTML = titleToHtml(panel.title);
    var video = document.getElementById('content-video');
    video.src = panel.videoUrl;
    video.load();
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  function handlePanelClick(id) {
    var panel = findPanel(id);
    if (panel) panel.isVisited = true;
    ScormAPI.saveVisitedPanels(getVisitedIds());
    activePanelId = id;
    showView('content');
  }

  function handleBackToHub() {
    activePanelId = null;
    showView('hub');
  }

  function handleFinalize() {
    ScormAPI.setComplete();
    showView('finish');
  }

  function handleRestart() {
    for (var i = 0; i < PANELS.length; i++) {
      PANELS[i].isVisited = false;
    }
    ScormAPI.saveVisitedPanels([]);
    ScormAPI.setIncomplete();
    showView('intro');
  }

  // =========================================================================
  // Initialization
  // =========================================================================

  function init() {
    // Initialize SCORM connection
    ScormAPI.initialize();

    // Restore visited panels from LMS suspend_data
    var visited = ScormAPI.getVisitedPanels();
    for (var i = 0; i < visited.length; i++) {
      var panel = findPanel(visited[i]);
      if (panel) panel.isVisited = true;
    }

    // Bind static button events
    document.getElementById('intro-play-overlay').addEventListener('click', handleIntroPlayClick);
    document.getElementById('btn-view-steps').addEventListener('click', handleIntroComplete);
    document.getElementById('btn-replay-intro').addEventListener('click', function () {
      showView('intro');
    });
    document.getElementById('btn-back').addEventListener('click', handleBackToHub);
    document.getElementById('btn-finalize').addEventListener('click', handleFinalize);
    document.getElementById('btn-restart').addEventListener('click', handleRestart);

    // Playback speed controls
    var speedBtns = document.querySelectorAll('#content-speed-btns .speed-btn');
    for (var i = 0; i < speedBtns.length; i++) {
      speedBtns[i].addEventListener('click', function () {
        var speed = parseFloat(this.getAttribute('data-speed'));
        var video = document.getElementById('content-video');
        video.playbackRate = speed;
        // Update active state
        var all = document.querySelectorAll('#content-speed-btns .speed-btn');
        for (var j = 0; j < all.length; j++) {
          all[j].classList.remove('speed-btn-active');
        }
        this.classList.add('speed-btn-active');
      });
    }

    // SCORM session cleanup on page unload
    window.addEventListener('beforeunload', function () {
      ScormAPI.finish();
    });

    // Start the app
    showView('intro');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
