import React from 'react';
import { connect } from 'react-redux';

import Button from './layout/Button';
import * as styles from '../css/styles';

const WatchItem = ({user}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <article className={`WatchItem ${styles.WatchItem}`}>
      <Button
        className={`${styles.button}`}
        onSubmit={handleSubmit}
        txt={user.username}
      />
    </article>
  )
}

export default WatchItem;
