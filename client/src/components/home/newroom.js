import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Spacer from '../Spacer.js';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const [username, setUsername] = useState("");
    const [roomname, setRoomname] = useState("");
    const [roomID, setRoomID] = useState("");

    const [err, setErr] = useState(0);
    const target = useRef(null);
    const navigate = useNavigate();

    return (
        <Container id='sform'>
            <Form>
                <h1 className='synchro' id='ftitle'>Synchro</h1>
                <Container>
                    <p id='nr'>Make A Room.</p>
                </Container>
                <Spacer />
                <Form.Group className="mb-3">
                    <Form.Label>Your Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    <Form.Text className="text-muted">This is what others in the chatroom will see.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control type="roomname" placeholder="Room Name" onChange={e => setRoomname(e.target.value)} />
                    <Form.Text className="text-muted">Room name - keep it simple.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Room Invite Code</Form.Label>
                    <Form.Control type="text" placeholder="Code" onChange={e => setRoomID(e.target.value.replace(" ", "_"))} />
                    <Form.Text className="text-muted">One will be generated if this is left blank.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Video URL</Form.Label>
                    <Form.Control type="text" placeholder="URL (optional)" disabled/>
                    <Form.Text className="text-muted">Video URL to play in room. (Feature coming soon...)</Form.Text>
                </Form.Group>

                <Container id='submit'>
                    <Button id='join' size='lg' variant="primary" type="submit" ref={target} onClick={(e) => {
                        e.preventDefault();
                        fetch(`http://localhost:3001/mkrm/${roomID}/${roomname}`, {
                            method: 'POST',
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            if(data[0]) {
                                if(err) {
                                    setErr(!err);
                                }
                                navigate(`/${roomID}`);
                                localStorage.setItem('rn', roomname);
                                localStorage.setItem("un", username);
                            }
                            else {
                                if(!err) {
                                    setErr(!err);
                                }
                            }
                        })
                    }}>
                        Make Room
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
                            Room invite code is already taken!
                        </div>
                        )}
                    </Overlay>
                </Container>
                <Container>
                    <p id='nr'>Want to join a room? Do it <a href='/'>here.</a></p> 
                </Container>
            </Form>
        </Container>
    );
}

export default Create;