//css
import { useEffect, useState } from 'react';
import '../App.css';
//components
import Chat from '../components/chat/chat.js';
//io
import io from 'socket.io-client';


function ChatRoom(props) {
  var roomID;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    roomID = window.location.pathname;
    roomID = roomID.substring(1, roomID.length);
    const userSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(userSocket);
    userSocket.emit('roomData', {
      from: roomID,
      username: localStorage.getItem('un')
    });
    localStorage.removeItem('un');
    return () => userSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="App-header">
        {socket ? <Chat name='example chat' socket={socket} /> : <></>}
      </header>
    </div>
  );
}

export default ChatRoom;