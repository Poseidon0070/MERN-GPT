import { Box, Button, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  let navigate = useNavigate()
  return (
    <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column " }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ErrorIcon sx={{ color: "red", fontSize: "20vh" }} />
        </Box>
        <Box textAlign="center">
          <Typography variant="h3" color="white">Some Error Occured!</Typography>
          <Typography variant="h5" color="white">Could not fetch requested data...</Typography>
          <Button variant='contained' onClick={() => navigate('/')} sx={{
            mt: 2, transition:"transform 500ms", padding: "1rem 3rem", 
          }}><span style={{color:"white"}}>Home</span></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Error