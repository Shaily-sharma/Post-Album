import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAlbum,getParticularImg } from "../../Redux/Album/action";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { editbut } from "../../Redux/Album/action";
import CreateAlbum from "./CreateAlbum";
import Modal from "./Modal";
import Swal from "sweetalert2";
import ShowPhotos from "./ShowPhotos";
import ShowAlbum from "./ShowAlbum";
import Paginationn from "../Paginationn";
import { deleteData } from "../../Redux/Album/action";

export default function Album() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [vis, setVis] = useState("");

  const getData = useSelector((state) => state.albumreducer.data);
  
  const handleEdit = (id) => {
    setShow(true);

    dispatch(editbut(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Data deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showPhoto = (id) => {
    dispatch(getParticularImg(id))
    setVisible(true);
    // setVal(k);
  };
  /* <img src={e.url} width="40" alt='photos'/> */
  const createAlbum = () => {
    setDisplay(true);
  };
  const showAlbums = () => {
    setVis(true);
  };
  useEffect(() => {
    dispatch(getAlbum());
    dispatch(getParticularImg());
  }, [dispatch]);
  return (
    <div>
      <Button
        style={{
          color: "black",
          background: "lightblue",
          marginLeft: "73%",
          alignItems: "end",
          borderColor: "black",
          marginTop: "-75px",
        }}
        variant="outlined"
        onClick={createAlbum}
      >
        Create Album
      </Button>
      <Button
        style={{
          color: "black",
          background: "lightblue",
          marginLeft: "85%",
          alignItems: "end",
          borderColor: "black",
          marginTop: "-112px",
        }}
        variant="outlined"
        onClick={showAlbums}
      >
        Show Albums
      </Button>
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
                <TableCell/>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              
              <TablePagination 
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
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
                ActionsComponent={Paginationn}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {show && <Modal />}
      {visible && <ShowPhotos />}
      {display && <CreateAlbum display={display} />}
      {vis && <ShowAlbum />}
    </div>
  );
}
