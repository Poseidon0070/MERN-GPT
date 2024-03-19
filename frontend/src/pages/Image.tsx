import { useState } from 'react';
import { Box, FormControl,  MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import dummy from '../assets/dummy.jpg'


const Image = () => {
    const providers = ['Pixart', 'PixartLCM', 'Prodia', 'ProdiaStableDiffusion', 'ProdiaStableDiffusionXL'];
    const [selectedProvider, setProvider] = useState('Pixart');
    let theme = useTheme()
    const isScreenSizeGreaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

    const handleChange = (event: any) => {
        setProvider(event.target.value);
    };
    // new 
    return (
        <Box sx={{
            height: "90vh",
            backgroundColor: "#171719", margin: "10px",
            borderRadius: "15px",
            border: "3px solid grey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center"
        }}>
            <Box sx={{ height: "55vh", width: "100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                <Box >
                <img src={dummy} style={{boxShadow:"1px 1px 20px 0px #41c3da"}} alt="failed to load!" height={isScreenSizeGreaterThanMd ? "510vh":"350vh"} width="auto" />
                </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
                <form>

                    <Box
                        zIndex={5}
                        sx={{
                            ml: { xl: 'auto', xs: 'auto' },
                            mr: { xl: 'auto', xs: 'auto' },
                            minHeight: "50px",
                            height: `50px`,
                            width: { xl: '30%', md: "50%", xs: '80%' },
                            background: '#333333',
                            mb: '10px',
                            borderRadius: '20px',
                            border: '3px solid grey',
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
                            placeholder="Enter your prompt"
                            variant="standard"
                            multiline
                            maxRows={Infinity}
                            fullWidth
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
                        <div>
                            <CenterFocusStrongIcon
                                fontSize="large"
                                sx={{
                                    mr: '10px',
                                    justifySelf: 'center',
                                    transition: 'transform 300ms ease-in-out',
                                    mt: '10px',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        cursor: 'pointer',
                                    },
                                }}
                            />
                        </div>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: "15px", color: "white", fontWeight: "900" }}>Select Provider</Typography>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                value={selectedProvider}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ color: "white", backgroundColor: "#333333", borderRadius: "16px", border: "3px solid grey", fontSize: "18px", height: "50px" }}
                            >
                                {
                                    providers.map((provider, index) => (
                                        <MenuItem
                                            key={index}
                                            value={provider}
                                            sx={{ color: "black" }}
                                        >
                                            {provider}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"center", mt:"10px"}}>
                    <button style={{ color: "green", backgroundColor:"green",boxShadow:"1px 1px 200px 0px lightgreen" }}>
                        <span style={{padding:"0px",height:"8px", color:"white" }}>Generate</span><i></i>
                    </button>
                    </Box>
                </form>
            </Box >
        </Box >
    );
}

export default Image;

