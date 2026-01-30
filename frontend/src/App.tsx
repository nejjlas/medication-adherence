import { useState } from "react";
import { DoseToday } from "./features/adherance/DoseToday";
import { DoseHistory, type DoseEvent } from "./features/adherance/DoseHistory";
import { Stats } from "./features/adherance/Stats";

export default function App() {
  const [events, setEvents] = useState<DoseEvent[]>([]);

  function addEvent(e: DoseEvent) {
    setEvents((prev) => [e, ...prev]);
  }

  return (
    <div
      style={{
        fontFamily: "system-ui",
        padding: 24,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1>Medication Adherence</h1>

      <section style={{ marginTop: 24 }}>
        <h2>Today's reminders</h2>
        <DoseToday onConfirmed={addEvent} />
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>History</h2>
        <DoseHistory events={events} />
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Stats</h2>
        <Stats events={events} />
      </section>
    </div>
  );
}
