import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './RandomComponent.module.css';
import axios from 'axios';

function RandomComponent() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const requestRandomString = async () => {
    try {
      console.log('Random String requested');
      const requestBody ={
          "userId": 1,
          "type": "RANDOM_STRING"
      };
      const response = await axios.post('http://localhost:8080/calculator/operation/random-string', requestBody, {
        headers:{
          "Content-Type": 'application/json'
        }
      });
      console.log('Random String response: '+ response);
      setData(response.data);
    } catch (error) {
      console.log('El error es: '+error);
      setError(error);
      console.error('Error fetching Random String:', error);
    }
  };

  return (
    <div>
      <Button variant="primary" className={styles.button} onClick={requestRandomString}>Generate String</Button>
      <input type="text" value={data} readOnly />
      <p value={error}></p>
    </div>
  );
}

RandomComponent.propTypes = {};

RandomComponent.defaultProps = {};

export default RandomComponent;
