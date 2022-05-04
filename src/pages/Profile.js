import { Container, Typography, Paper, Stack, Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import MaleIcon from "@mui/icons-material/Male";
import ProfileItem from "../components/Profile/ProfileItem";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import { Image } from "react-bootstrap";
import profileImg from "../assets/image/Rectangle 12.png";

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: "#FFD9D9",
  padding: 30,
  width: "97%",
  margin: "auto",
}));

export default function Profile() {
  return (
    <Container>
      <Typography
        marginTop={2}
        marginBottom={1}
        marginLeft={2}
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
          <Stack alignItems="start" textAlign="start">
            <ProfileItem
              icon={<EmailIcon />}
              titleValue="user@mail.com"
              title="email"
            />
            <ProfileItem icon={<MaleIcon />} titleValue="Male" title="gender" />
            <ProfileItem
              icon={<LocalPhoneIcon />}
              titleValue="081335343635"
              title="mobile phone"
            />
            <ProfileItem
              icon={<RoomIcon />}
              titleValue="Perumahan Permata Bintaro Residence C-3"
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
              src={profileImg}
            />
            <Button
              sx={{ mt: 1, mb: 1, textTransform: "capitalize" }}
              variant="contained"
              color="error"
            >
              Edit Profile
            </Button>
          </Stack>
        </Stack>
      </StyledPaper>
      <Typography
        marginTop={4}
        marginBottom={4}
        marginLeft={2}
        fontSize={20}
        fontWeight="bold"
        textTransform="capitalize"
      >
        my books
      </Typography>
    </Container>
  );
}
