import { useEffect, useState } from "react";
import { useSocketContext } from "../providers/SocketProvider";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "../layouts/MainLayout";
import VirtualKeyboard from "../components/VirtualKeyboard";
import GiveUp from "../components/GiveUp";
import Board from "../components/Board";
import CountdownTimer from "../components/CountdownTimer";
import PlayerTwoInfo from "../components/PlayerTwoInfo";
import InvitePlayerModal from "../components/InvitePlayerModal";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { beginGameAtom } from "../store/atoms";

const VersusPage = () => {
  // hooks
  const socket = useSocketContext();
  const [params, _] = useSearchParams();
  const beginGame = useRecoilValue(beginGameAtom);

  // states
  const [userId, setUserId] = useState<string | null>(null);

  // handlers
  function joinRoom() {
    socket?.on("connect", () => {
      socket.emit("join", params.get("room") === null ? userId : params.get("room"));
    });
  }

  // lifecycles
  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  useEffect(() => {
    if (userId === null) return;
    joinRoom();
  }, [userId]);

  console.log(params.get("room"));

  return (
    <>
      {beginGame && (
        <MainLayout>
          <section className="flex w-full h-full">
            <div className="flex-1 flex flex-col py-4 px-16 gap-y-10">
              <div className="flex items-center justify-between h-[56px]">
                <GiveUp />
                <CountdownTimer startSeconds={30000} />
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
      )}
      {userId !== null && <InvitePlayerModal uid={userId} />}
    </>
  );
};

export default VersusPage;
