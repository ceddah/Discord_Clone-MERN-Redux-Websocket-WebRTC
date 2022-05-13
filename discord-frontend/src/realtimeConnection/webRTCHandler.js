import store from "../store/store";
import { setLocalStream } from "../store/actions/roomActions";

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: true,
};

export const getLocalStreamPreview = (onlyAudio = false, callback) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      // we are going to create a new room only if we get access to the local stream
      callback();
    })
    .catch((err) => {
      console.log("Cannot get an access to local stream.", err);
    });
};
