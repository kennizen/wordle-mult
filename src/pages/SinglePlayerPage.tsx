import { useRecoilValue } from "recoil";
import Board from "../components/Board";
import CountdownTimer from "../components/CountdownTimer";
import GameStartCountdown from "../components/GameStartCountdown";
import GiveUp from "../components/GiveUp";
import VirtualKeyboard from "../components/VirtualKeyboard";
import MainLayout from "../layouts/MainLayout";
import { beginGameAtom } from "../store/atoms";

const SinglePlayerPage = () => {
  // hooks
  const beginGame = useRecoilValue(beginGameAtom);

  return (
    <>
      <MainLayout>
        <section className="flex w-full h-[65%]">
          <div className="w-96"></div>
          <div className="flex-1 flex flex-col py-4 px-16 gap-y-10">
            <div className="flex items-center justify-between h-[56px]">
              <GiveUp />
              {beginGame && <CountdownTimer start={1} />}
            </div>
            <div className="flex justify-center">
              <Board />
            </div>
          </div>
          <div className="w-96"></div>
        </section>
        <section className="p-2 flex justify-center">
          <VirtualKeyboard />
        </section>
      </MainLayout>
      {!beginGame && <GameStartCountdown />}
    </>
  );
};

export default SinglePlayerPage;
