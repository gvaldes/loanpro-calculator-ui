import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './CalculatorComponent.module.css';
import axios from 'axios';

function CalculatorComponent() {
  const [expression, setExpression] = useState('');
  const [instructions, setInstructions] = useState('');
  const [operator, setOperator] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [error, setError] = useState('');

  const handleOperator = (value) => {
      setOperator(value);
      setExpression((prevExpression) => prevExpression + value);
  }

  const handleButtonClick = (value) => {
    if (operator === '') {
      setNumber1((prevNumber) => prevNumber + value);
    } else {
      setNumber2((prevNumber) => prevNumber + value);
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

      const response = await axios.post('http://localhost:8080/calculator/operation/perform', requestBody, {
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
  };

  return (
    <div className={styles.calculator}>
      <label>Instructions: {instructions}</label>
      <br></br>

      <input   type="text" value={expression} readOnly />

       <div className="button-row">
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('7')}>7</Button>
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('8')}>8</Button>
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('9')}>9</Button> 
      </div>

      <div className="button-row">
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('4')}>4</Button>
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('5')}>5</Button>
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('6')}>6</Button> 
      </div>

      <div className="button-row">
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('1')}>1</Button>
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('2')}>2</Button>
        <Button variant="primary" size="lg" className={styles.number} onClick={() => handleButtonClick('3')}>3</Button> 
      </div>

      <div className="button-row">
        <button onClick={() => handleButtonClick('0')}>0</button>
      </div>

      <div className="button-row">
        <button disabled={operator!==''} onClick={() => handleOperator('/')}>/</button> 
        <button disabled={operator!==''} onClick={() => handleOperator('+')}>+</button> 
        <button disabled={operator!==''}onClick={() => handleOperator('-')}>-</button> 
        <button disabled={operator!==''} onClick={() => handleOperator('*')}>*</button> 
      </div>
      <div className="button-row">
        <button onClick={handleClear}>C</button>
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  );
}

export default CalculatorComponent;
