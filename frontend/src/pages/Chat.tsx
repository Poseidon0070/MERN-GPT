import { Box, TextField, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
const chat = () => {
  return (
    <Box sx={{ display: "flex", flex: "1", width: "100vw" }}>
      <Box sx={{ flexShrink: "1", flexGrow: "0.1", margin: "6px", border: "3px solid grey", backgroundColor: "#171719", borderRadius: "30px", display: { lg: "flex", xs: "none" }, flexDirection: "column", padding: "20px" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{
            display: "flex", flexDirection: "column", width: "100%", transition: 'transform 300ms ease-in-out',
            '&:hover': {
              transform: 'scale(1.03) translateX(5px)',
              cursor: "pointer",
            },
          }}>
            <Typography variant='h6' sx={{ display: "flex", flexDirection: "row", textAlign: "center" }}>
              <ChatBubbleOutlineIcon fontSize="large" sx={{ mr: "8px", ml:"5px" }} />
              <span>New Thread</span>
            </Typography>
          </Box>
          <ClearRoundedIcon fontSize="medium" sx={{
            ml: "auto", transition: 'transform 300ms ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              cursor: "pointer"
            },
          }} />
        </Box>
        <Box sx={{
          mt: "auto",
          transition: 'transform 300ms ease-in-out',
          display: "flex",
          justifyContent:"center",
          borderTop:"2px solid #333333",
          '&:hover': {
            transform: 'scale(1.03)',
            cursor: "pointer",
          },
        }}>
          <Typography variant='h6' sx={{ display: "flex", flexDirection: "row", textAlign: "center", mt:"10px" }}>
            <DeleteOutlinedIcon fontSize="large" />
            <span>Delete History</span>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: "1", margin: "5px", backgroundColor: "#171719", borderRadius: "30px" }}>
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
          display:"flex",
          alignItems:"center"
        }}>
          <TextField
            id="standard-basic"
            placeholder='Ask a followup question'
            variant="standard"
            sx={{
              width: "98%", ml: "20px", mr: "10px",
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
          <div>
            <ArrowForwardRoundedIcon fontSize='large' sx={{mr:"10px",transition: 'transform 300ms ease-in-out', mt:"8px",'&:hover': {
              transform: 'translateX(1px)',
              cursor: "pointer",
            },}} />
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default chat
