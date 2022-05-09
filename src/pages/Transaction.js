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
import React, { useEffect, useState } from "react";
import { API } from "../configs/api";

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

let status = "pending";

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
];

export default function Transaction() {
  const [transactions, setTransaction] = useState([]);
  const fetchCarts = async () => {
    await API.get("/transactions")
      .then((response) => {
        // console.log(response.data);
        // const result = response.data.data.transactions
        //   .reduce((r, { transactionId, ...elements }) => {
        //     console.log(elements)
        //     if (r.get(transactionId)) r.get(transactionId);
        //     else r.set(transactionId, { transactionId, ...elements });
        //     return r;
        //   }, new Map())
        //   .values();

        // console.log([...result]);
        setTransaction(response.data.data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <Container>
      <Typography
        marginTop={2}
        marginBottom={3}
        fontSize={20}
        fontWeight="bold"
        textTransform="capitalize"
      >
        incoming transaction
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
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
            {transactions.map((trans, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 500 }}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 500 }}>
                  {trans.buyer.name}
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 500 }}>
                  {trans.book.title}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    color: status === "success" ? "#0ACF83" : "#FF0742",
                  }}
                >
                  Rp. {trans.book.price}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    fontWeight: 500,
                    textTransform: "capitalize",
                    color:
                      status === "success"
                        ? "#0ACF83"
                        : status === "pending"
                        ? "#F7941E"
                        : "#FF0742",
                  }}
                >
                  {status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
