import { Box, Avatar, Typography } from "@mui/material";

const ChatItem = ({
    content,
    role,
}: {
    content: string;
    role: string;
}) => {
    return role === "assistant" ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 2,
                borderRadius: 2,
                my: 4,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Avatar sx={{ height: "40px", width: "40px", backgroundColor:"#416D19" }}>
                        AI
                    </Avatar>
                </Box>
                <Typography variant="h6" fontWeight={"900"} sx={{ ml: "10px" }}>MERN-Bot</Typography>
            </Box>
            <Box sx={{mt:"-15px"}}>
                <Typography sx={{ fontSize: "18px", ml: "50px" }}>{content}</Typography>
            </Box>
        </Box>
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 2,
                borderRadius: 2,
                my: 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Avatar sx={{ height: "40px", width: "40px", color: "black", backgroundColor:"#6D2932" }}>
                        S
                    </Avatar>
                </Box>
                <Typography variant="h6" fontWeight={"900"} sx={{ ml: "10px" }}>You</Typography>
            </Box>
            <Box sx={{mt:"-15px"}}>
                <Typography sx={{ fontSize: "18px", ml: "50px" }}>{content}</Typography>
            </Box>
        </Box>
    );
};

export default ChatItem;