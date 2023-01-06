import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAlb,getimg } from "../../Redux/Album/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { editbut, userdelete } from "../../Redux/Album/actions/index"
import Createalbum from "./Createalbum";
import Modal from "./Modal";
import Swal from "sweetalert2";
import Showphotos from './Showphotos'
import  Addalbum from "./Addalbum"

function Albump(props) {
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
    dispatch(getAlb());
    dispatch(getimg())
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

Albump.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Album() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [visible,setVisible]=useState(false);
  const [display,setDisplay]=useState(false);
  const [val,setVal]=useState(" ")
  const [vis,setVis]=useState("");

  const getData = useSelector((state) => state.albumreducer.data);
  const geti = useSelector((state) => state.albumreducer.imgState);

  const pho = geti.filter((d) => d.albumId === val);
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

  const showPhoto=(k)=>{
    
    setVisible(true);
    setVal(k)
    
  }
/* <img src={e.url} width="40" alt='photos'/> */ 
const createalbum=()=>{
  setDisplay(true)
  }
  const showalbums=()=>{
    setVis(true)
    }
  return (
    <div>
       <Button style={{color:"black",background:"lightblue",marginLeft:'73%' ,alignItems:'end',borderColor:'black',marginTop:'-75px'}}
                    variant="outlined"
                    
                    onClick={ createalbum}
                  >
                    Create Album
                  </Button>
                  <Button style={{color:"black",background:"lightblue",marginLeft:'85%' ,alignItems:'end',borderColor:'black',marginTop:'-112px'}}
                    variant="outlined"
                    
                    onClick={ showalbums}
                  >
                    Show Albums
                  </Button>
      <TableContainer component={Paper} style={{ margin: "2rem", width: "90%", border: "1px solid black" }}>
       
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
               
              
                <TableCell >
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
               
               <TableCell style={{width: 160}} align="center" component="th" scope="row">
                  <Button style={{color:"black",background:"lightblue"}}
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
                ActionsComponent={Albump}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {show ? <Modal /> : ""}
      {visible ? <Showphotos photo={pho} /> : ""}
      {display && <Createalbum display={display} />}
      {vis?< Addalbum/>:""}
    </div>
  );
}


