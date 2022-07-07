import React from 'react';
import { DateTime } from 'luxon';

// Styles
import * as styles from '../css/styles';

const ChatMsg = ({msg, uid}) => {
  const year = DateTime.fromISO(msg.createdAt).toFormat('yy-mm-dd');
  const clock = DateTime.fromISO(msg.createdAt).toFormat('hh:mm:ss');

  return (
    <article className={`ChatMsg ${styles.ChatMsg}`}>
      <div className={msg.uid !== uid ? styles.msg : styles.userMsg}>
        <p className={styles.msgUsername}>{msg.username} says:</p>
        <p className={styles.msgMsg}>{msg.msg}</p>
        { !/invalid/i.test(year) ? <p className={styles.msgCreatedAt}>Posted {year} at {clock}</p> : <p className={styles.msgCreatedAt}>Posted at {msg.createdAt}</p> }
      </div>
    </article>
  );
};

export default ChatMsg;
