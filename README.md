## About the Project:

This is discord clone app that I created using MERN Stack + Redux and Socket.io.
Project features realtime communication between 2 or more users. For example
You can send and receive direct messages in realtime, and you can also create Group Calls with up to maximum of 4 people.
You can join the call with Audio Only mode which will only send audio stream to members of the call,
but if you have Camera plugged in you can disable Audio Only mode and join the call with your camara.
Audio Only mode is enabled by default and can be toggled on/off by clicking on [Vertical Dots Icon] found in top-right corner.
While inside the call you can toggle your camera and microphone. Also if you joined with your camara you have additional feature of sharing your screen with
other users in the call. This is done by replacing outgoing video track with display capture track.

Key Features:

- Authentication Flow (JWT), Socket Middleware
- Data Validation with Joi
- CRUD Operations
- Realtime Commmuncation between 2 or more users.
- Friend Request System
- Direct Messages
- Group Calls -- Audio and Video
- Screen Sharing

#### Preview: [Live Demo:](https://my-discord-clone-01.onrender.com)
** There are some issues with host blocking websockets, you might need to try multiple times to connect
