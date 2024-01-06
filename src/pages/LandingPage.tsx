import MainLayout from "../layouts/MainLayout";
import {useNavigate} from "react-router-dom"

const LandingPage = () => {

    // hooks
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="h-full w-full flex items-center justify-center flex-col gap-y-8">
                <button onClick={()=>navigate("/single-player")} className="px-8 py-2 text-2xl rounded-lg bg-amber-400 text-white shadow-lg hover:shadow-none transition-shadow duration-300 active:bg-amber-500">SOLO</button>
                <button onClick={()=>navigate("/versus")} className="px-8 py-2 text-2xl rounded-lg bg-amber-400 text-white shadow-lg hover:shadow-none transition-shadow duration-300 active:bg-amber-500">1 V 1</button>
            </div>
        </MainLayout>
    );
};

export default LandingPage;
