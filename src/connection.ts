import { io } from "socket.io-client";

export const URL = `http://${document.location.hostname}:${process.env.REACT_APP_DOMAIN_PORT}`;

export const socket = io(URL);
