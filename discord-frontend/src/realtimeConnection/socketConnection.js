import io from "socket.io-client";
import { setPendingFriendsInvitations } from "../store/actions/friendsActions";
import { store } from "../store/store";

let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  });
  socket.on("connect", () => {
    console.log("Successfully connected with scoket.io server", socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingFriendsInvitations } = data;
    console.log("pendingFriendsInvitations ", pendingFriendsInvitations);
    store.dispatch(setPendingFriendsInvitations(pendingFriendsInvitations));
  });
};
