const connectedUsers = new Map();
let io;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
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
  connectedUsers.forEach(function (key, value) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
};
