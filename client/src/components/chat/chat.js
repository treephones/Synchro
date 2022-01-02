import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spacer from '../Spacer.js';
import Message from './message.js';
import { useState, useEffect } from 'react';


const Chat = ({ socket, name }) => {
    const [messageField, setMessageField] = useState(0);
    const [chars, setChars] = useState('0/2048');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, <Message username={message.sender} time={message.time} message={message.text} />]);
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
            </Container>
            <Form.Group className="mb-3">
                <Spacer />
                <Form.Control type="message" placeholder="Type a message." onChange={e => {
                    let val = e.target.value.substring(0, 2048);
                    setMessageField(val);
                    e.target.value = val;
                    setChars(`${val.length}/2048`);
                }}/>
                <Form.Text className="text-muted">{chars}</Form.Text>
            </Form.Group>
        </Container>
    );
}

export default Chat;