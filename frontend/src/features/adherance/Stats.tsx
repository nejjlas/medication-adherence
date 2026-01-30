import type { DoseEvent } from "./DoseHistory";

export function Stats(props: { events: DoseEvent[] }) {
  const { events } = props;

  if (events.length === 0) {
    return <p>No data yet.</p>;
  }

  const totalEvents = events.length;

  const averageDelay = Math.round(
    events.reduce((sum, e) => sum + e.delayMinutes, 0) / totalEvents,
  );

  const missedCount = events.filter(
    (e) => e.delayMinutes > averageDelay + 15,
  ).length;

  const missedRate = Math.round((missedCount / totalEvents) * 100);

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 4 }}>
        <h3>Average delay (learned)</h3>
        <strong>{averageDelay} min</strong>
      </div>

      <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 4 }}>
        <h3>Risk threshold</h3>
        <div>Normal ≤ {averageDelay + 5} min</div>
        <div>Warning ≤ {averageDelay + 15} min</div>
        <div>Critical &gt; {averageDelay + 15} min</div>
      </div>

      <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 4 }}>
        <h3>Risk rate</h3>
        <strong>{missedRate}%</strong>
      </div>
    </div>
  );
}
