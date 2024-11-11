import React, { useState } from 'react';
import { Button, Spinner, Modal, Container, Row, Form, Col } from 'react-bootstrap';
import styles from './RandomComponent.module.css';
import axios from 'axios';

function RandomComponent() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestRandomString = async () => {
    setLoading(true);
    //let host = 'http://localhost:8080';
    let host = 'https://eicsh1si41.execute-api.us-west-2.amazonaws.com/dev';

    try {
      console.log('Random String requested');
      const requestBody ={
          "userId": 1,
          "type": "RANDOM_STRING"
      };
      const response = await axios.post(host + '/calculator/operation/random-string', requestBody, {
        headers:{
          "Content-Type": 'application/json',
          "Accept": "*/*"
        }
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.displayText}>
      <Container>
        <Row>
          <Col><Button variant="primary" size="lg"  className={styles.button} onClick={requestRandomString}>Generate String</Button></Col>
          <Col>  <Form.Control type="text" size="lg" value={data} readOnly /></Col>
            
          <Modal show={loading} size="sm" centered>
            <Modal.Body className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
     

    </div>
  );
}

RandomComponent.propTypes = {};

RandomComponent.defaultProps = {};

export default RandomComponent;
