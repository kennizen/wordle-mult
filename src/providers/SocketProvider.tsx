import { createContext, useContext } from "react";
import { Socket, io } from "socket.io-client";

interface IProps {
  children: React.ReactNode;
}

// const socket = io(import.meta.env.VITE_BACKEND_URL);

const SocketContext = createContext<Socket<any, any> | null>(null);

export function useSocketContext() {
  return useContext(SocketContext);
}

const SocketProvider = ({ children }: IProps) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
