import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants.js';

let socket;

export function getSocket(token) {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }

  if (token) {
    socket.auth = { token };
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}

export function emitSosAlert(token, payload) {
  const activeSocket = getSocket(token);

  if (activeSocket.connected) {
    activeSocket.emit('sos-alert', payload);
    return;
  }

  activeSocket.connect();
  activeSocket.once('connect', () => {
    activeSocket.emit('sos-alert', payload);
  });
}
