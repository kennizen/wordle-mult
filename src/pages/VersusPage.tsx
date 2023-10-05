import { useEffect, useState } from "react";
import { useSocketContext } from "../providers/SocketProvider";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "../layouts/MainLayout";
import VirtualKeyboard from "../components/VirtualKeyboard";
import GiveUp from "../components/GiveUp";
import Board from "../components/Board";
import CountdownTimer from "../components/CountdownTimer";
import { ReactComponent as ConsoleIcon } from "../assets/icons/console.svg";
import PlayerTwoInfo from "../components/PlayerTwoInfo";

const VersusPage = () => {
  // hooks
  const socket = useSocketContext();

  // states
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  // useEffect(() => {
  //   if (userId === null) return;
  //   socket?.on("connect", () => {
  //     socket.emit("join", userId);
  //   });
  // }, [userId]);

  return (
    <>
      <MainLayout>
        <section className="flex w-full h-full">
          <div className="flex-1 flex flex-col py-4 px-16 gap-y-10">
            <div className="flex items-center justify-between h-[56px]">
              <GiveUp />
              {/* {beginGame && <CountdownTimer start={5} />} */}
              <CountdownTimer start={50} />
            </div>
            <div className="flex items-center flex-col gap-y-20">
              <Board />
              <VirtualKeyboard />
            </div>
          </div>
          <div className="w-[40%]">
            <div className="mb-36"></div>
            <PlayerTwoInfo />
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default VersusPage;
