export type ConfirmDoseRequest = {
  medicationName: string;
  scheduledAt: string; // "08:00"
  confirmedAt: string; // "12:10"
  delayMinutes: number;
};

export type ConfirmDoseResponse = {
  message: string;
  medicationName: string;
  scheduledAt: string;
  confirmedAt: string;
  delayMinutes: number;
  riskLevel: "normal" | "warning" | "critical";
};

const API_BASE = "https://localhost:7086";

export async function confirmDoseApi(
  payload: ConfirmDoseRequest,
  signal?: AbortSignal,
): Promise<ConfirmDoseResponse> {
  const res = await fetch(`${API_BASE}/api/doses/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return await res.json();
}
