import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SignupForm from '../SignupForm/SignupForm';


function CreateUserButton() {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    return (
        <div>
            <Button className="create-user-button " variant="dark" onClick={handleClick}>
                Registrate
            </Button>

            <Modal show={showForm} onHide={handleClose} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: '80%', marginLeft: '150px' }}>Registrate</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <SignupForm className="modal-form" onClose={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateUserButton;
