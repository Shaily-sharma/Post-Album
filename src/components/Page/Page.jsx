import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Alert from "./create";

import {
  editUser,
  getComment,
  getRecord,
  getUser,
  userdelete,
} from "./Redux/actions";
import AlertDialog from "./Dialog";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Filter from "./Filter";
import AlertDialogSlide from "./comment";
import FullScreenDialog from "./show";
function TablePaginationActions(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  useEffect(() => {
    dispatch(getRecord());
    dispatch(getUser());
    dispatch(getComment());
  }, [dispatch]);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
  const createpost = () => {
    setDisplay(true);
  };
  const showpost = () => {
    setVis(true);
  };

  return (
    <div>
      <Filter />
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
        onClick={createpost}
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
        onClick={showpost}
      >
        Show Post
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
                colSpan={3}
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
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {visible ? <AlertDialogSlide data={comment} /> : ""}
      {show ? <AlertDialog /> : ""}
      {display ? <Alert /> : ""}
      {vis ? <FullScreenDialog /> : ""}
    </div>
  );
}
