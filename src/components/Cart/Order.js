import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import noImage from "../../assets/image/no image.png";
import toRupiah from "@develoka/angka-rupiah-js";
import docIcon from "../../assets/icon/icons8-doc-96.png";
import DeleteIcon from "@mui/icons-material/Delete";
import useCart from "../../hooks/cart";

export default function Order({
  id,
  image,
  title,
  author,
  price,
  count,
  isEbook,
  onClick,
}) {
  const { deleteCart } = useCart();
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <div>
      <Stack direction="row" width="100%">
        <Image
          width={150}
          height={200}
          style={{ objectFit: "cover" }}
          src={!image ? noImage : image}
        />
        <Stack ml={3} direction="column" width="100%">
          <Typography gutterBottom fontSize={20} fontWeight={500}>
            {title}
          </Typography>
          <Typography gutterBottom>𝒷𝓎 {author}</Typography>
          <Typography gutterBottom mb={2}>
            {toRupiah(price, { symbol: "", floatingPoint: 0 })} x {count}
          </Typography>
          <Typography gutterBottom fontSize={18} fontWeight={500} color="green">
            Rp.{toRupiah(count * price, { symbol: "", floatingPoint: 0 })}
          </Typography>
          {isEbook ? <Image width={25} src={docIcon} /> : <></>}
        </Stack>
        <Chip
          size="small"
          sx={{ mr: 1, float: "right" }}
          label="delete"
          onClick={handleClickOpenDelete}
          onDelete={handleClickOpenDelete}
          color="error"
          deleteIcon={<DeleteIcon />}
        />
      </Stack>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Cart?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-cart">
            Are you sure to delete this cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              deleteCart(id);
              onClick();
              setOpenDelete(false);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
