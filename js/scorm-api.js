(function () {
  'use strict';

  var _api = null;
  var _initialized = false;

  // --- API Discovery ---
  // SCORM 1.2: search window.API up the parent/opener chain

  function findAPI(win) {
    var attempts = 0;
    while (win && !win.API && attempts < 500) {
      if (win.parent && win.parent !== win) {
        win = win.parent;
      } else if (win.opener) {
        win = win.opener;
      } else {
        break;
      }
      attempts++;
    }
    return win && win.API ? win.API : null;
  }

  function getAPI() {
    if (_api) return _api;
    _api = findAPI(window);
    if (!_api && window.opener) {
      _api = findAPI(window.opener);
    }
    return _api;
  }

  // --- Core SCORM Functions ---

  function initialize() {
    var api = getAPI();
    if (!api) {
      console.warn('[SCORM] No LMS API found. Running in standalone mode.');
      _initialized = false;
      return false;
    }
    var result = api.LMSInitialize('');
    _initialized = result === 'true' || result === true;
    if (_initialized) {
      console.log('[SCORM] LMSInitialize succeeded.');
      var status = api.LMSGetValue('cmi.core.lesson_status');
      if (status === '' || status === 'not attempted') {
        api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
        api.LMSCommit('');
      }
    } else {
      console.error('[SCORM] LMSInitialize failed. Error:', getLastError());
    }
    return _initialized;
  }

  function getValue(key) {
    var api = getAPI();
    if (!api || !_initialized) return '';
    return api.LMSGetValue(key);
  }

  function setValue(key, value) {
    var api = getAPI();
    if (!api || !_initialized) return false;
    var result = api.LMSSetValue(key, String(value));
    return result === 'true' || result === true;
  }

  function commit() {
    var api = getAPI();
    if (!api || !_initialized) return false;
    var result = api.LMSCommit('');
    return result === 'true' || result === true;
  }

  function finish() {
    var api = getAPI();
    if (!api || !_initialized) return false;
    var result = api.LMSFinish('');
    _initialized = false;
    return result === 'true' || result === true;
  }

  function getLastError() {
    var api = getAPI();
    if (!api) return '0';
    return api.LMSGetLastError();
  }

  // --- Suspend Data Helpers ---
  // Stores visited panel IDs as comma-separated string in cmi.suspend_data
  // Example: "1,2,5" means panels 1, 2, and 5 have been visited.

  function getVisitedPanels() {
    var raw = getValue('cmi.suspend_data');
    if (!raw || raw === '') return [];
    return raw.split(',')
      .map(function (s) { return parseInt(s.trim(), 10); })
      .filter(function (n) { return !isNaN(n); });
  }

  function saveVisitedPanels(panelIds) {
    var unique = [];
    var seen = {};
    for (var i = 0; i < panelIds.length; i++) {
      if (!seen[panelIds[i]]) {
        seen[panelIds[i]] = true;
        unique.push(panelIds[i]);
      }
    }
    unique.sort(function (a, b) { return a - b; });
    setValue('cmi.suspend_data', unique.join(','));
    commit();
  }

  // --- Completion ---

  function setComplete() {
    setValue('cmi.core.lesson_status', 'completed');
    setValue('cmi.core.score.raw', '100');
    setValue('cmi.core.score.min', '0');
    setValue('cmi.core.score.max', '100');
    commit();
  }

  function setIncomplete() {
    setValue('cmi.core.lesson_status', 'incomplete');
    commit();
  }

  // --- Public API ---

  window.ScormAPI = {
    initialize: initialize,
    getValue: getValue,
    setValue: setValue,
    commit: commit,
    finish: finish,
    getLastError: getLastError,
    getVisitedPanels: getVisitedPanels,
    saveVisitedPanels: saveVisitedPanels,
    setComplete: setComplete,
    setIncomplete: setIncomplete,
    isAvailable: function () { return !!getAPI(); },
    isInitialized: function () { return _initialized; }
  };
})();
