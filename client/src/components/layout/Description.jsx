import React from 'react';
import * as styles from '../../css/styles';

const Description = () => {
  return (
    <article className={`Description ${styles.Description}`}>
      <h3 className={styles.h3}>
        Watcha thinking bout!?
      </h3>
      <p className={styles.p}>
        Type a word in the input field below
      </p>
    </article>);
}

export default Description;
