import React from 'react';

// Styles
import * as styles from '../css/styles';

const ChatMsg = ({msg, uid}) => {
  return (
    <article className={`ChatMsg ${styles.ChatMsg}`}>
      <div className={msg.uid !== uid ? styles.msg : styles.userMsg}>
        <p className={styles.msgUsername}>{msg.username} says:</p>
        <p className={styles.msgMsg}>{msg.msg}</p>
        <p className={styles.msgCreatedAt}>{msg.createdAt}</p>
      </div>
    </article>
  );
};

export default ChatMsg;
