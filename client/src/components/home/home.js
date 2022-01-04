import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Spacer from '../Spacer.js';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Start = () => {
    const [username, setUsername] = useState(0);
    const [roomID, setRoomID] = useState(0);
    const [err, setErr] = useState(0);
    const target = useRef(null);
    const navigate = useNavigate();

    return (
        <Container id='sform'>
            <Form>
                <h1 className='synchro' id='ftitle'>Synchro</h1>
                <Container>
                    <p id='nr'>Join a room.</p>
                </Container>
                <Spacer />
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    <Form.Text className="text-muted">This is what others in the chatroom will see.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Invite URL or Code</Form.Label>
                    <Form.Control type="text" placeholder="Code" onChange={e => setRoomID(e.target.value)}/>
                    <Form.Text className="text-muted">Example: synchro.moez.io/3kj42q or 3kj42q</Form.Text>
                </Form.Group>
                <Container id='submit'>
                    <Button id='join' size='lg' variant="primary" type="submit" ref={target} onClick={(e) => {
                        e.preventDefault();
                        fetch(`/${roomID}`, {
                            method: 'POST',
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            if(data[0]) {
                                if(err) {
                                    setErr(!err);
                                }
                                navigate(`/${roomID}`);
                                localStorage.setItem('rn', data[1]);
                                localStorage.setItem("un", username);
                            }
                            else {
                                if(!err) {
                                    setErr(!err);
                                }
                            }
                        })
                    }}>
                        Join
                    </Button> 
                    <Overlay id='err' target={target.current} show={err} placement="right">
                        {({ placement, arrowProps, show: _show, popper, ...props }) => (
                        <div
                            {...props}
                            style={{
                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                            ...props.style,
                            }}
                        >
                            Invalid code or URL!
                        </div>
                        )}
                    </Overlay>
                </Container>
                <Container>
                    <p id='nr'>Want to make a room? Do it <a href='/make'>here.</a></p> 
                </Container>
            </Form>
        </Container>
    );
}

export default Start;