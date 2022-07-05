/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Button from '../layout/Button';

const SpeakWithDatabase = () => {
  const uid = 'df9f0125-ca4f-4fc8-9be4-144ae6dfe3f1';

  const onClick = (e) => {
    e.preventDefault();
    const { name } = e.target;

    switch (name) {
      case 'GET':
        axios.get(`/api/${process.env.REACT_APP_WATCHA_API_KEY}/${uid}`)
          .then((res) => console.log('response: ', res))
          .catch((err) => console.log(err));
        break;
      case 'POST':
        axios.post(`/api/${process.env.REACT_APP_WATCHA_API_KEY}/`, { username: `zerodeleo-${Math.floor(Math.random() * 10000)}` })
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
      <Button onClick={onClick} type="submit" name="GET" txt="Get user" />
      <Button onClick={onClick} type="submit" name="POST" txt="Add user" />
    </div>
  );
};

export default SpeakWithDatabase;
