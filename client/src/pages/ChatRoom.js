//css
import '../App.css';
//components
import Chat from '../components/chat/chat.js';


function ChatRoom({ match }) {
  return (
    <div className="App">
      <header className="App-header">
        <Chat />
      </header>
    </div>
  );
}

export default ChatRoom;