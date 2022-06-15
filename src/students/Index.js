import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { csrftoken, baseURL, theme } from "../Config";
import { useNavigate } from "react-router-dom";
//Breadcrumb
import Breadcrumb from "../components/Breadcrumb";
//button
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
//menu icon
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";

export default function Index() {
  const axios = require("axios");
  const navigate = useNavigate();

  //Breadcrumb data
  const currentPage = "List Of Students";
  const breadcrumbList = [
    {
      name: "Students",
      path: "/students",
    },
  ];

  let [students, setStudents] = useState([]);
  let [lastPage, setLastPage] = useState(1);
  let [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    getStudents(value);
  };

  const getStudents = (page = 1) => {
    axios({
      method: "get",
      url: "/students",
      baseURL: baseURL,
      headers: { Authorization: `Bearer ${csrftoken}` },
      params: {
        page: page,
      },
    })
      .then(function (response) {
        //add our data to state
        setStudents(response.data.students.data);
        setLastPage(response.data.students.last_page);
        //console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  function formatTimestamp(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  }

  //dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Show student info
  const handleShow = (id) => {
    navigate("/students/" + id);
  };

  //Edit student info
  const handleEdit = (id) => {
    navigate("/students/" + id + "/edit");
  };

  //Delete student
  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: "/students/" + id,
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${csrftoken}`,
        "content-type": "application/json",
      },
    }).then(function () {
      //hide dropdown menu
      setAnchorEl(null);
    });
    //refresh list of students
    getStudents(page);
  };

  return (
    <div>
      <Breadcrumb breadcrumbList={breadcrumbList} currentPage={currentPage} />
      <Button
        onClick={() => navigate("/students/create")}
        variant="contained"
        style={{ marginBottom: "12px" }}
        color="success"
        startIcon={<AddIcon color="white" />}
      >
        New Student
      </Button>
      <TableContainer component={Paper} sx={{ maxHeight: 380 }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Full name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Birthdate</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Level</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Created at</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Updated at</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Preview
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                More
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.lname + " " + row.fname}</TableCell>
                  <TableCell>{row.birthdate}</TableCell>
                  <TableCell>{row.level.name}</TableCell>
                  <TableCell>{formatTimestamp(row.created_at)}</TableCell>
                  <TableCell>{formatTimestamp(row.updated_at)}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleShow(row.id)}>
                      <VisibilityIcon color="success" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      id="demo-positioned-button"
                      aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      variant="contained"
                    >
                      Action
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem onClick={() => handleEdit(row.id)}>
                        <AutoFixHighIcon color="primary" /> Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                      >
                        <DeleteIcon color="danger" /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper style={{ padding: "18px" }}>
        <Grid container justifyContent="center">
          <Grid item>
            <Pagination
              color="primary"
              value={page}
              count={lastPage}
              onChange={handleChange}
            />
            {/* <TablePagination
              component="div"
              count={students?.total ? students?.total : 0}
              page={students?.current_page ? students?.current_page : 0}
              onPageChange={(page) => {
                getStudents(page);
              }}
              rowsPerPage={students?.per_page ? students?.per_page : 0}
            /> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
