import { Box, TextField, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useEffect, useRef, useState } from 'react';
import ChatItem from '../components/ChatItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../store/exporter';
import { userActions } from '../store/store';


const Chat = () => {
  const [isThreadOpen, setIsThreadOpen] = useState<boolean>(true);
  const toggleThread = () => {
    setIsThreadOpen(prevState => !prevState);
  };
  let inputRef = useRef<HTMLInputElement | null>(null)
  let dispatch = useAppDispatch()
  let chats = useAppSelector(state => state.chats)

  const theme = useTheme();
  const isScreenLargerThanLg = useMediaQuery(theme.breakpoints.up('lg'));

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      //@ts-ignore
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  let submitHandler = async() => {

    if(inputRef.current){
      let content = inputRef.current?.value 
      if(content === "") return ;
      dispatch(userActions.setChats({role : "user", message : content}))
      const res = await axios.post("http://localhost:8080/chat/new", { message : content }, {withCredentials:true});
      if (res.status !== 200) {
        throw new Error("Unable to send chat");
      }
      const data = await res.data;
      console.log(data.response)
      dispatch(userActions.setChats({role : "assistant", message : data.response}))
    }
  }

  return (
    <Box sx={{ display: "flex", flex: "1", width: "100vw" }}>
      {isThreadOpen && (
        <Box sx={{
          flexShrink: "1", maxWidth: "400px", flexGrow: "0.1", margin: "6px", border: "3px solid grey", backgroundColor: "#171719",
          borderRadius: "30px", display: { lg: "flex", xs: "none" }, flexDirection: "column", padding: "20px", transition: "width 0.5s"
        }}>
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
            mt: "10px",
            height: "95%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            width: "100%",
            wordWrap: "break-word",
            overflowY: "overlay",
            scrollBehavior: "smooth"
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

      <Box sx={{ display: "flex", overflowY: "overlay", height: "89vh", flexDirection: "column", border: "3px solid grey", flex: "1", margin: "9px", backgroundColor: "#171719", borderRadius: "30px" }}>
        {isThreadOpen && isScreenLargerThanLg &&  
          <ArrowBackIosNewRoundedIcon 
            fontSize='large' 
            sx={{position:"relative", top:"50%"}}  
            onClick={toggleThread}
          />}
        {!isThreadOpen && isScreenLargerThanLg &&  
          <ArrowForwardIosRoundedIcon 
            fontSize='large' 
            sx={{position:"relative", top:"50%"}}  
            onClick={toggleThread}
          />}
        <Box
          className="scrollable-container"
          ref={chatContainerRef }
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
            overflowY: "auto",
          }}>
          {chats.map((chat) => {
            return (
              // @ts-ignore
              <ChatItem key={chat._id} role={chat.role} content={chat.content} />
            )
          })}
        </Box>
        <Box
          zIndex={5}
          sx={{
            ml: { xl: 'auto', xs: 'auto' },
            mr: { xl: 'auto', xs: 'auto' },
            minHeight: "70px",
            height: `120px`,
            width: { xl: '60%', xs: '80%' },
            background: '#333333',
            mb: '25px',
            borderRadius: '20px',
            border: '3px solid grey',
            position: 'sticky',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            '&::-webkit-scrollbar': {
              width: 0,
            },
          }}
        >
          <TextField
            id="standard-basic"
            placeholder="Ask a question"
            variant="standard"
            multiline
            maxRows={Infinity}
            fullWidth
            inputRef={inputRef}
            sx={{
              width: '98%',
              ml: '20px',
              mr: '10px',
              color: 'white',
              maxHeight: '65px',
              overflowY: 'auto',
              '& .MuiInputBase-input': {
                height: 'auto',
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
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '&::-moz-scrollbar': {
                display: 'none',
              },
            }}
          />
          <div onClick={submitHandler}>
            <ArrowForwardRoundedIcon
              fontSize="large"
              sx={{
                mr: '10px',
                justifySelf: 'center',
                transition: 'transform 300ms ease-in-out',
                mt: '10px',
                '&:hover': {
                  transform: 'translateX(1px)',
                  cursor: 'pointer',
                },
              }}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;