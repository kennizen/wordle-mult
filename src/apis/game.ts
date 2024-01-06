import { API } from ".";

export const getGameWord = async () => {
  return await API.get("/");
};

export const saveWord = async ({ roomId, word }: { roomId: string; word: string }) => {
  return await API.post("/", {
    roomId,
    word,
  });
};

export const getWordByRoomId = async (roomId: string) => {
  return await API.get(`/${roomId}`);
};
