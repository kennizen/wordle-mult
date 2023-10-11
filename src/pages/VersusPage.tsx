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
import { useRecoilState } from "recoil";
import { beginGameAtom } from "../store/atoms";
import Modal from "../components/Modal";
import GameStartCountdown from "../components/GameStartCountdown";

const VersusPage = () => {
  // hooks
  const socket = useSocketContext();
  const [params, _] = useSearchParams();
  const [beginGame, setBeginGame] = useRecoilState(beginGameAtom);

  // states
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerJoined, setPlayerJoined] = useState(false);
  const [ready, setReady] = useState(false);

  // consts
  const roomIdFromParams = params.get("room");

  // handlers
  function joinRoom() {
    socket?.emit("join", roomIdFromParams === null ? roomId : roomIdFromParams);
  }

  function handleStartGame() {
    socket?.emit("start-game", roomId);
    setReady(true);
  }

  // lifecycles
  useEffect(() => {
    setRoomId(uuidv4());
  }, []);

  useEffect(() => {
    if (roomId === null || socket === null) return;
    joinRoom();
  }, [roomId, socket]);

  useEffect(() => {
    socket?.on("player-joined", () => setPlayerJoined(true));
    socket?.on("start-game", () => setReady(true));
    // socket?.on("begin-game", () => console.log("got begin game"));
  }, [socket]);

  console.log(roomIdFromParams, socket);

  return (
    <>
      {ready && (
        <>
          <MainLayout>
            <section className="flex w-full h-full">
              <div className="flex-1 flex flex-col py-4 px-16 gap-y-10">
                <div className="flex items-center justify-between h-[56px]">
                  <GiveUp />
                  {beginGame && <CountdownTimer startSeconds={30000} />}
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
          {!beginGame && <GameStartCountdown />}
        </>
      )}
      {!playerJoined && roomId !== null && roomIdFromParams === null && <InvitePlayerModal rid={roomId} />}
      {playerJoined && !ready && (
        <Modal open>
          <div className="p-4">
            <button
              onClick={handleStartGame}
              className="p-2 rounded-md bg-blue-50 border border-blue-500 text-blue-500 hover:bg-blue-100"
            >
              Start Game!
            </button>
          </div>
        </Modal>
      )}
      {roomIdFromParams !== null && !ready && (
        <Modal open>
          <div className="p-4">
            <p className="p-2">Waiting for host to start the game...</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default VersusPage;
