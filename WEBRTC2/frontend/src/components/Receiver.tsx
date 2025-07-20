import { useEffect } from "react"

export const Receiver = () => {
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'receiver'
      }));
    }

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      let pc : RTCPeerConnection | null = null;
      if(message.type == "createOffer") {
        //create an answer

        pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);

        pc.ontrack = (event) => {
          const video = document.createElement("video");
          video.srcObject = new MediaStream([event.track]);
          video.autoplay = true;
          video.muted = true; // 👈 important to allow autoplay without user interaction
          document.body.appendChild(video);
          video.play().catch(console.error); // optional to suppress errors
        };

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        pc.onicecandidate = (event) => {
            if(event.candidate){
                socket?.send(JSON.stringify({type: "iceCandidate", candidate: event.candidate}));
            }
        }

        socket.send(JSON.stringify({type: "createAnswer", sdp: pc.localDescription}))
      }else if (message.type === "iceCandidate"){
        if(!pc) return;
        pc.addIceCandidate(message.candidate)
      }
    }
    startReceiving(socket);
  }, []);

  function startReceiving(socket: WebSocket) {
    // ... (implementation omitted for brevity)
  }

  return <div>
    Reciever
  </div>
}