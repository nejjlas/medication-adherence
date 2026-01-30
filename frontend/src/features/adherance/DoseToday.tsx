import { useState } from "react";
import type { DoseEvent } from "./DoseHistory";

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

  function confirmDose(id: number) {
    const now = new Date();

    setDoses((prev) =>
      prev.map((dose) => {
        if (dose.id !== id || dose.taken) return dose;

        const [h, m] = dose.scheduledAt.split(":").map(Number);
        const scheduled = new Date();
        scheduled.setHours(h, m, 0, 0);

        const delayMs = now.getTime() - scheduled.getTime();
        const delayMinutes = Math.max(0, Math.round(delayMs / 60000));

        let riskLevel: "normal" | "warning" | "critical" = "normal";
        if (delayMinutes >= 10) riskLevel = "warning";
        if (delayMinutes >= 20) riskLevel = "critical";

        const confirmedAt = now.toTimeString().slice(0, 5);

        const event = {
          id: Date.now(),
          medicationName: dose.medicationName,
          scheduledAt: dose.scheduledAt,
          confirmedAt,
          delayMinutes,
          riskLevel,
        };

        onConfirmed(event);

        return {
          ...dose,
          taken: true,
          delayMinutes,
          riskLevel,
        };
      }),
    );
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
