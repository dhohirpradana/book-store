import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { Button, Image } from "react-bootstrap";
import bookUS from "../../assets/image/sincerely-media-CXYPfveiuis-unsplash.jpg";

export default function PromoCard({
  width,
  useStyles,
  onClick,
  selected,
  title,
  itemId,
  sold,
  author,
}) {
  const classes = useStyles();
  return (
    <Card elevation={0} className={classes.root}>
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={{ xs: 1, sm: 2, md: 2 }}
        >
          <div>
            <Image width={185} src={bookUS} />
          </div>
          <div className={classes.productRight}>
            <Typography
              fontSize={20}
              fontWeight="bold"
              textTransform="capitalize"
            >
              {title}
            </Typography>
            <Typography gutterBottom color="textSecondary">
              𝐵𝓎. {author}
            </Typography>
            <Typography gutterBottom className="text">
              Habis Gelap Terbitlah Terang adalah buku kumpulan surat yang
              ditulis oleh Kartini. Kumpulan surat tersebut dibukukan oleh J.H.
              Abendanon dengan judul Door Duisternis Tot Licht. Setelah Kartini
              wafat, J.H. Abendanon mengumpulkan dan membukukan surat-surat yang
              pernah dikirimkan R.A Kartini pada teman-temannya di Eropa.
            </Typography>
            <Typography
              gutterBottom
              color="green"
              fontWeight="bold"
              fontSize={18}
            >
              Rp.58.000
            </Typography>
            <Button
              variant="dark"
              onClick={onClick}
              className={classes.btnAddChart}
            >
              Add to Chart
            </Button>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
