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
    roomID = window.location.pathname.substring(1);
    const userSocket = io('/');
    setSocket(userSocket);
    userSocket.emit('roomData', {
      from: roomID,
      username: localStorage.getItem('un')
    });
    return () => userSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="App-header">
        {socket ? <Chat name={localStorage.getItem('rn')} socket={socket} username={localStorage.getItem('un')} /> : <></>}
      </header>
    </div>
  );
}

export default ChatRoom;