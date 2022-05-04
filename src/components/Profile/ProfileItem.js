import { Stack, Typography } from "@mui/material";
import React from "react";

export default function ProfileItem({ icon, titleValue, title }) {
  return (
    <div>
      <Stack
        direction="row"
        sx={{ color: "#8A8C90" }}
        alignItems="center"
        mb={2}
      >
        {icon}
        <Stack ml={1}>
          <Typography color="black" fontWeight={500} fontSize={11}>
            {titleValue}
          </Typography>
          <Typography fontSize={11} textTransform="capitalize">{title}</Typography>
        </Stack>
      </Stack>
    </div>
  );
}
