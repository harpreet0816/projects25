# WebRTC Peer-to-Peer Connection Guide

## Connecting the Two Sides

Establishing a WebRTC connection between two peers involves a series of steps facilitated by the **signaling server** and the `RTCPeerConnection` API provided by the browser.

### 📶 Connection Setup Process:

1. **Browser 1 creates an RTCPeerConnection**
   - Browser 1 creates an instance of the `RTCPeerConnection` object, which represents the WebRTC connection.

2. **Browser 1 creates an offer**
   - Generates an "offer" containing ICE candidates and session details (encoded in SDP format).

3. **Browser 1 sets the local description to the offer**
   - Sets its local description to the generated offer.

4. **Browser 1 sends the offer via signaling server**
   - Sends the offer to Browser 2 through the signaling server.

5. **Browser 2 receives the offer**
   - Receives the offer from Browser 1 via the signaling server.

6. **Browser 2 sets the remote description**
   - Sets its remote description to the received offer.

7. **Browser 2 creates an answer**
   - Generates an "answer" with its own ICE candidates and session details.

8. **Browser 2 sets the local description**
   - Sets the local description to the answer.

9. **Browser 2 sends the answer via signaling server**
   - Sends the answer back to Browser 1.

10. **Browser 1 receives the answer and sets the remote description**
    - Completes the connection by setting the remote description to the received answer.

At this point, a WebRTC peer-to-peer connection is established, allowing direct media exchange.

---

## 🎥 Sending and Receiving Media

To send and receive **audio/video**, the following additional steps are required:

1. **Ask for camera/microphone permissions**
   - Each browser requests permission from the user.

2. **Get the media streams**
   - Use `getUserMedia()` to obtain local audio/video streams.

3. **Call `addTrack()`**
   - Add the local media tracks to the `RTCPeerConnection`.

4. **Trigger `ontrack` on the remote peer**
   - When a track is added, the remote side receives it through the `ontrack` event and renders the stream.

---

## 🔀 SFU vs MCU in WebRTC

In group calls (more than 2 users), peer-to-peer becomes inefficient. Here’s where **SFU** and **MCU** help.

### 🔄 SFU (Selective Forwarding Unit)

- Think of it as a **smart router**.
- It **receives streams** from users and **forwards** them to others **without mixing**.
- Efficient on server, but each client handles multiple streams.

**Pros:**
- High video/audio quality
- Low server CPU usage

**Cons:**
- Higher load on client devices

**Used in:** Google Meet, Jitsi

### 🎛️ MCU (Multipoint Control Unit)

- Acts like a **video mixer**.
- It **receives all streams**, **mixes them** into a single stream, and sends one output to each user.
- Easier for clients, but heavy for server.

**Pros:**
- Simple for end-users (only 1 stream to handle)
- Less client CPU usage

**Cons:**
- Lower stream quality (due to mixing)
- High server processing

**Used in:** Legacy systems (older Skype, Cisco MCU)

---

## 🧠 Summary Table

| Feature        | SFU                            | MCU                           |
|----------------|---------------------------------|--------------------------------|
| Server Load    | Low                             | High                           |
| Client Load    | High (multiple streams)         | Low (single stream)            |
| Media Quality  | High                            | Medium/Low (compressed mix)    |
| Flexibility    | High                            | Low                            |

---

## 📎 Diagram Reference

See the following diagram to visually understand SFU and MCU flow:

![SFU vs MCU](./A_pair_of_educational_diagrams_in_digital_illustra.png)

---

## ✅ Conclusion

WebRTC allows real-time P2P communication. For 1-to-1 calls, it's direct and efficient. For group calls, using **SFU or MCU** helps manage the complexity depending on your performance and quality goals.

https://jsfiddle.net/rainzhao/3L9sfsvf/