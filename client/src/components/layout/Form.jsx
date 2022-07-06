import React from 'react';

// Components
import Input from '../layout/Input';
import Button from '../layout/Button';

// Styles
import * as styles from '../../css/styles';

const Form = ({ handleSubmit, handleChange, value, name, txt }) => {
  return (
    <form className={`Form ${styles.Form}`} onSubmit={handleSubmit}>
        <Input
          className={styles.input}
          onChange={handleChange}
          type="name"
          name={name}
          value={value}
        />
        <Button
          className={styles.button}
          onSubmit={handleSubmit}
          txt={txt}
        />
  </form>
  )
}

export default Form;