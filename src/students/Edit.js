import React, { useEffect } from "react";
import { csrftoken, baseURL } from "../Config";
import Breadcrumb from "../components/Breadcrumb";
import AlertMessage from "../components/AlertMessage";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Chip,
  Button,
  Divider,
  FormHelperText,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function Edit() {
  const axios = require("axios");
  const navigate = useNavigate();
  const params = useParams();

  //Breadcrumb data
  const currentPage = "Edit Student";
  const breadcrumbList = [
    {
      name: "Students",
      path: "/students",
    },
  ];

  const [allLevels, setAllLevels] = React.useState([]);
  const [message, setMessage] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  //data
  const [lname, setLname] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [gender, setGender] = React.useState("");
  const [father, setFather] = React.useState("");
  const [mother, setMother] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const getStudent = async () => {
    await axios({
      method: "get",
      url: "/students/" + params.id,
      baseURL: baseURL,
      headers: { Authorization: `Bearer ${csrftoken}` },
    })
      .then(function (response) {
        //add our data to state
        setLname(response.data.student.lname);
        setFname(response.data.student.fname);
        setBirthdate(new Date(response.data.student.birthdate));
        setGender(response.data.student.sex);
        setFather(response.data.student.father);
        setMother(response.data.student.mother);
        setLevel(response.data.student.level_id);
        setEmail(response.data.student.email);
        setPhone1(response.data.student.phone1);
        setPhone2(response.data.student.phone2);
        setAddress(response.data.student.address);
        setNotes(response.data.student.notes);
        //console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  const getLevels = async () => {
    await axios({
      method: "get",
      url: "/levels",
      baseURL: baseURL,
      headers: { Authorization: `Bearer ${csrftoken}` },
    })
      .then(function (response) {
        setAllLevels(response.data.levels);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };
  useEffect(() => {
    //Oredr is important
    getLevels();
    getStudent();
  }, []);

  const update = () => {
    axios({
      method: "put",
      url: "/students/" + params.id,
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${csrftoken}`,
        "content-type": "application/json",
      },
      data: {
        fname: fname,
        lname: lname,
        birthdate: format(birthdate, "yyyy-MM-dd"),
        address: address,
        sex: gender,
        level_id: level,
        father: father,
        mother: mother,
        email: email,
        phone1: phone1,
        phone2: phone2,
        notes: notes,
      },
    })
      .then(function (response) {
        //success
        if (response.status === 200) {
          //hide errors and add success message
          setErrors([]);
          setMessage({ type: "success", text: "Student Updated Successfully" });
          //redirect after 2 sec
          setTimeout(() => {
            navigate("/students/" + params.id);
          }, 2000);
        }
      })
      .catch(function (error) {
        //validation errors
        if (error.response.status === 422) {
          //show errors and add fail message
          setErrors(error.response.data.errors);
          setMessage({ type: "error", text: "Updating Student Failed !" });
        }
      });
  };

  return (
    <div>
      <Breadcrumb breadcrumbList={breadcrumbList} currentPage={currentPage} />
      <Box component="form">
        <Paper style={{ padding: "25px" }}>
          <AlertMessage message={message} />

          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item container spacing={2} md={6}>
              <Grid item xs={12}>
                <Divider>
                  <Chip label="Personel information" />
                </Divider>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  label="First name"
                  variant="outlined"
                  onChange={(e) => setFname(e.target.value)}
                  value={fname}
                  error={errors.fname != null}
                  helperText={errors.fname != null ? errors.fname : ""}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  variant="outlined"
                  onChange={(e) => setLname(e.target.value)}
                  value={lname}
                  error={errors.lname != null}
                  helperText={errors.lname != null ? errors.lname : ""}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender_label">Gender</InputLabel>
                  <Select
                    labelId="gender_label"
                    id="gender"
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    error={errors.sex != null}
                  >
                    <MenuItem value="1">Male</MenuItem>
                    <MenuItem value="0">Female</MenuItem>
                  </Select>
                  {errors.sex != null ? (
                    <FormHelperText error>{errors.sex}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    openTo="year"
                    views={["year", "month", "day"]}
                    label="Birthdate"
                    fullWidth
                    onChange={(newValue) => {
                      setBirthdate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                    value={birthdate}
                    error={errors.birthdate != null}
                  />
                  {errors.birthdate != null ? (
                    <FormHelperText error>{errors.birthdate}</FormHelperText>
                  ) : (
                    ""
                  )}
                </LocalizationProvider>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  label="Father"
                  variant="outlined"
                  onChange={(e) => setFather(e.target.value)}
                  value={father}
                  error={errors.father != null}
                  helperText={errors.father != null ? errors.father : ""}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  label="Mother"
                  variant="outlined"
                  onChange={(e) => setMother(e.target.value)}
                  value={mother}
                  error={errors.mother != null}
                  helperText={errors.mother != null ? errors.mother : ""}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="level_label">Level of study</InputLabel>
                  <Select
                    labelId="level_label"
                    id="level"
                    label="Level of study"
                    onChange={(e) => setLevel(e.target.value)}
                    value={level}
                    error={errors.level_id != null}
                  >
                    {allLevels.map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.id}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.level_id != null ? (
                    <FormHelperText error>{errors.level_id}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid container item spacing={2} md={6}>
              <Grid item xs={12}>
                <Divider>
                  <Chip label="Contact information" />
                </Divider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  error={errors.address != null}
                  helperText={errors.address != null ? errors.address : ""}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  error={errors.email != null}
                  helperText={errors.email != null ? errors.email : ""}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Personal Phone"
                  variant="outlined"
                  onChange={(e) => setPhone1(e.target.value)}
                  value={phone1}
                  error={errors.phone1 != null}
                  helperText={errors.phone1 != null ? errors.phone1 : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Father's Phone"
                  variant="outlined"
                  onChange={(e) => setPhone2(e.target.value)}
                  value={phone2}
                  error={errors.phone2 != null}
                  helperText={errors.phone2 != null ? errors.phone2 : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  variant="outlined"
                  multiline
                  rows={2}
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                  error={errors.notes != null}
                  helperText={errors.notes != null ? errors.notes : ""}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                color="success"
                onClick={() => update()}
                variant="contained"
                style={{ marginBottom: "12px" }}
                startIcon={<AutoFixHighIcon color="white" />}
              >
                Update Student
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
