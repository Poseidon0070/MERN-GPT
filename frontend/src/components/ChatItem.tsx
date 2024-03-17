import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy, atomDark, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}

function isCodeBlock(str: string) {
    return str.includes("=") || str.includes(";") || str.includes("[") || str.includes("]") || str.includes("{") || str.includes("}") || str.includes("//")
    return false;
}

const ChatItem = ({ content, role }: { content: string, role: string }) => {
    const messageBlocks = extractCodeFromString(content);
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
                    <Avatar sx={{ height: "40px", width: "40px", backgroundColor: "#416D19" }}>
                        AI
                    </Avatar>
                </Box>
                <Typography variant="h6" fontWeight={"900"} sx={{ ml: "10px" }}>MERN-Bot</Typography>
            </Box>
            <Box sx={{ mt: "-15px" }}>
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "18px", ml: "50px" }}>{content}</Typography>
                )}
                <Box sx={{ ml: "50px" }}>
                    {messageBlocks &&
                        messageBlocks.length &&
                        messageBlocks.map((block) =>
                            isCodeBlock(block) ? (
                                <Box sx={{ my: "15px" }}>
                                    <SyntaxHighlighter style={atomDark} language={block[0]}>
                                        {block}
                                    </SyntaxHighlighter>
                                </Box>
                            ) : (
                                <Typography sx={{ fontSize: "18px" }}>{block}</Typography>
                            )
                        )}
                </Box>
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
                    <Avatar sx={{ height: "40px", width: "40px", color: "black", backgroundColor: "#6D2932" }}>
                        S
                    </Avatar>
                </Box>
                <Typography variant="h6" fontWeight={"900"} sx={{ ml: "10px" }}>You</Typography>
            </Box>
            <Box sx={{ mt: "-15px" }}>
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "18px", ml: "50px" }}>{content}</Typography>
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={atomDark}  language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                        )
                    )}
            </Box>
        </Box>
    );
};

export default ChatItem;

