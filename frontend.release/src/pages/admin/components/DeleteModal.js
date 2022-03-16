import {
  Modal,
  Alert,
  Button,
} from 'react-bootstrap';

export default function DeleteModal(props) {
  const {
    title,
    message,
    isOpen,
    close,
    cb,
    data,
  } = props;

  const handleDelete = () => {
    cb(data);
    close();
  }

  return (
    <Modal show={isOpen} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">{message}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete} >Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}