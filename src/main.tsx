import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SocketProvider from "./providers/SocketProvider.tsx";
import ClientProvider from "./providers/ClientProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ClientProvider>
    <RecoilRoot>
      <BrowserRouter>
        <SocketProvider>
          <App />
        </SocketProvider>
      </BrowserRouter>
    </RecoilRoot>
  </ClientProvider>
);
