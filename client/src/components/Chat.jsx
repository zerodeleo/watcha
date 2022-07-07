import React, { useEffect, useState, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// Actions to dispatch
import { updateChat } from '../store/actions/chatActions';
import { getChat } from '../store/actions/chatActions';

// Components
import ChatMsg from './ChatMsg';
import Button from './layout/Button';
import Input from './layout/Input';
import { Context } from './Context';
import Error from './error/Error';

// Styles
import * as styles from '../css/styles';

import io from 'socket.io-client';

const Chat = ({auth, watcha, updateChatDispatch, getChatDispatch}) => {
  const { setToggleNavBar } = useContext(Context);
  const [error, setError] = useState({isError: false, msg: ''});
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(watcha.messages);
  const [pinged, setPinged] = useState(false);
  if(watcha.tag === "") return <Navigate to="/" />
  if(!auth.uid) return <Navigate to="/signup" />

  const sendMessage = () => {
    try {
      if (message === '' || /^\s*$/.test(message)) return;
      const socket2 = io.connect();
      updateChatDispatch({watcha, auth, msg: message});
      setMessage('');
      socket2.emit('new_chatmsg', { message });
      setPinged(!pinged);
    } catch (err) {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});
    }
  }

  useEffect(() => {
    try {
      getChatDispatch(watcha.tag);
    } catch (err) {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});
    }
  }, []);

  useEffect(() => {
    try {
      setMessages(watcha.messages);
    } catch {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});
    }
  }, [watcha]);

  useEffect(() => {
    try {
      const socket = io.connect();
      socket.on('recieved_new_chatmsg', (data) => {
        getChatDispatch(watcha.tag);
      });
      return () => {
        socket.disconnect();
      }
    } catch (err) {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});
    }
  }, [pinged])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setMessage(value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setToggleNavBar(true);
    navigate('/');
  }

  const handleKeypress = e => {
    if (e.charCode === 13) {
      sendMessage();
    }
};

  return (
    <>{ error ? <Error error={error} /> : null }
      <section className={`Chat ${styles.Chat}`} onKeyPress={handleKeypress} >
        <article className={`Messages ${styles.Messages}`}>
          <div>
            {messages.map(msg => <ChatMsg key={msg.createdAt} msg={msg} uid={auth.uid}/>)}
          </div>
          <div className={`ScrollDiv ${styles.ScrollDiv}`} ref={bottomRef} />
        </article>
        <section className={`ChatBottom ${styles.ChatBottom}`}>
          <article className={styles.textarea}>
            <Input
              placeholder="Message ..." 
              value={message} 
              onChange={handleChange}
              autoFocus
              className={`TextArea ${styles.TextArea}`} />
          </article>
          <article className={styles.chatBtnWrapper}>
            <Button className={styles.button} style={{width: "180px"}} txt="Exit chat" onClick={handleClick} />
            <Button className={styles.button} style={{marginLeft: "20px"}} type="submit" txt="Send" onClick={sendMessage} />
          </article>
        </section> 
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state, ' chat')
  return {
  watcha: state.watcha,
  auth: state.auth,
}};

const mapDispatchToProps = (dispatch) => ({
  updateChatDispatch: (tag, msg) => dispatch(updateChat(tag, msg)),  
  getChatDispatch: (tag) => dispatch(getChat(tag)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
