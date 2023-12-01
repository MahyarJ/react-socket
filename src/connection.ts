import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
export const URL = process.env.REACT_APP_DOMAIN || "http://localhost:3000";

export const socket = io(URL);