import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SinglePlayerPage from "./pages/SinglePlayerPage";
import VersusPage from "./pages/VersusPage";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/single-player" element={<SinglePlayerPage />} />
                <Route path="/versus" element={<VersusPage />} />
            </Routes>
        </>
    );
}

export default App;
