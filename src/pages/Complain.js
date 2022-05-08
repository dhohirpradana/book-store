import React, { useState } from "react";
import {
  Avatar,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import manProfile from "../assets/icon/man.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SendIcon from "@mui/icons-material/Send";

export default function Complain() {
  const [msg, setMsg] = useState("");
  let chats = [
    { id: 1, sender: true, msg: "maaf min" },
    { id: 2, sender: false, msg: "ada yang bisa kami bantu?" },
  ];

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#C4C4C4",
          width: "100%",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          p: 2,
        }}
      >
        <Stack direction="row" alignItems="center">
          <Avatar src={manProfile} />
          <Stack pl={2}>
            <Typography>Admin satu</Typography>
            <Stack direction="row" alignItems="center">
              <FiberManualRecordIcon color="success" fontSize="5" />
              <Typography fontSize={12} color="#595959">
                Online
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Container
        sx={{
          backgroundColor: "#DFDFDF",
          width: "100%",
          height: "72vh",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          pt: 2,
        }}
      >
        <Stack>
          <Stack gap={1} width="100%" height="57.5vh">
            {chats.map((chat) => (
              <Paper
                key={chat.id}
                elevation={1}
                sx={{
                  px: 2,
                  py: 1,
                  alignSelf: !chat.sender ? "start" : "end",
                  maxWidth: "45%",
                }}
              >
                {chat.msg}
              </Paper>
            ))}
          </Stack>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="message"
            name="message"
            autoFocus
            placeholder="Message here"
            sx={{
              backgroundColor: "#C4C4C4",
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
            }}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    console.log(msg);
                    setMsg("");
                  }}
                >
                  <SendIcon />
                </IconButton>
              ), // <== adjusted this
              disableUnderline: true, // <== added this
            }}
          />
        </Stack>
      </Container>
    </>
  );
}
