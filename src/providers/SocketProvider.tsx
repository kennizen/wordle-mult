import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface IProps {
  children: React.ReactNode;
}

const socket = io(import.meta.env.VITE_BACKEND_URL);

const SocketContext = createContext<Socket<any, any> | null>(null);

export function useSocketContext() {
  return useContext(SocketContext);
}

const SocketProvider = ({ children }: IProps) => {
  const [sock, setSock] = useState<Socket<any, any> | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
      setSock(socket);
    });
  }, []);

  return <SocketContext.Provider value={sock}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
