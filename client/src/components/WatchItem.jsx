import React from 'react';
import { connect } from 'react-redux';

import * as styles from '../css/styles';

const WatchItem = ({user}) => {
  return (
    <article className={`WatchItem ${styles.WatchItem}`}>
      <p className={styles.pName}>{user.username}</p>
    </article>
  )
}

export default WatchItem;
