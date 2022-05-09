import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = ({ friends, onlineUsers }) => {
  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    return friends.map((f) => {
      const isThisUserOnline = onlineUsers.find((user) => user.userId === f.id);
      return { ...f, isOnline: isThisUserOnline ? true : false };
    });
  };

  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return { ...friends };
};

export default connect(mapStoreStateToProps)(FriendsList);
