import { useState } from 'react';
import './receive.css';

const Receive = () => {
  const [code, setCode] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleReceive = async () => {
    if (code.length !== 4) {
      alert('Invalid code');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const { message } = await response.json();
      console.log(message);
      setReceivedMessage(message.message);
    } catch (error) {
      console.error('Error receiving message:', error);
      alert('Invalid code');
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 4-digit code"
          maxLength={4}
        />
      </div>
      <div className="button-container">
        <button onClick={handleReceive}>Receive</button>
      </div>
      {receivedMessage && (
        <div className="message-container">
          <p>{receivedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Receive;