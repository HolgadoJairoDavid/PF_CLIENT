import io from "socket.io-client";

const socket = io("https://pfapi-production.up.railway.app");

export default socket;
