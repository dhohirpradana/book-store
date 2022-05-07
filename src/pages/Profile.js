import {
  Alert,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import ProfileItem from "../components/Profile/ProfileItem";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import { Form, Image, Modal, Button as RBButton } from "react-bootstrap";
import profileImg from "../assets/image/Rectangle 12.png";
import { useMutation } from "react-query";
import { API } from "../configs/api";
import { UserContext } from "../contexts/user";
import useWindowDimensions from "../hooks/window";

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: "#FFD9D9",
  padding: 30,
  width: "100%",
  margin: "auto",
}));

const styles = {
  modal: {
    btn: { width: "100%" },
    content: {
      width: "300px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  },
};

export default function Profile() {
  const { width } = useWindowDimensions();
  const [modalOpen, setOpen] = useState(false);
  const [error, seterror] = useState(null);
  const [userContext, userDispatch] = useContext(UserContext);
  const formRef = useRef();

  const fetchMe = async () => {
    await API.get("/me")
      .then((response) => {
        const user = response.data.data.user;
        userDispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
      })
      .catch((error) => console.log(error));
  };

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const handleUpdate = useMutation(async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      name: formRef.current.fullname.value,
      email: formRef.current.email.value,
      gender: formRef.current.gender.value,
      password: formRef.current.password.value,
    });

    await API.patch("/user", body, config)
      .then((response) => {
        if (response.status === 200) {
          closeModal();
          fetchMe();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        const msg = error.response.data.error.message;
        seterror(msg);
      });
  });

  return (
    <Container>
      <Typography
        marginTop={2}
        marginBottom={1}
        fontSize={20}
        fontWeight="bold"
        textTransform="capitalize"
      >
        profile
      </Typography>
      <StyledPaper elevation={0}>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          justifyContent="space-between"
        >
          <Stack alignItems="start" textAlign="start" gap={1}>
            <ProfileItem
              icon={<EmailIcon />}
              titleValue={userContext.user.email}
              title="email"
            />
            <ProfileItem
              icon={
                userContext.user.gender === "male" ? (
                  <MaleIcon />
                ) : userContext.user.gender === "female" ? (
                  <FemaleIcon />
                ) : (
                  <TransgenderIcon />
                )
              }
              titleValue={userContext.user.gender}
              title="gender"
            />
            <ProfileItem
              icon={<LocalPhoneIcon />}
              titleValue={userContext.user.phone || "-"}
              title="mobile phone"
            />
            <ProfileItem
              icon={<RoomIcon />}
              titleValue={
                userContext.user.address ? userContext.user.address.detail : "-"
              }
              title="address"
            />
          </Stack>
          <Stack>
            <Image
              height={150}
              width={150}
              style={{
                borderRadius: 5,
                float: "right",
                objectFit: "cover",
                margin: "auto",
              }}
              src={userContext.user.image || profileImg}
            />
            <Typography
              textAlign="center"
              fontWeight={500}
              textTransform="capitalize"
            >
              {userContext.user.name}
            </Typography>
            <Button
              sx={{ mt: 1, mb: 1, textTransform: "capitalize" }}
              variant="contained"
              color="error"
              onClick={openModal}
            >
              Edit Profile
            </Button>
          </Stack>
        </Stack>
      </StyledPaper>
      <Typography
        marginTop={4}
        marginBottom={4}
        fontSize={20}
        fontWeight="bold"
        textTransform="capitalize"
      >
        my books
      </Typography>
      <Modal centered={width > 767} show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? (
            <Alert severity="error" className="mb-3">
              {error}
            </Alert>
          ) : (
            <></>
          )}
          <Form
            ref={formRef}
            onSubmit={(e) => handleUpdate.mutate(e)}
            autoComplete="off"
          >
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullname"
                type="text"
                placeholder="Full Name"
                defaultValue={userContext.user.name}
                onChange={() => seterror(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                defaultValue={userContext.user.email}
                onChange={() => seterror(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Mobile Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                placeholder="Mobile Phone"
                defaultValue={userContext.user.phone}
                onChange={() => seterror(null)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Autocomplete
                disablePortal
                size="small"
                id="gender"
                options={["male", "female", "other"]}
                defaultValue={userContext.user.gender}
                renderInput={(params) => (
                  <TextField {...params} label="gender" />
                )}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="New Password"
                defaultValue={null}
                style={{ borderColor: "red" }}
                onChange={() => seterror(null)}
              />
            </Form.Group>
            <RBButton
              type="submit"
              style={styles.modal.btn}
              variant="dark"
              size="sm"
            >
              Save Changes
            </RBButton>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
