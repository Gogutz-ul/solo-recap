import { useState } from "react";
import { RecapForm } from "./app/RecapForm";
import { StoryPlayer } from "./app/StoryPlayer";
import { DEFAULT_RECAP, type RecapData } from "./remotion/schema";

export default function App() {
  const [data, setData] = useState<RecapData | null>(null);

  if (!data) {
    return (
      <div className="screen form-screen">
        <RecapForm initial={DEFAULT_RECAP} onStart={setData} />
      </div>
    );
  }

  return (
    <div className="screen">
      <StoryPlayer data={data} onEdit={() => setData(null)} />
    </div>
  );
}
