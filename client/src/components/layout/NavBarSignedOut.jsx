import React from 'react';
import * as styles from '../../css/styles';

const NavBarSignedOut = () => {
  return (
    <article className={`NavBarSignedOut ${styles.NavBarSignedOut}`}>
      <h1 className={styles.h1}>
        Watcha
      </h1>
      <p className={styles.p}>
        Enter your name to get started :
      </p>
    </article>);
}

export default NavBarSignedOut;
