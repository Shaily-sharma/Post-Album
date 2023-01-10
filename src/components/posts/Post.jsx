import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import CreatePost from "./CreatePost";
import Paginationn from "../Paginationn";
import {
  editUser,
  getComment,
  getRecord,
  getUser,
  userdelete,
} from "../../Redux/Post/actions";
import DialogBox from "./DialogBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import FilterName from "./FilterName";
import  Comment from "./Comment";
 import ShowPost from "./ShowPost";


export default function Postp() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [val, setVal] = useState("");
  const [vis, setVis] = useState("");

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

  const handleEdit = (id) => {
    setShow(true);

    dispatch(editUser(id));
  };

  const { newData, filterName, filterState, ComState } = useSelector(
    (state) => state.datareducer
  );

  const result = newData.filter((c) => c.userId === filterName);
  const comment = ComState.filter((d) => d.postId === val);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showComment = (e) => {
    console.log("mmm", e);
    setVisible(true);
    setVal(e);
  };
  const createPost = () => {
    setDisplay(true);
  };
  const showPost = () => {
    setVis(true);
  };

  useEffect(() => {
    dispatch(getRecord());
    dispatch(getUser());
    dispatch(getComment());
  }, [dispatch]);

  return (
    <div>
      <FilterName />
      <Button
        style={{
          color: "black",
          background: "lightblue",
          marginLeft: "70%",
          alignItems: "end",
          borderColor: "black",
          marginTop: "-75px",
        }}
        variant="outlined"
        onClick={createPost}
      >
        Create Post
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
        onClick={showPost}
      >
        Show Post
      </Button>
      <TableContainer
        component={Paper}
        style={{ marginLeft:'4rem',margin: "1rem", width: "90%", border: "1px solid black" ,height:'50%'}}
      >
        <Table
          aria-label="custom pagination table"
          sx={{ minWidth: 650 }}
          size="small"
        >
          <TableHead style={{ backgroundColor: "lightblue" }}>
            <TableRow style={{ textAlign: "center" }}>
              <TableCell align="center"></TableCell>
              <TableCell align="center">USER ID</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">TITLE&nbsp;</TableCell>
              <TableCell align="center">BODY&nbsp;</TableCell>
              <TableCell align="center">OPTIONS</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? (filterState ? result : newData).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filterState
              ? result
              : newData
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  style={{ width: 160 }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  <Button
                    style={{ color: "black", background: "lightblue" }}
                    variant="text"
                    onClick={() => showComment(row.id)}
                  >
                    Show Comments
                  </Button>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.userId}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.body}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.title}
                </TableCell>

                <TableCell align="center">
                  <AiFillDelete
                    size={20}
                    onClick={() => handleDelete(row.id)}
                    style={{ marginLeft: "4rem", color: "	#65a8be" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <AiFillEdit
                    size={20}
                    onClick={() => handleEdit(row.id)}
                    style={{ marginRight: "4rem", color: "	#65a8be" }}
                  />
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
                colSpan={7}
                count={newData.length}
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
      {visible && < Comment data={comment} />}
      {show && <DialogBox /> }
      {display && <CreatePost/> }
      {vis && <ShowPost /> }
    </div>
  );
}
