export type DoseEvent = {
  id: number;
  medicationName: string;
  scheduledAt: string;
  confirmedAt: string;
  delayMinutes: number;
  riskLevel: "normal" | "warning" | "critical";
};

export function DoseHistory(props: { events: DoseEvent[] }) {
  const { events } = props;

  if (events.length === 0) {
    return <p>No history yet.</p>;
  }

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: 12 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 8 }}>Medication</th>
            <th style={{ textAlign: "left", padding: 8 }}>Scheduled</th>
            <th style={{ textAlign: "left", padding: 8 }}>Confirmed</th>
            <th style={{ textAlign: "left", padding: 8 }}>Delay (min)</th>
            <th style={{ textAlign: "left", padding: 8 }}>Risk</th>
          </tr>
        </thead>

        <tbody>
          {events.map((e) => (
            <tr key={e.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ padding: 8 }}>{e.medicationName}</td>
              <td style={{ padding: 8 }}>{e.scheduledAt}</td>
              <td style={{ padding: 8 }}>{e.confirmedAt}</td>
              <td style={{ padding: 8 }}>{e.delayMinutes}</td>
              <td style={{ padding: 8 }}>{e.riskLevel.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
