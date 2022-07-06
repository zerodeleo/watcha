import React, { useState } from 'react';
import { connect } from 'react-redux';

// Components
import WatchItem from './WatchItem';

import * as styles from '../css/styles';

const WatchList = ({users}) => {
  return (
    <section className={`WatchList ${styles.WatchList}`}>
        { users.map(user => <WatchItem key={user.uid} user={user} />) }
    </section>
  )
}

export default WatchList;
