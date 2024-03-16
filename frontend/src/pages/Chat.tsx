import { Box, TextField, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useState } from 'react';
import ChatItem from '../components/ChatItem';

const staticChats = [
  { role: 'assistant', content: 'Hello! How can I assist you today?' },
  { role: 'user', content: 'Hi, I need help with setting up my account.' },
  { role: 'assistant', content: 'Sure, I can help with that. What specific issues are you facing?' },
  { role: 'user', content: 'I\'m having trouble logging in. It keeps saying my password is incorrect.' },
  { role: 'assistant', content: 'Let me check that for you. Could you please provide me with your email address?' },
  { role: 'user', content: 'My email address is example@example.com' },
  { role: 'assistant', content: 'I found your account. It looks like your password was recently changed. Have you tried resetting it?' },
  { role: 'user', content: 'No, I haven\'t tried that yet.' },
  { role: 'assistant', content: 'I recommend resetting your password by clicking on the "Forgot Password" link on the login page. You will receive instructions on how to reset your password via email.' },
  { role: 'user', content: 'Okay, I will try that. Thank you!' },
  { role: 'assistant', content: 'I recommend resetting your password by clicking on the "Forgot Password" link on the login page. You will receive instructions on how to reset your password via email.' },
  { role: 'user', content: 'Okay, I will try that. Thank you!' },
  { role: 'assistant', content: 'I recommend resetting your password by clicking on the "Forgot Password" link on the login page. You will receive instructions on how to reset your password via email.' },
  { role: 'user', content: 'Okay, I will try that. Thank you!' },
  { role: 'assistant', content: `'I recommend resetting your password by clicking on the "Forgot Password" link on the login page. You will receive instructions on how to reset your password via email.' },
  { role: 'user', content: 'Okay, I will try that. Thank you!'` },
];


const Chat = () => {
  const [isThreadOpen, setIsThreadOpen] = useState(true);

  const toggleThread = () => {
    setIsThreadOpen(prevState => !prevState);
  };

  return (
    <Box sx={{ display: "flex", flex: "1", width: "100vw" }}>
      {isThreadOpen && (
        <Box sx={{ flexShrink: "1",maxWidth:"400px", flexGrow: "0.1", margin: "6px", border: "3px solid grey", backgroundColor: "#171719",
         borderRadius: "30px", display: { lg: "flex", xs: "none" }, flexDirection: "column", padding:"20px", transition: "width 0.5s" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{
              display: "flex", flexDirection: "column", width: "100%", transition: 'transform 300ms ease-in-out',
              '&:hover': {
                transform: 'scale(1.03) translateX(5px)',
                cursor: "pointer",
              },
            }}>
              <Typography variant='h6' sx={{ display: "flex", flexDirection: "row", textAlign: "center" }}>
                <ChatBubbleOutlineIcon fontSize="large" sx={{ mr: "8px", ml: "5px" }} />
                <span>New Thread</span>
              </Typography>
            </Box>
            <ClearRoundedIcon fontSize="medium" sx={{
              ml: "auto", transition: 'transform 300ms ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                cursor: "pointer"
              },
            }} onClick={toggleThread} />
          </Box>
          <Box sx={{
            mt:"10px",
            height:"72vh",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            width: "100%", 
            wordWrap:"break-word",
            overflowY: "overlay",
            scrollBehavior:"smooth"
          }}>
  
          </Box>
          <Box sx={{
            mt: "auto",
            transition: 'transform 300ms ease-in-out',
            display: "flex",
            justifyContent: "center",
            borderTop: "2px solid #333333",
            '&:hover': {
              transform: 'scale(1.03)',
              cursor: "pointer",
            },
          }}>
            <Typography variant='h6' sx={{ display: "flex", flexDirection: "row", textAlign: "center", mt: "10px" }}>
              <DeleteOutlinedIcon fontSize="large" />
              <span>Delete History</span>
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex",overflowY:"overlay",height:"89vh", flexDirection: "column", border: "3px solid grey", flex: "1", margin: "5px", backgroundColor: "#171719", borderRadius: "30px" }}>

        <Box
        className="scrollable-container" 
        sx={{
          ml: { xl: "auto", xs: "auto" },
          mr: { xl: "auto", xs: "auto" },
          height: "auto",
          width: { xl: "62%", xs: "95%" },
          mt: "10px",
          position: "sticky",
          zIndex: "5",
          display: "flex",
          flexDirection: "column",
          overflowY:"auto",
        }}>
          {staticChats.map((chat) => {
            return (
              <ChatItem role={chat.role} content={chat.content}/>
            )
          })}
        </Box>
        <Box sx={{
          ml: { xl: "auto", xs: "auto" },
          mr: { xl: "auto", xs: "auto" },
          height: "65px",
          width: { xl: "60%", xs: "80%" },
          background: "#333333",
          mt: "auto",
          mb: "25px",
          borderRadius: "20px",
          border: "3px solid grey",
          position: "sticky",
          zIndex: "5",
          display: "flex",
          alignItems: "center"
        }}>
          <TextField
            id="standard-basic"
            placeholder='Ask a question'
            variant="standard"
            sx={{
              width: "98%", ml: "20px", mr: "10px", mt:"3px",
              color: "white",
              '& .MuiInputBase-input': {
                fontSize: '20px',
                color: 'white',
                textDecoration: 'none',
              },
              '& .MuiInput-underline:before': {
                borderBottom: 'none',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
              '& .MuiInput-underline:after': {
                borderBottom: 'none',
              },
            }}
          />
          <div onClick={toggleThread}>
            <ArrowForwardRoundedIcon fontSize='large' sx={{ mr: "10px", transition: 'transform 300ms ease-in-out', mt: "10px", '&:hover': {
              transform: 'translateX(1px)',
              cursor: "pointer",
            }, }} />
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;