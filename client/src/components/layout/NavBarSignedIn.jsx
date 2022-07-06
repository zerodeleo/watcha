import React from 'react';
import * as styles from '../../css/styles'

const NavBarSignedIn = ({ auth }) => {
  return (
    <article className={`NavBarSignedIn ${styles.NavBarSignedIn}`}>
      <h1 className={styles.h1}>
        Watcha
      </h1>
      <h2 className={styles.h2}>
        {auth.username.toUpperCase()}!
      </h2>
    </article>);
}

export default NavBarSignedIn;
