import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spacer from '../Spacer.js';


const Create = () => {
    return (
        <Container id='sform'>
            <Form>
                <h1 className='synchro' id='ftitle'>Synchro</h1>
                <Container>
                    <p id='nr'>Make A Room.</p>
                </Container>
                <Spacer />
                <Form.Group className="mb-3">
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control type="email" placeholder="Username" />
                    <Form.Text className="text-muted">Room name - keep it simple.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Room Invite URL or Code</Form.Label>
                    <Form.Control type="text" placeholder="Code" />
                    <Form.Text className="text-muted">One will be generated if this is left blank.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Video URL</Form.Label>
                    <Form.Control type="text" placeholder="URL (optional)" />
                    <Form.Text className="text-muted">Video URL to play in room.</Form.Text>
                </Form.Group>

                <Container id='submit'>
                    <Button id='join' size='lg' variant="primary" type="submit">Make Room</Button> 
                </Container>
                <Container>
                    <p id='nr'>Want to join a room? Do it <a href='/'>here.</a></p> 
                </Container>
            </Form>
        </Container>
    );
}

export default Create;