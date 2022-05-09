import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Avatar,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import manProfile from "../assets/icon/man.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../contexts/user";

import { io } from "socket.io-client";
let socket;

export default function Complain() {
  const [msg, setMsg] = useState("");
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userContext, userDispatch] = useContext(UserContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  var socketServer =
    process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

  useEffect(() => {
    socket = io(socketServer, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socket.on("new message", () => {
      console.log("new message");
      console.log(contact);
      socket.emit("load messages", contact.id);
      scrollToBottom();
    });

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });

    loadContacts();
    loadMessages();

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadContacts = () => {
    if (userContext.user.role !== "admin") {
      socket.emit("load admin contact");
      socket.on("admin contact", (data) => {
        const dataContact = data?.map((item) => ({
          ...item,
          message: "Click here to start message",
        }));
        setContacts(dataContact);
        if (dataContact.length) {
          setContact(dataContact[0]);
          socket.emit("load messages", dataContact[0].id);
        }
        // console.log(dataContact);
      });
    } else {
      socket.emit("load customer contacts");
      socket.on("customer contacts", (data) => {
        let dataContacts = data.map((item) => ({
          ...item,
          message: "Click here to start message",
        }));
        setContacts(dataContacts);
      });
    }
  };

  const onClickContact = (data) => {
    setContact(data);
    if (contact && contact.id !== data.id)
      socket.emit("load messages", data.id);
  };

  const loadMessages = () => {
    socket.on("messages", (data) => {
      console.log(data);
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          senderId: item.senderId,
          recipientId: item.recipientId,
          message: item.message,
        }));
        setMessages(dataMessages);
      } else {
        setMessages([messages]);
      }
    });
  };

  const onSendMessage = (msg) => {
    const data = {
      recipientId: contact.id,
      message: msg,
    };
    socket.emit("send message", data);
  };

  return (
    <Stack direction="row" width="100%" gap={1}>
      {userContext.user.role === "admin" ? (
        <Stack width="100%" maxWidth={300}>
          <Typography gutterBottom fontWeight={500} fontSize={20}>
            Customer Complain
          </Typography>
          <List
            sx={{
              backgroundColor: "#DFDFDF",
              borderRadius: 1,
              px: 1,
              pb: 2,
            }}
            component="nav"
            aria-label="mailbox folders"
          >
            {contacts.map((contact) => (
              <div key={contact.id}>
                <ListItem
                  sx={{ borderRadius: 1 }}
                  button
                  onClick={() => onClickContact(contact)}
                >
                  <Stack direction="row" alignItems="center">
                    <Avatar sx={{ mr: 1.5 }} src={manProfile} />
                    <ListItemText primary={contact.name} />
                  </Stack>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Stack>
      ) : (
        <></>
      )}

      <Stack width="100%">
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
              <Typography>{!contact ? "" : contact.name}</Typography>
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
          }}
        >
          <Stack
            gap={1}
            width="100%"
            height="100%"
            maxHeight="63vh"
            className="overflow-auto example"
            pt={1}
          >
            {messages.map((chat) => (
              <Paper
                key={chat.id}
                elevation={1}
                sx={{
                  px: 2,
                  py: 1,
                  alignSelf: chat.sender === contact.id ? "start" : "end",
                  maxWidth: "45%",
                }}
              >
                {chat.message}
              </Paper>
            ))}
            <div ref={messagesEndRef} />
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
              mt: 0,
            }}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    onSendMessage(msg);
                    setMsg("");
                  }}
                >
                  <SendIcon />
                </IconButton>
              ),
              disableUnderline: true,
            }}
          />
        </Container>
      </Stack>
    </Stack>
  );
}
