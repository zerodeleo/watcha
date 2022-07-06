import React from 'react';
import * as styles from '../../css/styles'

const NavBarSignedIn = ({ auth }) => {
  return (
    <article className={`NavBarSignedIn ${styles.NavBarSignedIn}`}>
      <h2 className={styles.h2}>
        {auth.username.toUpperCase()}
      </h2>
    </article>);
}

export default NavBarSignedIn;
