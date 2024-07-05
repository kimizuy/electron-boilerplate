import { useEffect, useState } from "react";
import "./App.css";

function App(): JSX.Element {
  const [taskResult, setTaskResult] = useState("Performing heavy task...");

  useEffect(() => {
    window.electron.invoke("perform-heavy-task").then((result) => {
      setTaskResult(result);
    });
  }, []);

  return (
    <div>
      <h1>{taskResult}</h1>
    </div>
  );
}

export default App;
