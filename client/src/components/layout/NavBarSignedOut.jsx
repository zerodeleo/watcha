import React from 'react';

// Components
import Description from './Description';

import * as styles from '../../css/styles';

const NavBarSignedOut = () => {
  return (
    <article className={`NavBarSignedOut ${styles.NavBarSignedOut}`}>
      <h2 className={styles.h2}>
        WELCOME!
      </h2>
      <Description txt='. . .' />
    </article>);
}

export default NavBarSignedOut;
