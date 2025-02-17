import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MatrixBackground from './MatrixBackground';
import './App.css';

function App() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setVideoLoaded(true);
    }, 500);
  }, []);

  const ipfsVideoUrl =
    'https://azure-glamorous-snail-942.mypinata.cloud/ipfs/bafybeiduidp5avwzyabz5zluuixxlpdzu52u7rzhyeytky4kxxvwvmfpg4';

  const handleChatButtonClick = () => {
    console.log('Chat button clicked with input:', chatInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  return (
    <div className="app-container">
      {/* Matrix Background */}
      <MatrixBackground />
      
      <Card className="main-card">
        <div className="card-video-container">
          <div className={`video-wrapper ${videoLoaded ? 'video-fade-in' : ''}`}>
            <ReactPlayer
              url={ipfsVideoUrl}
              playing
              loop
              muted
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
              onReady={() => console.log('Video is ready')}
              onError={(e) => console.error('Video error', e)}
            />
          </div>
        </div>
        <div className="card-chat-button-container">
          <TextField
            placeholder="Type your message..."
            value={chatInput}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            className="chat-input"
            InputProps={{
              style: { backgroundColor: '#fff' },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleChatButtonClick}
            className="chat-button"
          >
            Chat Now
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
