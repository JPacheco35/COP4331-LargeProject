import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

function AboutModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>About...</Dropdown.Item>


      <Modal show={show} onHide={handleClose}>

        <Modal.Header className = "text-center" closeButton>
          <Modal.Title className = "text-center">COP 4331 Large Project <br></br>
            Group 16 Spring 2023
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className = "text-center">            
            Julian Espinoza        -- Project Manager<br></br>
            John Pacheco           -- Front-End<br></br>
            Orlando Rodriguez      -- Front-End<br></br>
            James Moore            -- Back-End<br></br>
            Marcelino Pozo         -- Back-End<br></br>
            Austin Stafford        -- Database
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default AboutModal;