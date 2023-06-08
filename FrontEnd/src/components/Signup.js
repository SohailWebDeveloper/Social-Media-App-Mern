import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schema/index";
import { useDispatch, useSelector } from "react-redux";
import { SignUpData } from "../Redux/action";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {
  name: "",
  lName: "",
  email: "",
  password: "",
  confirm_password: "",
};
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const Signup = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState(false);
  
  const dispatch = useDispatch();
  // const users=
  const [users, setUsers] = useState(
    useSelector((state) => state.SignUpAbc.users)
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      console.log(values);
      action.resetForm();
      let result = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          lName: values.lName,
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      dispatch(SignUpData(values));
      // console.log(`SignUpmessage${result.message}`)
      toast.success(result.message);
      setTimeout(() => {
        // Perform navigation after 5 seconds
        navigate("/login");
      }, 6000);
     
      //           localStorage.setItem("name",values.name)
      //           localStorage.setItem("lName",values.lName)
      // localStorage.setItem("email",values.email)
      // localStorage.setItem("password",values.password)
      // localStorage.setItem("confirm_password",values.confirm_password)
      // {values,errors,touched,handleBlur,handleChange,handleSubmit}
    },
  });
  // const postingData = async(e) =>{

  //   // console.log(name, address, email, password)
  //   let result = await fetch('http://localhost:5000/register',{
  //     method: "POST",
  //     body: JSON.stringify({users}),
  //     headers:{
  //       "Content-Type": "application/json",
  //     }
  //   })
  //   result = await result.json();
  //   console.log(result)

  // }
  return (
  




<section className="vh-100" style={{ backgroundColor: "#012E4F" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="../Images/new-2.png"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                    <div className="J-Background">
       <div>
         <Stack direction="row" spacing={2} justifyContent="space-between">
           <ThemeProvider theme={theme}>
           <Container
              component="main"
              maxWidth="xs"
              
            >
              <CssBaseline />
              <Grid
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 3 }}
                  onSubmit={formik.handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.name && formik.touched.name ? (
                        <span className="form-error">{formik.errors.name}</span>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete="family-name"
                        name="lName"
                        value={formik.values.lName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.lName && formik.touched.lName ? (
                        <span className="form-error">
                          {formik.errors.lName}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <span className="form-error">
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <span className="form-error">
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="confirmpassword"
                        autoComplete="new-password"
                        name="confirm_password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.confirm_password &&
                      formik.touched.confirm_password ? (
                        <span className="form-error">
                          {formik.errors.confirm_password}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </ThemeProvider>
        </Stack>
        <ToastContainer />
         {/* {users.map(user=><div><h1>{user.lName}</h1>-----{user.email}</div>)}
               <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                 className="img-fluid"/> */}
       </div>
     </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Signup;

{
  /* <section className="vh-100" style={{backgroundColor: "#eee"}}>
<div className="container h-100">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-lg-12 col-xl-11">
      <div className="card text-black" style={{borderRadius: "25px"}}>
        <div className="card-body p-md-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input type="text" id="form3Example1c" className="form-control"name='name' value={formik.values.name} onChange={formik.handleChange}onBlur={formik.handleBlur} />
                    <label className="form-label" for="form3Example1c">Your Name</label>
                  </div>
                </div>
                {formik.errors.name && formik.touched.name ? (
                    <p className="form-error">{formik.errors.name}</p>
                  ) : null}
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input type="email" id="form3Example3c" className="form-control" name='email'value={formik.values.email} onChange={formik.handleChange}onBlur={formik.handleBlur}  />
                    <label className="form-label" for="form3Example3c">Your Email</label>
                  </div>
                </div>
                {formik.errors.email && formik.touched.email ? (
                    <p className="form-error">{formik.errors.email}</p>
                  ) : null}
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input type="password" id="form3Example4c" className="form-control"name='password'  value={formik.values.password} onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                    <label className="form-label" for="form3Example4c">Password</label>
                  </div>
                </div>
                {formik.errors.password && formik.touched.password ? (
                    <p className="form-error">{formik.errors.password}</p>
                  ) : null}
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input type="password" id="form3Example4cd" className="form-control" name='confirm_password'value={formik.values.confirm_password} onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                    <label className="form-label" for="form3Example4cd">Repeat your password</label>
                  </div>
                </div>
                {formik.errors.confirm_password && formik.touched.confirm_password ? (
                    <p className="form-error">{formik.errors.confirm_password}</p>
                  ) : null}
                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                  <label className="form-check-label" for="form2Example3">
                    I agree all statements in <a href="#!">Terms of service</a>
                  </label>
                </div>

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button type="submit" className="btn btn-primary btn-lg">Register</button>
                </div>
                <Link to='/login'>
                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </div>
                </Link>
              </form>

            </div>
            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
            {users.map(user=><div><h1>{user.name}</h1>-----{user.email}</div>)}
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */
}
// </section>
