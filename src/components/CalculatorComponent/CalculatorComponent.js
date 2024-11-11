import React, { useState } from 'react';
import { Button, Container, Col, Row, Modal, Spinner, Form } from 'react-bootstrap';
import styles from './CalculatorComponent.module.css';
import axios from 'axios';
import RandomComponent from '../RandomComponent/RandomComponent';
import DataGridComponent from '../DataGridComponent/DataGridComponent';

function CalculatorComponent(host) {
  const [expression, setExpression] = useState('');
  const [operator, setOperator] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [error, setError] = useState('');
  const [operatorClass, setOperatorClass] = useState('secondary');
  const [equalClass, setEqualClass] = useState('secondary');
  const [loading, setLoading] = useState(false);

  const handleOperator = (value) => {
      setOperator(value);
      setExpression((prevExpression) => prevExpression + value);
      setOperatorClass('secondary');
      setEqualClass('secondary');
  }

  const handleButtonClick = (value) => {
    if (operator === '') {
      setNumber1((prevNumber) => prevNumber + value);
      setOperatorClass('warning')
    } else {
      setNumber2((prevNumber) => prevNumber + value);
      setEqualClass('danger')
    }
    setExpression((prevExpression) => prevExpression + value);
  };

  const   handleClear = () => {
    setExpression('');
    setOperator('');
    setNumber1('');
    setNumber2('')
  };

 
  const handleEqual = () => {
    requestOperation();
    setOperator('');
    setOperatorClass('warning')
    setEqualClass('secondary');
  };

  const getOperatorName = () => {
    switch(operator) {
      case '+' : return 'ADDITION';
      case '-' : return 'SUBSTRACTION';
      case '/' : return 'DIVISION';
      case '*' : return 'MULTIPLICATION';
      default: return 'error';
    }
  }

  const requestOperation = async () => {
    setLoading(true);

    let operatorName = getOperatorName();
    if(operatorName === 'error') {
      //TODO - Handle operator not found.
    }

    try {
      let requestBody = {
        'userId':1, 
        'type': operatorName, 
        'numbers': [parseFloat(number1), parseFloat(number2)]
      };

      console.log('RequestBody: ' + JSON.stringify(requestBody));

      //let host = 'http://localhost:8080';
      let host = 'https://eicsh1si41.execute-api.us-west-2.amazonaws.com/dev';

      const response = await axios.post(host + '/calculator/operation/perform', requestBody, {
        headers:{
          "Content-Type": 'application/json'
        }
      });
      console.log('Perform response: '+ response);
      setExpression(response.data);
      setNumber1(response.data);
      setNumber2('');

    } catch (error) {
      setExpression(error.data);
      setError(error);
      console.error('Perform error:', error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.calculator}>

      <RandomComponent></RandomComponent>

      <Container>
        <Row className={styles.displayNumbers}>
          <Form.Control size="lg" type="text" value={expression} readOnly />
        </Row>
        <Row>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('7')}>7</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('8')}>8</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('9')}>9</Button>
          </Col>
          <Col className="d-grid">
            <Button variant={operatorClass} disabled={operatorClass==='secondary'} size="lg" onClick={() => handleOperator('/')}>&divide;</Button>
          </Col>
        </Row>
        <Row className={styles.rownumber}>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('4')}>4</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('5')}>5</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('6')}>6</Button>
          </Col>
          <Col className="d-grid">
            <Button variant={operatorClass} disabled={operatorClass==='secondary'} size="lg" onClick={() => handleOperator('*')}>X</Button>
          </Col>
        </Row>
        <Row className={styles.rownumber}>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('1')}>1</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('2')}>2</Button>
          </Col>
          <Col className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('3')}>3</Button>
          </Col>
          <Col className="d-grid">
            <Button variant={operatorClass} disabled={operatorClass==='secondary'} size="lg" onClick={() => handleOperator('-')}>-</Button>
          </Col>
        </Row>
        <Row className={styles.rownumber}>
          <Col sm={6} className="d-grid">
            <Button variant="primary" size="lg" onClick={() => handleButtonClick('0')}>0</Button>
          </Col>
          <Col sm={3} className="d-grid">
            <Button variant={equalClass} disabled={number2===''} size="lg" onClick={() => handleEqual()}>=</Button>
          </Col>
          <Col sm={3} className="d-grid">
            <Button variant={operatorClass} disabled={operatorClass==='secondary'} size="lg" onClick={() => handleOperator('+')}>+</Button>
          </Col>
        </Row>
        <Row className={styles.rownumber}>
          <Col sm={6} className="d-grid">
          </Col>
          <Col sm={6} className="d-grid">
            <Button variant="warning" size="lg" onClick={() => handleClear()}>C</Button>
          </Col>
        </Row>
      </Container>

      <Modal show={loading} size="sm" centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>

      <DataGridComponent></DataGridComponent>

    </div>
  );
}

export default CalculatorComponent;
