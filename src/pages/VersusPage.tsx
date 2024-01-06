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
import { beginGameAtom, oriWordAtom } from "../store/atoms";
import Modal from "../components/Modal";
import GameStartCountdown from "../components/GameStartCountdown";
import { GET_GAME_WORD, GET_WORD_BY_ROOMID } from "../constants/queryKeys";
import { getGameWord, getWordByRoomId, saveWord } from "../apis/game";
import { useQuery, useMutation } from "@tanstack/react-query";

const VersusPage = () => {
  // hooks
  const socket = useSocketContext();
  const [params, _] = useSearchParams();
  const [beginGame, setBeginGame] = useRecoilState(beginGameAtom);
  const [oriword, setOriWord] = useRecoilState(oriWordAtom);

  // states
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerJoined, setPlayerJoined] = useState(false);
  const [ready, setReady] = useState(false);

  // consts
  const roomIdFromParams = params.get("room");

  const LoadingScreen = (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <p className="text-white font-semibold text-xl">Loading...</p>
    </div>
  );

  // queries
  const { isLoading: getGameWordLoading, data: getGameWordData } = useQuery({
    queryKey: [GET_GAME_WORD],
    queryFn: getGameWord,
    onError(err) {
      console.log(err);
    },
    enabled: roomIdFromParams === null,
    refetchOnWindowFocus: false,
  });

  const { isLoading: getWordByRoomIdLoading, data: getWordByRoomIdData } = useQuery({
    queryKey: [GET_WORD_BY_ROOMID],
    queryFn: () => getWordByRoomId(roomIdFromParams!),
    onError(err) {
      console.log(err);
    },
    enabled: roomIdFromParams !== null,
    refetchOnWindowFocus: false,
  });

  // mutations
  const { isLoading: saveWordLoading, mutate } = useMutation({
    mutationFn: saveWord,
    onError(error, variables, context) {
      console.log(error);
    },
  });

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
  }, [socket]);

  useEffect(() => {
    if (getGameWordData !== undefined) setOriWord(getGameWordData.data.word);
    else if (getWordByRoomIdData !== undefined) setOriWord(getWordByRoomIdData.data.word);
  }, [getGameWordData, getWordByRoomIdData]);

  useEffect(() => {
    if (roomId === null || getGameWordData === undefined) return;
    mutate({ roomId: roomId, word: getGameWordData.data.word });
  }, [roomId, getGameWordData]);

  useEffect(() => {
    if (oriword === "" || roomIdFromParams === null) return;
    socket?.emit("player-is-ready", roomIdFromParams);
  }, [oriword, socket]);

  if ((getGameWordLoading || saveWordLoading) && roomIdFromParams === null) {
    return LoadingScreen;
  }

  if (getWordByRoomIdLoading && roomIdFromParams !== null) {
    return LoadingScreen;
  }

  console.log("player joined", playerJoined);

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
