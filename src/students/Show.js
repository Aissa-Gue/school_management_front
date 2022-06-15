import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { csrftoken, baseURL, theme } from "../Config";
import { useNavigate, useParams } from "react-router-dom";
//Breadcrumb
import Breadcrumb from "../components/Breadcrumb";
//button
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

export default function Show() {
  const axios = require("axios");
  const navigate = useNavigate();
  const params = useParams();

  //Breadcrumb data
  const currentPage = "Student information";
  const breadcrumbList = [
    {
      name: "Students",
      path: "/students",
    },
  ];

  //data
  const [student, setStudent] = React.useState([]);
  const [level, setLevel] = React.useState("");

  const getStudent = async () => {
    await axios({
      method: "get",
      url: "/students/" + params.id,
      baseURL: baseURL,
      headers: { Authorization: `Bearer ${csrftoken}` },
    })
      .then(function (response) {
        //add our data to state
        setStudent(response.data.student);
        setLevel(response.data.student.level.name);
        //console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
      });
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
    }).then(function () {});
    //refresh list of students
    navigate("/students");
  };

  useEffect(() => {
    getStudent();
  }, []);

  function formatTimestamp(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <Breadcrumb breadcrumbList={breadcrumbList} currentPage={currentPage} />
      <Paper style={{ padding: "25px" }}>
        {/* Edit/Delete Buttons */}
        <Grid container justifyContent="end">
          <ButtonGroup variant="text">
            <Button color="primary" onClick={() => handleEdit(student.id)}>
              <AutoFixHighIcon />
              Edit
            </Button>
            <Button color="error" onClick={() => handleDelete(student.id)}>
              <DeleteIcon />
              Delete
            </Button>
          </ButtonGroup>
        </Grid>
        {/* END Edit/Delete Buttons */}
        <Grid container alignItems="flex-start" spacing={2}>
          {/* Left */}
          <Grid container item spacing={2} md={6}>
            <Grid item xs={12}>
              <Divider>
                <Chip label="Personel information" />
              </Divider>
            </Grid>

            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>First name: </strong>
                {student.fname}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Last name: </strong>
                {student.lname}
              </Typography>
            </Grid>

            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Birthdate: </strong>
                {student.birthdate}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Gender: </strong>
                {student.gender === 1 ? "Male" : "Female"}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Father: </strong>
                {student.father}
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Mother: </strong>
                {student.mother}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Address: </strong>
                {student.address}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Level: </strong>
                {level}
              </Typography>
            </Grid>
          </Grid>

          {/* Right */}
          <Grid container item spacing={2} md={6}>
            <Grid item xs={12}>
              <Divider>
                <Chip label="Contact information" />
              </Divider>
            </Grid>

            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Phone: </strong>0{student.phone1}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Email: </strong>
                {student.email}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Father's Phone: </strong>0{student.phone2}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Notes: </strong>
                {student.notes}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Created At: </strong>
                {formatTimestamp(student.created_at)}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Last Update: </strong>
                {formatTimestamp(student.updated_at)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
