import Board from "../components/Board";
import MainLayout from "../layouts/MainLayout";

const SinglePlayerPage = () => {
    return (
        <MainLayout>
            <section className="flex w-full h-[65%]">
                <div className="w-96 bg-red-300"></div>
                <div className="flex-1 flex items-center justify-center">
                    <Board />
                </div>
                <div className="w-96 bg-red-300"></div>
            </section>
            <section></section>
        </MainLayout>
    );
};

export default SinglePlayerPage;
