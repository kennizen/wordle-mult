import { useEffect, useState } from "react";
import { useSocketContext } from "../providers/SocketProvider";
import { v4 as uuidv4 } from "uuid";

const VersusPage = () => {
  // hooks
  const socket = useSocketContext();

  // states
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  useEffect(() => {
    if (userId === null) return;
    socket?.on("connect", () => {
      socket.emit("join", userId);
    });
  }, [userId]);

  return <div>hello</div>;
};

export default VersusPage;
