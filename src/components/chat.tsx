'use client';

import { useEffect, useState } from 'react';
import {Manager, Socket} from 'socket.io-client';
import { useAppSelector } from '@/store';

let socket: Socket;

const Chat = () => {
  const authUser = useAppSelector((state) => state.authUser.authUser)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [user] = useState(`${authUser.rol} - ${authUser.nombreCompleto}`); // Nombre de usuario aleatorio

  // Conectar al WebSocket al montar el componente
  useEffect(() => {

      const manager = new Manager(
          `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/socket.io/socket.io.js`,
      )
      socket = manager.socket('/')


    // Escuchar los mensajes que llegan
    socket.on('chatMessage', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  // Función para enviar un mensaje
  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chatMessage', `${user}: ${message}`);
      setMessage('');
    }
  };

  const renderMessage = (msg: string) => {
    const [username, ...rest] = msg.split(':');  // Separar el nombre y el mensaje
    const userMessage = rest.join(':'); // El resto es el mensaj
    const isUserMessage = username === user;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
          padding: '5px',
        }}
      >
        <div
          style={{
            backgroundColor: '#f2f2f2',  // Color de fondo: verde claro para el usuario
            padding: '10px',
            borderRadius: '10px',
            maxWidth: '70%',
            wordWrap: 'break-word',
            textAlign: isUserMessage ? 'right' : 'left',  // Alinear el texto
          }}
        >
          <span style={{ fontWeight: 'bold', color: isUserMessage ? 'red' : 'blue' }}>
            {username}:
          </span>
          {userMessage}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat en Tiempo Real</h1>
      <div style={{ border: '1px solid #ddd', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            {renderMessage(msg)}  
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{ width: '80%' }}
        />
        <button onClick={sendMessage} style={{ marginLeft: '10px' }}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
