/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Button from '../layout/Button';

const SpeakWithDatabase = () => {
  const uid = 1;

  const onClick = (e) => {
    e.preventDefault();
    const { name } = e.target;

    switch (name) {
      case 'GET':
        axios.get(`api/${uid}`)
          .then((res) => console.log('response: ', res))
          .catch((err) => console.log(err));
        break;
      case 'POST':
        axios.post(`api/${uid}`, { document: 'hello database' })
          .then((res) => console.log('response: ', res))
          .catch((err) => console.log(err));
        break;
      default:
        console.log('Nothing happened');
        break;
    }
  };

  return (
    <div className="SpeakWithDatabase">
      <Button onClick={onClick} type="submit" name="GET" txt="GET" />
      <Button onClick={onClick} type="submit" name="GET" txt="POST" />
    </div>
  );
};

export default SpeakWithDatabase;
