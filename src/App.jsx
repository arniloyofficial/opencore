import { useState } from "react";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | quiz | results
  const [answers, setAnswers] = useState({});

  return (
    <div style={{ minHeight: "100vh" }}>
      {screen === "landing" && <Landing onStart={() => setScreen("quiz")} />}
      {screen === "quiz" && (
        <Quiz
          onComplete={(ans) => { setAnswers(ans); setScreen("results"); }}
          onBack={() => setScreen("landing")}
        />
      )}
      {screen === "results" && (
        <Results answers={answers} onRetake={() => { setAnswers({}); setScreen("landing"); }} />
      )}
    </div>
  );
}
