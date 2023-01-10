import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { editbut, userdelete } from "../../Redux/Album/actions/index";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

function AlbumTable() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState(" ");

  const getData = useSelector((state) => state.albumreducer.data);

  const showPhoto = (k) => {
    setVisible(true);
    setVal(k);
  };

  const handleEdit = (id) => {
    setShow(true);
    dispatch(editbut(id));
  };

  const handleDelete = (id) => {
    dispatch(userdelete(id));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Data deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
    <TableContainer
      component={Paper}
      style={{ margin: "2rem", width: "90%", border: "1px solid black" }}
    >
      <Table
        aria-label="custom pagination table"
        sx={{ minWidth: 650 }}
        size="small"
      >
        <TableHead style={{ backgroundColor: "lightblue" }}>
          <TableRow style={{ textAlign: "center" }}>
            <TableCell align="center">UserId</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">TITLE</TableCell>
            <TableCell align="center">OPTIONS</TableCell>
            <TableCell align="center">PHOTOS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? getData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : getData
          ).map((e, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {e.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {e.userId}
              </TableCell>
              <TableCell align="center">{e.title}</TableCell>

              <TableCell>
                <AiFillDelete
                  size={20}
                  onClick={() => handleDelete(e.id)}
                  style={{ marginLeft: "4rem", color: "	#65a8be" }}
                />

                <AiFillEdit
                  size={20}
                  onClick={() => handleEdit(e.id)}
                  style={{ marginLeft: "2rem", color: "	#65a8be" }}
                />
              </TableCell>

              <TableCell
                style={{ width: 160 }}
                align="center"
                component="th"
                scope="row"
              >
                <Button
                  style={{ color: "black", background: "lightblue" }}
                  variant="text"
                  onClick={() => showPhoto(e.id)}
                >
                  Show Photos
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={getData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={AlbumTable}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}
