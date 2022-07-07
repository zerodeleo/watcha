import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Actions to dispatch
import { updateChat } from '../store/actions/chatActions';
import { getChat } from '../store/actions/chatActions';

// Components
import ChatMsg from './ChatMsg';
import Button from './layout/Button';

// Styles
import * as styles from '../css/styles';

import io from 'socket.io-client';

const HOST = '/'

const Chat = ({handleClick, auth, watcha, updateChatDispatch, getChatDispatch}) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(watcha.messages);
  const [pinged, setPinged] = useState(false);

  const sendMessage = () => {
    if (message === '' || /^\s*$/.test(message)) return;
    const socket = io.connect();
    updateChatDispatch({watcha, auth, msg: message});
    setMessage('');
    socket.emit('new_chatmsg', { message });
    setPinged(!pinged);
  }

  useEffect(() => {
    getChatDispatch(watcha.tag);
  }, []);

  useEffect(() => {
    setMessages(watcha.messages);
  }, [watcha]);

  useEffect(() => {
    const socket = io.connect();
    socket.on('recieved_new_chatmsg', (data) => {
      getChatDispatch(watcha.tag);
    })
    return () => {
      socket.disconnect();
    }
  }, [pinged])

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setMessage(e.target.value);
  }

  return (
    <section className={`Chat ${styles.Chat}`}>
      {messages.map(msg => <ChatMsg key={msg.createdAt} msg={msg} uid={auth.uid}/>)}
      <div className={styles.textarea}>
        <input placeholder="Message ..." value={message} onChange={handleChange} className={`TextArea ${styles.TextArea}`}/>
      </div>
      <div className={styles.wrapper}>
        <Button className={styles.button} style={{width: "180px"}} txt="Exit chat" onClick={handleClick} />
        <Button className={styles.button} style={{marginLeft: "20px"}} txt="Send" onClick={sendMessage} />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
  watcha: state.watcha
}};

const mapDispatchToProps = (dispatch) => ({
  updateChatDispatch: (tag, msg) => dispatch(updateChat(tag, msg)),  
  getChatDispatch: (tag) => dispatch(getChat(tag)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
