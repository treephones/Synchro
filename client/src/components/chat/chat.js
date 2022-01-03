import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spacer from '../Spacer.js';
import Message from './message.js';
import { useState, useEffect, useRef } from 'react';

const uuid = () => {
    return '_' + Math.random().toString(36).substring(2, 9);
}

let getTime = () => {
    var time = new Date();
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

const ToBottomOfChat = () => {
    const chatRef = useRef();

    useEffect(() => {
        chatRef.current.scrollIntoView();
    });

    return (
        <div ref={chatRef}></div>
    );
}

const Chat = ({ socket, name, username }) => {
    const [messageField, setMessageField] = useState("");
    const [chars, setChars] = useState('0/2048');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, <Message username={message.sender} time={getTime()} message={message.text} key={uuid()}/>]);
        });
    });

    return (
        <Container id='cform'>
            <Row id='cname'>
                    <Col>{name}</Col>
                </Row>
            <Container id='chat' fluid="md">  
                <Row>
                    <Col>㋡</Col>
                </Row>
                {
                    messages.map(component => component)
                }
                <ToBottomOfChat />
            </Container>
            <Form.Group className="mb-3">
                <Spacer />
                <Form.Control
                 type="message" 
                 placeholder="Type a message." 
                 onChange={e => {
                    let val = e.target.value.substring(0, 2048);
                    setMessageField(val);
                    e.target.value = val;
                    setChars(`${val.length}/2048`);
                }} 
                onKeyPress={k => {
                    if (k.key === 'Enter') {
                        socket.emit('message', {
                            sender: username,
                            message: messageField,
                            from: window.location.pathname.substring(1)
                        });
                        setMessages([...messages, <Message username={username} time={getTime()} message={messageField} key={uuid()}/>]);
                        k.target.value = "";
                        setChars('0/2048');
                    }
                }}
                />
                <Form.Text className="text-muted">{chars}</Form.Text>
            </Form.Group>
        </Container>
    );
}

export default Chat;