import { UserContextProvider } from "@contexts/UserContextProvider";
import { TransferContextProvider } from "@contexts/TransferContextProvider";
import { VideoContentContextProvider } from "@contexts/VideoContentContextProvider";
import { AutoSearchContextProvider } from "@contexts/AutoSearchProvider";
import { PayContextProvider } from "@contexts/PayContextProvider";
import { PostContextProvider } from "@contexts/PostContextProvider";
const Provider = ({ children }) => {
  return (
    <UserContextProvider>
      <VideoContentContextProvider>
        <PayContextProvider>
          <AutoSearchContextProvider>
            <TransferContextProvider>
              <PostContextProvider>{children}</PostContextProvider>
            </TransferContextProvider>
          </AutoSearchContextProvider>
        </PayContextProvider>
      </VideoContentContextProvider>
    </UserContextProvider>
  );
};

export default Provider;
