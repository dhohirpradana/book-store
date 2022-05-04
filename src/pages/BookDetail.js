import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useCrypto from "../hooks/crypto";
import bookUS from "../assets/image/sincerely-media-CXYPfveiuis-unsplash.jpg";
import useWindowDimensions from "../hooks/window";
import { makeStyles } from "@mui/styles";
import cartWhite from "../assets/icon/cartWhite.png";

const useStyles = makeStyles({
  btnAddChart: {
    borderRadius: 0,
    float: "right",
    marginBottom: 25,
    marginTop: 35,
    width: (width) => {
      if (width < 900) {
        return "100%";
      } else {
        return "auto";
      }
    },
  },
});

export default function BookDetail() {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const { decryptId } = useCrypto();
  const classes = useStyles(width);
  useEffect(() => {
    // console.log(width);
  }, [width]);
  const onClick = () => {};
  return (
    <Container>
      {/* BookDetail {decryptId(id)} */}
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        mb={5}
      >
        <Image
          alt="details"
          src={bookUS}
          width={270}
          className={width < 900 ? "m-auto" : ""}
          style={{ borderRadius: 5 }}
        />
        <Stack direction="column">
          <Typography fontSize={32} fontWeight={600} textTransform="capitalize">
            habis gelap terbitlah terang vol {decryptId(id)}
          </Typography>
          <Typography
            textTransform="capitalize"
            fontWeight={500}
            color="gray"
            mb={3}
          >
            𝐵𝓎. kartini
          </Typography>
          <Typography gutterBottom fontWeight={600}>
            Publication date
          </Typography>
          <Typography fontWeight={500} color="gray" mb={3} fontSize={14}>
            August 2018
          </Typography>
          <Typography gutterBottom fontWeight={600}>
            Pages
          </Typography>
          <Typography fontWeight={500} color="gray" mb={3} fontSize={14}>
            312
          </Typography>
          <Typography gutterBottom fontWeight={600} color="red">
            ISBN
          </Typography>
          <Typography fontWeight={500} color="gray" mb={3} fontSize={14}>
            6152019286371
          </Typography>
          <Typography gutterBottom fontWeight={600}>
            Price
          </Typography>
          <Typography fontWeight={600} color="green">
            Rp. 28.000
          </Typography>
        </Stack>
      </Stack>
      <Typography
        fontSize={28}
        fontWeight={600}
        textTransform="capitalize"
        mb={2}
      >
        about this book
      </Typography>
      <Typography
        fontWeight={400}
        color="gray"
        mb={1}
        fontSize={14}
        textAlign="justify"
      >
        Habis Gelap Terbitlah Terang adalah buku kumpulan surat yang ditulis
        oleh Kartini. Kumpulan surat tersebut dibukukan oleh J.H. Abendanon
        dengan judul Door Duisternis Tot Licht . Setelah Kartini wafat, J.H.
        Abendanon mengumpulkan dan membukukan surat-surat yang pernah dikirimkan
        R.A Kartini pada teman-temannya di Eropa.[1][2] Abendanon saat itu
        menjabat sebagai Menteri Kebudayaan, Agama, dan Kerajinan Hindia
        Belanda. Buku itu diberi judul Door Duisternis tot Licht yang arti
        harfiahnya "Dari Kegelapan Menuju Terang". Buku kumpulan surat Kartini
        ini diterbitkan pada 1911. Buku ini dicetak sebanyak lima kali, dan pada
        cetakan terakhir terdapat tambahan surat Kartini. Pada 1938, buku Habis
        Gelap Terbitlah Terang diterbitkan kembali dalam format yang berbeda
        dengan buku-buku terjemahan dari Door Duisternis Tot Licht. Buku
        terjemahan Armijn Pane ini dicetak sebanyak sebelas kali. Selain itu,
        surat-surat Kartini juga pernah diterjemahkan ke dalam bahasa Jawa dan
        bahasa Sunda. Armijn Pane menyajikan surat-surat Kartini dalam format
        berbeda dengan buku-buku sebelumnya. Ia membagi kumpulan surat-surat
        tersebut ke dalam lima bab pembahasan. Pembagian tersebut ia lakukan
        untuk menunjukkan adanya tahapan atau perubahan sikap dan pemikiran
        Kartini selama berkorespondensi. Pada buku versi baru tersebut, Armijn
        Pane juga menciutkan jumlah surat Kartini. Hanya terdapat 87 surat
        Kartini dalam "Habis Gelap Terbitlah Terang". Penyebab tidak dimuatnya
        keseluruhan surat yang ada dalam buku acuan Door Duisternis Tot Licht,
        adalah terdapat kemiripan pada beberapa surat. Alasan lain adalah untuk
        menjaga jalan cerita agar menjadi seperti roman. Menurut Armijn Pane,
        surat-surat Kartini dapat dibaca sebagai sebuah roman kehidupan
        perempuan. Ini pula yang menjadi salah satu penjelasan mengapa
        surat-surat tersebut ia bagi ke dalam lima bab pembahasan.
      </Typography>
      <Button onClick={onClick} className={classes.btnAddChart} variant="dark">
        Add Chart
        <Image src={cartWhite} className="mb-1 ms-3" />
      </Button>
    </Container>
  );
}
