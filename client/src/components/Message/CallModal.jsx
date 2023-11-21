import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import RingRing from "../../audio/ringring.mp3";
import { setAlert, setCall } from "../../features/call/callSlice";
import { MdCallEnd } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { toast } from "react-toastify";
import { useCreateMessageMutation } from "../../features/messages/messageapi";
import { FcVideoCall } from "react-icons/fc";

const CallModal = () => {
  const { call, peer, alertMsg } = useSelector((state) => state.call);
  const { socket } = useSelector((state) => state.socket);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [callActive, setCallActive] = useState(true);
  const [answer, setAnswer] = useState(false);
  const youVideo = useRef();
  const otherVideo = useRef();
  const [tracks, setTracks] = useState(null);
  const [newCall, setNewCall] = useState(null);
  const [createMessage] = useCreateMessageMutation();
  // Set Time
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  // End Call
  const addCallMessage = useCallback(
    async (call, times, disconnect) => {
      if (call.recipient !== profile._id || disconnect) {
        const msg = {
          sender: call.sender,
          recipient: call.recipient,
          text: "",
          media: [],
          call: { video: call.video, times },
        };
        try {
          const res = await createMessage(msg);
          if (res) {
            const { _id, avatar, name } = profile;
            socket.emit("addMessage", {
              ...msg,
              user: { _id, avatar, name },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [socket, profile, createMessage]
  );

  const handleEndCall = () => {
    setCallActive(true);
    tracks && tracks.forEach((track) => track.stop());
    if (newCall) newCall.close();
    let times = answer ? total : 0;
    socket.emit("endCall", { ...call, times });

    addCallMessage(call, times);
    dispatch(setCall(null));
  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit("endCall", { ...call, times: 0 });
        addCallMessage(call, 0);
        dispatch(setCall(null));
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    socket.on("endCallToClient", (data) => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      addCallMessage(data, data.times);
      dispatch(setCall(null));
      console.log(data);
    });

    return () => socket.off("endCallToClient");
  }, [socket, dispatch, tracks, newCall, addCallMessage]);

  // Stream Media
  const openStream = (video) => {
    const config = { audio: true, video };
    return navigator.mediaDevices.getUserMedia(config);
  };

  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  // Answer Call
  const handleAnswer = () => {
    if (call.video) {
      setCallActive(false);
    }
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on("stream", function (remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });
      setAnswer(true);
      setNewCall(newCall);
    });
  };

  useEffect(() => {
    peer.on("call", (newCall) => {
      if (call.video) {
        setCallActive(false);
      }
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);
        newCall.on("stream", function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        setNewCall(newCall);
      });
    });
    return () => peer.removeListener("call");
  }, [peer, call.video]);

  // Disconnect
  useEffect(() => {
    socket.on("callerDisconnect", () => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      let times = answer ? total : 0;
      addCallMessage(call, times, true);
      dispatch(setCall(null));
      dispatch(setAlert(`The ${call.username} disconnect`));
    });

    return () => socket.off("callerDisconnect");
  }, [socket, tracks, dispatch, call, answer, total, newCall, addCallMessage]);

  // Play - Pause Audio
  const playAudio = (newAudio) => {
    newAudio.play();
  };

  const pauseAudio = (newAudio) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  useEffect(() => {
    let newAudio = new Audio(RingRing);
    if (answer) {
      pauseAudio(newAudio);
    } else {
      playAudio(newAudio);
    }

    return () => pauseAudio(newAudio);
  }, [answer]);

  useEffect(() => {
    if (alertMsg) {
      toast.error(alertMsg);
      dispatch(setAlert(""));
    }
  }, [alertMsg, dispatch]);

  return (
    <>
      {callActive && (
        <div className="bg-blue-400 text-white rounded-md fixed p-4 call-modal flex flex-col items-center">
          <div className="flex flex-col justify-between items-center h-full">
            <div className="text-center flex flex-col items-center gap-2">
              <img
                src={call.avatar}
                className="w-6 rounded-full border-2 border-red-500 "
              />
              <h4 className="font-bold ">{call.name}</h4>
              {answer ? (
                <div>
                  <span>
                    {hours.toString().length < 2 ? "0" + hours : hours}
                  </span>
                  <span>:</span>
                  <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
                  <span>:</span>
                  <span>
                    {second.toString().length < 2 ? "0" + second : second}
                  </span>
                </div>
              ) : (
                <div className="font-thin">
                  {call.video ? (
                    <span>Video Call</span>
                  ) : (
                    <span>Voice Call</span>
                  )}
                </div>
              )}
            </div>

            {!answer && (
              <div className="timer text-white font-bold">
                <small>{mins.toString().length < 2 ? "0" + mins : mins}</small>
                <small>:</small>
                <small>
                  {second.toString().length < 2 ? "0" + second : second}
                </small>
              </div>
            )}

            <div className="flex justify-between items-center gap-6 ">
              {call.recipient === profile._id && !answer && (
                <>
                  {call.video ? (
                    <button
                      className="text-green-600 text-xl"
                      onClick={handleAnswer}
                    >
                      <FcVideoCall />
                    </button>
                  ) : (
                    <button onClick={handleAnswer}>
                      <IoMdCall className="text-green-600 text-xl" />
                    </button>
                  )}
                </>
              )}

              <button onClick={handleEndCall}>
                <MdCallEnd className="text-2xl text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed call-video  border-2 border-red-500 inset-0 w-24 ${
          answer && call.video ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-center items-center ">
          <video ref={youVideo} className="user-video " playsInline muted />
          <video ref={otherVideo} className="client-video " playsInline />
        </div>

        <div className="time_video text-white font-bold">
          <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
          <span>:</span>
          <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
          <span>:</span>
          <span>{second.toString().length < 2 ? "0" + second : second}</span>
        </div>

        <button onClick={handleEndCall} className="">
          <MdCallEnd className="text-2xl text-red-500 " />
        </button>
      </div>
    </>
  );
};

export default CallModal;
