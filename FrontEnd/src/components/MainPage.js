import React,{useState} from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Rightbar from "./Rightbar";
import Add from './Add'
import Userlist from "../data/Userlist";
import Feed from './Feed'

const MainPage=()=>{
    const [mode, setMode] = useState("light");

    const darkTheme = createTheme({
      palette: {
        mode: mode,
      },
    });
    return(
        <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-evenly"
          >
            <Sidebar setMode={setMode} mode={mode} />
            <Feed Userlist={Userlist} />
            <Rightbar />
          </Stack>
          <Add />
        </Box>
      </ThemeProvider>
    )
}

export default MainPage