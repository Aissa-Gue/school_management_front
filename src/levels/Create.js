import React from "react";
import { csrftoken, baseURL } from "../Config";
import Breadcrumb from "../components/Breadcrumb";
import AlertMessage from "../components/AlertMessage";
import { Box, Paper, TextField, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const currentPage = "New Level";
  const breadcrumbList = [
    {
      name: "Levels",
      path: "/levels",
    },
  ];

  const axios = require("axios");
  const navigate = useNavigate();
  const [message, setMessage] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  //data
  const [name, setName] = React.useState("");

  const store = () => {
    axios({
      method: "post",
      url: "/levels",
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${csrftoken}`,
        "content-type": "application/json",
      },
      data: {
        name: name,
      },
    })
      .then(function (response) {
        //success
        if (response.status === 200) {
          //hide errors and add success message
          setErrors([]);
          setMessage({ type: "success", text: "Level Added Successfully" });
          //redirect after 2 sec
          setTimeout(() => {
            navigate("/levels");
          }, 2000);
        }
      })
      .catch(function (error) {
        setMessage({ type: "error", text: "Adding Level Failed !" });
        //validation errors
        if (error.response.status === 422) {
          //show errors
          setErrors(error.response.data.errors);
        }
      });
  };
  return (
    <div>
      <Breadcrumb breadcrumbList={breadcrumbList} currentPage={currentPage} />
      <Box>
        <Paper style={{ padding: "12px" }}>
          <AlertMessage message={message} />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Level name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
              error={errors.name != null}
              helperText={errors.name != null ? errors.name : ""}
            />
            <Button
              onClick={() => store()}
              variant="contained"
              color="success"
              startIcon={<AddIcon color="white" />}
            >
              Add Level
            </Button>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}
