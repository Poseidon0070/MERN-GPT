import { useEffect, useRef, useState } from 'react';
import { Box, FormControl, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import dummy from '../assets/dummy.jpg'
import { toast } from 'sonner';
import axios from 'axios';


const Image = () => {
    const providers = ['Pixart', 'PixartLCM', 'Prodia', 'ProdiaStableDiffusion', 'ProdiaStableDiffusionXL', 'Dalle', 'Dalle2', 'DalleMini'];
    const [imageSrc, setImageSrc] = useState(dummy);

    // useEffect(() => {
    //     if (image) {
    //         console.log(image)
    //         console.log("--x----x--------x----------x----------x-----x-------x------")
    //         setImageSrc(`data:image/jpeg;base64,${image}`);
    //     } else {
    //         setImageSrc(dummy);
    //     }
    // }, [image]);
    const [selectedProvider, setProvider] = useState('Pixart');
    let inputRef = useRef<HTMLInputElement>()
    let theme = useTheme()
    const isScreenSizeGreaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

    const handleChange = (event: any) => {
        setProvider(event.target.value);
    };

    let imageSubmitHandler = async (e: any) => {
        e.preventDefault()
        try {
            if (!inputRef.current || inputRef.current?.value === '') {
                toast.info("Please enter your prompt!")
                return;
            }
            let queryParam = {
                image: inputRef.current.value,
                provider: selectedProvider
            }
            setImageSrc(dummy)
            let response = await axios.get('https://mern-gpt-2.onrender.com/image', {
                withCredentials: true,
                params: queryParam
            })

            if (response.status !== 200) {
                setImageSrc(dummy)
            } else {
                let image = response.data.image
                setImageSrc(`data:image/jpeg;base64,${image}`)
                toast.success("Image generated successfully")
            }

        } catch (err: any) {
            console.log(err)
            toast.error("Failed to generate image")
            throw new Error(err)
        }
    }
    // new 
    return (
        <Box
            className="partial-transparent"
            sx={{
                height: "90vh",
                backgroundColor: "rgba(23, 23, 25, 0.9)", 
                margin: "10px",
                borderRadius: "15px",
                border: "3px solid grey",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    height: "55vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    '& > img': {
                        opacity: 1, 
                        boxShadow: "2px 2px 10px 1px #FEECE2",
                    },
                    '& > div': {
                        opacity: 0.9, 
                    }
                }}
            >
                <img
                    src={imageSrc}
                    alt="failed to load!"
                    height={isScreenSizeGreaterThanMd ? "510vh" : "350vh"}
                    width="auto"
                />

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
                            inputRef={inputRef}
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
                                onClick={imageSubmitHandler}
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
                    <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
                        <button style={{ color: "green", backgroundColor: "green", boxShadow: "1px 1px 10px 0px lightgreen" }} onClick={imageSubmitHandler}>
                            <span style={{ padding: "0px", height: "8px", color: "white" }}>Generate</span><i></i>
                        </button>
                    </Box>
                </form>
            </Box >
        </Box >
    );
}

export default Image;

