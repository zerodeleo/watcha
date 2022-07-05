import React from 'react';
import SignIn from './auth/SignIn';

const Dash = () => {
  console.log('Dash Component');
  return (
    <section className="Dash">
      <SignIn />
    </section>
  );
};

export default Dash;
