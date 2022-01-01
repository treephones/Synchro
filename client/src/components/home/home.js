import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Start = () => {
    return (
        <Container id='sform'>
            <Form>
                <h1 class='synchro' id='ftitle'>Synchro</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Username" />
                    <Form.Text className="text-muted">This is what others in the chatroom will see.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Invite URL or Code</Form.Label>
                    <Form.Control type="text" placeholder="Code" />
                    <Form.Text className="text-muted">Example: synchro.moez.io/3kj42q or 3kj42q</Form.Text>
                </Form.Group>
                <Container id='submit'>
                    <Button id='join' size='lg' variant="primary" type="submit">Join</Button>  
                </Container>
            </Form>
        </Container>
    );
}

export default Start;