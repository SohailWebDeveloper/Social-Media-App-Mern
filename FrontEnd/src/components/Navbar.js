import { Mail, Notifications, Pets } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  alpha
} from "@mui/material";
import React, { useState } from "react";
import{useDispatch, useSelector} from 'react-redux'
import {Navigate,useNavigate} from 'react-router-dom'
import {Logout} from '../Redux/action'
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    backgroundColor: "#dee2e6",
    color:"#343a40",
  padding: "0 10px",
  width: "40%",
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
  }));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logoutHandler =()=>{
    dispatch(Logout())
    navigate('/login')
  }
  return (
    <AppBar position="sticky" sx={{backgroundColor:"#f8f9fa"}}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" },color:"#1565C0" }}>
         <strong>SOCIADO
         </strong>       </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <Icons>
          {/* <Badge badgeContent={4} color="error">
            <Mail sx={{color:"green" }}/>
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications sx={{color:"green" }}/>
          </Badge> */}
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            onClick={(e) => setOpen(!open)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(!open)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(!open)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
       <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
