const STORAGE_KEY = 'opencore_history';
const MAX_RESULTS = 10;

export function getHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    history.unshift(entry);
    if (history.length > MAX_RESULTS) history.splice(MAX_RESULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // fail silently
  }
}

export function hasHistory() {
  return getHistory().length > 0;
}