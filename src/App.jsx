import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import History from "./components/History";
import SharedResult from "./components/SharedResult";

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | quiz | results | history | shared
  const [answers, setAnswers] = useState({});
  const [sharedToken, setSharedToken] = useState(null);

  // On mount: check if URL is /r/{token}
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/r\/([a-z0-9]+)$/);
    if (match) {
      setSharedToken(match[1]);
      setScreen("shared");
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      {screen === "landing" && (
        <Landing
          onStart={() => setScreen("quiz")}
          onHistory={() => setScreen("history")}
        />
      )}
      {screen === "quiz" && (
        <Quiz
          onComplete={(ans) => { setAnswers(ans); setScreen("results"); }}
          onBack={() => setScreen("landing")}
        />
      )}
      {screen === "results" && (
        <Results
          answers={answers}
          onRetake={() => { setAnswers({}); setScreen("landing"); }}
        />
      )}
      {screen === "history" && (
        <History
          onBack={() => setScreen("landing")}
          onViewShared={(token) => { setSharedToken(token); setScreen("shared"); }}
        />
      )}
      {screen === "shared" && (
        <SharedResult
          token={sharedToken}
          onBack={() => setScreen("landing")}
        />
      )}
    </div>
  );
}