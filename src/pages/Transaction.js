import {
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#FF0742",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(user, product, total, status) {
  return { user, product, total, status };
}

const rows = [
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "approve"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "pending"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "pending"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "pending"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "pending"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "pending"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "pending"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
  createData("Dhohir Pradana", "Frozen yoghurt", "28.000", "cancel"),
];

export default function Transaction() {
  return (
    <Container>
      <Typography
        marginTop={2}
        marginBottom={3}
        marginLeft={2}
        fontSize={20}
        fontWeight="bold"
        textTransform="capitalize"
      >
        incoming transaction
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh", marginX: 2 }}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Product&nbsp;Purchased</StyledTableCell>
              <StyledTableCell>Total&nbsp;Payment</StyledTableCell>
              <StyledTableCell>Status&nbsp;Payment</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 500 }}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 500 }}>
                  {row.user}
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 500 }}>
                  {row.product}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    color: row.status === "approve" ? "#0ACF83" : "#FF0742",
                  }}
                >
                  Rp. {row.total}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    textTransform: "capitalize",
                    color:
                      row.status === "approve"
                        ? "#0ACF83"
                        : row.status === "pending"
                        ? "#F7941E"
                        : "#FF0742",
                  }}
                >
                  {row.status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
