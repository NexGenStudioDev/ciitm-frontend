import { io } from 'socket.io-client';

if (!import.meta.env.VITE_BACKEND_URL) {
   throw new Error(
      'VITE_BACKEND_URL is not defined in environment variables',
   );
}

// 👇 Initialize socket connection
const socket = io(import.meta.env.VITE_BACKEND_URL, {
   auth: {
    token: localStorage.getItem('token'), // or sessionStorage
    },
   withCredentials: true, // Allow cookies to be sent with requests
   autoConnect: true, // Automatically connect on load (set to false if you want manual control)
   transports: ['websocket'], // Prefer WebSocket
   reconnectionAttempts: 5, // Retry 5 times if connection fails
   timeout: 20000, // Max time to wait for connection
   pingTimeout: 20000, // Max time to wait for ping response
   pingInterval: 25000, // Send ping every 25s
});

// ✅ Connection success

socket.on('connect', () => {
   console.log('✅ Connected to server');
});

socket.on('disconnect', () => {
   console.log('❌ Disconnected from server');

   if (socket.connected) {
      console.log('✅ Reconnected to server');
      socket.connect();
   }
});

socket.on('connect_error', error => {
   console.error('❌ Connection error:', error);
   throw new Error(`Connection error: ${error.message}`);
});

socket.on('connect_timeout', timeout => {
   console.error(`Connection timeout: ${timeout}`);
});

export default socket;
