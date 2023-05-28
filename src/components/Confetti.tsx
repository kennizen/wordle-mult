import Lottie from "lottie-react";
import confettiAnimation from "../assets/animation/66948-confetti.json";

const Confetti = () => {
    return (
        <div className="fixed w-full h-screen bg-transparent top-0 left-0">
            <div className="w-[35rem] mx-auto">
                <Lottie animationData={confettiAnimation} />
            </div>
        </div>
    );
};

export default Confetti;
