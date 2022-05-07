import { Stack, Typography } from "@mui/material";
import React from "react";
import { Image } from "react-bootstrap";
import noImage from "../../assets/image/no image.png";
import toRupiah from "@develoka/angka-rupiah-js";
import docIcon from "../../assets/icon/icons8-doc-96.png";

export default function Order({ image, title, author, price, count, isEbook }) {
  return (
    <div>
      <Stack direction="row">
        <Image
          width={150}
          height={200}
          style={{ objectFit: "cover" }}
          src={!image ? noImage : image}
        />
        <Stack ml={3} direction="column">
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
      </Stack>
    </div>
  );
}
