import { UserContextProvider } from "./UserContext";
import { TransferContextProvider } from "./TransferContextProvider";
import { VideoContentContextProvider } from "./VideoContentContextProvide";

const Provider = ({ children }) => {
  return (
    <UserContextProvider>
      <VideoContentContextProvider>
        <TransferContextProvider>{children}</TransferContextProvider>
      </VideoContentContextProvider>
    </UserContextProvider>
  );
};

export default Provider;
