import {
  Alert,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Autocomplete,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Chip,
  Grid,
} from "@mui/material";
import React, { useState, useRef, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import ProfileItem from "../components/Profile/ProfileItem";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form, Image, Modal, Button as RBButton } from "react-bootstrap";
import profileImg from "../assets/image/Rectangle 12.png";
import { useMutation } from "react-query";
import { API } from "../configs/api";
import { UserContext } from "../contexts/user";
import useWindowDimensions from "../hooks/window";
import noImage from "../assets/image/no image.png";

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
  const [purchases, setPurchases] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [userContext, userDispatch] = useContext(UserContext);
  const formRef = useRef();
  const [city, setCity] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [subDistrict, setSubDistrict] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [collapseAddress, setCollapseAddress] = useState(false);

  useEffect(() => {
    fetchProvinces();
    fetchPurchahses();
  }, []);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

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

  const handleChangeProvince = (e, value) => {
    if (value) {
      fetchCities(value.id);
    } else {
      setCity(null);
      setCities([]);
    }
  };

  const handleChangeCity = (e, value) => {
    if (value) {
      fetchSubDistricts(value.id);
      setCity(value.id);
    } else {
      setSubDistrict(null);
      setSubDistricts([]);
    }
  };

  const handleChangeSubDistrict = (e, value) => {
    if (value) setSubDistrict(value.id);
  };

  const fetchPurchahses = async () => {
    await API.get("purchases")
      .then((response) => {
        const purchases = response.data.data.transactions;
        console.log(purchases);
        setPurchases(purchases);
      })
      .catch((error) => console.log(error));
  };

  const fetchProvinces = async () => {
    await API.get("/provinces")
      .then((response) => {
        const provinces = response.data.data.provinces;
        setProvinces(provinces);
      })
      .catch((error) => console.log(error));
  };

  const fetchCities = async (provinceId) => {
    await API.get("/province/" + provinceId + "/cities")
      .then((response) => {
        const cities = response.data.data.cities;
        setCities(cities);
      })
      .catch((error) => console.log(error));
  };

  const fetchSubDistricts = async (cityId) => {
    await API.get("/city/" + cityId + "/subdistricts")
      .then((response) => {
        const subdistricts = response.data.data.subdistricts;
        setSubDistricts(subdistricts);
      })
      .catch((error) => console.log(error));
  };

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const deleteAddress = async (addressId) => {
    handleCloseDelete();
    await API.delete("/address/" + addressId)
      .then(() => {
        fetchMe();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = useMutation(async (e) => {
    e.preventDefault();
    const saveUser = async () => {
      const body = JSON.stringify({
        name: formRef.current.fullname.value,
        email: formRef.current.email.value,
        phone: formRef.current.phone.value,
        gender: formRef.current.gender.value,
        ...(formRef.current.password.value !== "" && {
          password: formRef.current.password.value,
        }),
      });

      await API.patch("/user", body, config)
        .then((response) => {
          if (response.status === 200) {
            closeModal();
            fetchMe();
          }
        })
        .catch((error) => {
          console.log(error.response);
          const msg = error.response.data.error.message;
          seterror(msg);
        });
    };

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    if (collapseAddress) {
      if (!city || !formRef.current.detail.value)
        return seterror("Complete all address forms!");

      const body = JSON.stringify({
        detail: formRef.current.detail.value,
        cityId: city,
      });

      await API.post("/address", body, config)
        .then((response) => {
          if (response.status === 201) {
            saveUser();
          }
        })
        .catch((error) => {
          console.log(error.response);
          const msg = error.response.data.error.message;
          seterror(msg);
        });
      return;
    }

    saveUser();
  });

  return (
    <Container sx={{ pb: 2 }}>
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
      <Grid container>
        {purchases.map((purchases) => {
          return purchases.status === "success" ? (
            <Grid
              key={purchases.id}
              justifyContent="center"
              textAlign="center"
              item
              xs={6}
              sm={6}
              md={3}
              lg={3}
            >
              <Stack alignItems="center" width="100%">
                <Typography fontWeight="500" gutterBottom>
                  {purchases.book.title}
                </Typography>
                <Image
                  style={{ objectFit: "cover" }}
                  width={150}
                  height={200}
                  src={purchases.book.image || noImage}
                />
                {purchases.book.isEbook ? (
                  <Button
                    sx={{ mt: 1, width: "170px" }}
                    variant="outlined"
                    size="small"
                    href={purchases.book.document}
                  >
                    Download
                  </Button>
                ) : (
                  <></>
                )}
              </Stack>
            </Grid>
          ) : (
            <></>
          );
        })}
      </Grid>

      {/* Modal */}
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
            {!userContext.user.address ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ mb: 1, width: "100%" }}
                  onClick={() => setCollapseAddress(!collapseAddress)}
                >
                  add address
                </Button>
                <Stack display={!collapseAddress ? "none" : ""}>
                  <Form.Group className="mb-3" controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      id="province"
                      onChange={handleChangeProvince}
                      options={provinces}
                      getOptionLabel={(province) => province.name || ""}
                      renderInput={(params) => (
                        <TextField {...params} label="province" />
                      )}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      id="city"
                      onChange={handleChangeCity}
                      options={cities}
                      getOptionLabel={(city) => city.name || ""}
                      renderInput={(params) => (
                        <TextField {...params} label="city" />
                      )}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="subdistrict">
                    <Form.Label>Sub District</Form.Label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      id="subdistrict"
                      onChange={handleChangeSubDistrict}
                      options={subDistricts}
                      getOptionLabel={(subdistrict) => subdistrict.name || ""}
                      renderInput={(params) => (
                        <TextField {...params} label="sub district" />
                      )}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="detail">
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                      name="detail"
                      type="text"
                      placeholder="address details"
                      defaultValue=""
                      onChange={() => seterror(null)}
                    />
                  </Form.Group>
                </Stack>
              </>
            ) : (
              <Stack direction="row">
                <Form.Group controlId="addressD">
                  <Form.Label>
                    Address
                    <Chip
                      size="small"
                      sx={{ ml: 1 }}
                      label="delete"
                      onClick={handleClickOpenDelete}
                      onDelete={handleClickOpenDelete}
                      color="error"
                      deleteIcon={<DeleteIcon />}
                    />
                  </Form.Label>
                  <Typography gutterBottom fontWeight={600}>
                    {userContext.user.address.detail}
                  </Typography>
                </Form.Group>
                <Dialog
                  open={openDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Address?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Your address has been deleted and will affect your next
                      transaction
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button
                      color="error"
                      onClick={() => deleteAddress(userContext.user.address.id)}
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            )}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="New Password"
                defaultValue=""
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
