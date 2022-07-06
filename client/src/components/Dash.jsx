import React from 'react';
import SignUp from './auth/SignUp';

const Dash = () => {
  console.log('Dash Component');
  return (
    <section className="Dash">
      <SignUp />
    </section>
  );
};

export default Dash;
