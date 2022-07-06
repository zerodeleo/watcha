import React from 'react';
import * as styles from '../../css/styles';

const Description = ({ txt }) => {
  return (
    <article className={`Description ${styles.Description}`}>
      <h3 className={styles.h3}>
        {txt}
      </h3>
    </article>);
}

export default Description;
