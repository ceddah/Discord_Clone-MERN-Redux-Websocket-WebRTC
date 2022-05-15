const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();
let activeRooms = [];
let io;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  // this is key value pairs ----> socketId: { userId }
  connectedUsers.set(socketId, { userId });
  console.log("connectedUsers: ", connectedUsers);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("connectedUsers: ", connectedUsers);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];
  // Because user can be connected on multiple devices, we are checking for every connection
  // for this specific userId
  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach(function (value, key) {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });
  return onlineUsers;
};

const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [{ userId, socketId }],
    roomId: uuidv4(),
  };
  activeRooms = [...activeRooms, newActiveRoom];
  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRooms];
};
const getActiveRoom = (roomId) => {
  return activeRooms.find((room) => room.roomId === roomId);
};

const joinActiveRoom = (roomId, participantsDetails) => {
  activeRooms = activeRooms.map((activeRoom) => {
    if (activeRoom.roomId === roomId) {
      activeRoom.participants.push(participantsDetails);
      return activeRoom;
    }
    return activeRoom;
  });
};

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);
  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };
    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );
    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
};
