import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SinglePlayerPage from "./pages/SinglePlayerPage";
import VersusPage from "./pages/VersusPage";
import WinScreen from "./components/WinScreen";
import { useRecoilValue } from "recoil";
import { loseConditionAtom, winConditionAtom } from "./store/atoms";
import LoseScreen from "./components/LoseScreen";

function App() {
  // hooks
  const winCondiiton = useRecoilValue(winConditionAtom);
  const loseCondition = useRecoilValue(loseConditionAtom);
 
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/single-player" element={<SinglePlayerPage />} />
        <Route path="/versus" element={<VersusPage />} />
      </Routes>
      {winCondiiton && <WinScreen />}
      {loseCondition && <LoseScreen />}
    </>
  );
}

export default App;
