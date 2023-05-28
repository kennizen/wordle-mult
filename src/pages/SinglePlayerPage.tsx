import Board from "../components/Board";
import VirtualKeyboard from "../components/VirtualKeyboard";
import MainLayout from "../layouts/MainLayout";

const SinglePlayerPage = () => {
    return (
        <MainLayout>
            <section className="flex w-full h-[65%]">
                <div className="w-96 bg-red-200"></div>
                <div className="flex-1 flex items-center justify-center">
                    <Board />
                </div>
                <div className="w-96 bg-red-300"></div>
            </section>
            <section className="p-2 flex justify-center">
                <VirtualKeyboard />
            </section>
        </MainLayout>
    );
};

export default SinglePlayerPage;
