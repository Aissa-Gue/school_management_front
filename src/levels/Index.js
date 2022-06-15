import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { csrftoken, baseURL } from "../Config";
import Breadcrumb from "../components/Breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Index() {
  const axios = require("axios");
  const navigate = useNavigate();
  const currentPage = "List Of Levels";
  const breadcrumbList = [
    {
      name: "Levels",
      path: "/levels",
    },
  ];

  const [levels, setLevels] = useState([]);
  const getLevels = () => {
    axios({
      method: "get",
      url: "/levels",
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${csrftoken}`,
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        const allLevels = response.data.levels;
        //add our data to state
        setLevels(allLevels);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  useEffect(() => {
    getLevels();
  }, []);

  //dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Edit level info
  const handleEdit = (id) => {
    navigate("/levels/" + id + "/edit");
  };

  //Delete level
  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: "/levels/" + id,
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${csrftoken}`,
        "content-type": "application/json",
      },
    }).then(function () {
      //hide dropdown menu
      setAnchorEl(null);
    });
    //refresh list of levels
    getLevels();
  };

  function formatTimestamp(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      <Breadcrumb breadcrumbList={breadcrumbList} currentPage={currentPage} />
      <Button
        onClick={() => navigate("/levels/create")}
        variant="contained"
        color="success"
        style={{ marginBottom: "12px" }}
        startIcon={<AddIcon color="white" />}
      >
        New Level
      </Button>

      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Updated at</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                More
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {levels.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{formatTimestamp(row.created_at)}</TableCell>
                <TableCell>{formatTimestamp(row.updated_at)}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
