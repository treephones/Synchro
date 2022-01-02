import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


const Message = (props) => {
    return (
        <Row>
            <Container className='msg'>
                <div className='unt'>
                    <span className='msg-sender'>{props.username}</span>
                    <span className='msg-time'>{props.time}</span>
                </div>
                <p className='msg-txt'>{props.message}</p>
            </Container>
        </Row>
    );
}

export default Message;