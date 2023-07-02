import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SinglePlayerPage from "./pages/SinglePlayerPage";
import VersusPage from "./pages/VersusPage";
import Confetti from "./components/Confetti";
import { useRecoilValue } from "recoil";
import { winConditionAtom } from "./store/atoms";

function App() {
  // hooks
  const winCondiiton = useRecoilValue(winConditionAtom);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/single-player" element={<SinglePlayerPage />} />
        <Route path="/versus" element={<VersusPage />} />
      </Routes>
      {winCondiiton && <Confetti />}
    </>
  );
}

export default App;
