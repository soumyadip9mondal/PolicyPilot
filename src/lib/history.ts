// History logger using localStorage for persistence

export type HistoryEventType =
  | "Policy Analysis"
  | "Applications"
  | "Documents"
  | "AI Help"
  | "Eligibility Check"
  | "Profile Update";

export type HistoryStatus = "success" | "in_progress" | "failed" | "resolved";

export interface HistoryEvent {
  id: string;
  type: HistoryEventType;
  title: string;
  result: string;
  status: HistoryStatus;
  time: number; // Unix ms timestamp
}

const HISTORY_KEY = "policypilot_history";

export function logEvent(
  type: HistoryEventType,
  title: string,
  result: string,
  status: HistoryStatus = "success"
): void {
  if (typeof window === "undefined") return;
  const existing = getHistory();
  const newEvent: HistoryEvent = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    type,
    title,
    result,
    status,
    time: Date.now(),
  };
  const updated = [newEvent, ...existing].slice(0, 100); // keep last 100 events
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

/** Returns counts per type from history for stats */
export function getHistoryStats() {
  const history = getHistory();
  return {
    policyAnalyzed: history.filter((e) => e.type === "Policy Analysis").length,
    applicationsSubmitted: history.filter((e) => e.type === "Applications" && e.status === "success").length,
    eligibilityChecked: history.filter((e) => e.type === "Eligibility Check").length,
    aiConversations: history.filter((e) => e.type === "AI Help").length,
    documentsUploaded: history.filter((e) => e.type === "Documents").length,
  };
}
