import React from "react";
import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Button,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import DrawerComponent from "./Drawer";
import SyncIcon from "@mui/icons-material/Sync";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ links }) => {
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  function handleReset() {
    navigate("/");
    localStorage.clear()
  }

  return (
    <AppBar
      sx={{ background: (theme) => theme.palette.gradient.main }}
    >
      <Toolbar>
        {isMatch ? (
          <>
            <Typography>
            <Button
                variant="outlined"
                onClick={handleReset}>
              
                {/* Reset  */}
                <SyncIcon />
              </Button>
            </Typography>
            <DrawerComponent links={links} />
          </>
        ) : (
          <Grid sx={{ placeItems: "center" }} container justifyContent="center">
            <Grid item xs={2}>
              <Typography>
              <Link className="text-link" to="/"><SyncIcon /></Link>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Tabs
                indicatorColor="primary"
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
            
                {Object.keys(links).map((link, index) => (
                    <Link 
                      className="text-link"
                      to={links[link].href}
                      >
                      <Tab label={links[link].label} key={index} />
                    </Link>
                  )
                )}
              </Tabs>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
