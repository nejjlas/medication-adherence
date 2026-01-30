import { useState } from "react";
import type { DoseEvent } from "./DoseHistory";
import { confirmDoseApi } from "../../api/dosesApi";

type Dose = {
  id: number;
  medicationName: string;
  scheduledAt: string;
  taken: boolean;
  delayMinutes?: number;
  riskLevel?: "normal" | "warning" | "critical";
};

const initialDoses: Dose[] = [
  { id: 1, medicationName: "Aspirin", scheduledAt: "08:00", taken: false },
  { id: 2, medicationName: "Vitamin D", scheduledAt: "20:00", taken: false },
];

export function DoseToday(props: { onConfirmed: (e: DoseEvent) => void }) {
  const { onConfirmed } = props;
  const [doses, setDoses] = useState<Dose[]>(initialDoses);

  async function confirmDose(id: number) {
    console.log("CLICK confirmDose", id);

    const now = new Date();

    const dose = doses.find((d) => d.id === id);
    if (!dose || dose.taken) return;

    const [h, m] = dose.scheduledAt.split(":").map(Number);
    const scheduled = new Date();
    scheduled.setHours(h, m, 0, 0);

    const delayMs = now.getTime() - scheduled.getTime();
    const delayMinutes = Math.max(0, Math.round(delayMs / 60000));
    const confirmedAt = now.toTimeString().slice(0, 5);

    console.log("ABOUT TO FETCH", {
      medicationName: dose.medicationName,
      scheduledAt: dose.scheduledAt,
      confirmedAt,
      delayMinutes,
    });

    try {
      // timeout: ako backend ne odgovori za 5s, prekidamo i dobijemo error
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const result = await confirmDoseApi(
        {
          medicationName: dose.medicationName,
          scheduledAt: dose.scheduledAt,
          confirmedAt,
          delayMinutes,
        },
        controller.signal,
      );

      clearTimeout(timeoutId);

      console.log("API RESULT", result);

      setDoses((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                taken: true,
                delayMinutes: result.delayMinutes,
                riskLevel: result.riskLevel,
              }
            : d,
        ),
      );

      onConfirmed({
        id: Date.now(),
        medicationName: result.medicationName,
        scheduledAt: result.scheduledAt,
        confirmedAt: result.confirmedAt,
        delayMinutes: result.delayMinutes,
        riskLevel: result.riskLevel,
      });
    } catch (err) {
      console.error("API FAILED", err);
      alert("Backend poziv nije uspio. Pogledaj Console (F12) za detalje.");
    }
  }

  return (
    <div>
      {doses.map((dose) => (
        <div
          key={dose.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 12,
            border: "1px solid #ccc",
            marginBottom: 8,
            borderRadius: 4,
          }}
        >
          <div>
            <strong>{dose.medicationName}</strong>
            <div>Scheduled: {dose.scheduledAt}</div>

            {dose.taken && dose.delayMinutes !== undefined && (
              <div>Delay: {dose.delayMinutes} min</div>
            )}

            {dose.taken && dose.riskLevel && (
              <div>
                Risk: <strong>{dose.riskLevel.toUpperCase()}</strong>
              </div>
            )}
          </div>

          <div>
            {dose.taken ? (
              <span style={{ color: "green" }}>Taken</span>
            ) : (
              <button onClick={() => confirmDose(dose.id)}>
                Terapija uzeta
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
