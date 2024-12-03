import {
  AppBar,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { Children } from "react";
import { NAVBAR_HEIGHT } from "./constants";
import useScrollPosition from "../../hooks/useScrollPosition";
import { navbarContent } from "../../utils/content";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CallMadeIcon from "@mui/icons-material/CallMade";
import LanguageIcon from "@mui/icons-material/Language";
import LaunchButton from "../../components/Buttons/LaunchButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const { Logo } = navbarContent;

const LinkButton = ({ children, ...props }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={0.2}
    sx={{
      cursor: "pointer",
      color: "text.secondary",
      "&:hover": { color: "text.primary" },
    }}
    {...props}
  >
    {children}
  </Stack>
);

const Navbar = () => {
  const scrollPosition = useScrollPosition();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <AppBar
      elevation={0}
      sx={{
        py: 1,
        height: NAVBAR_HEIGHT,
        bgcolor: scrollPosition > 10 ? "rgba(7,7,16,.7)" : "transparent",
        backdropFilter: scrollPosition > 10 && "blur(60px)",
      }}
    >
      <Container
        sx={{
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1380px!important",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {/* Logo */}
          

          {/* Links */}
          {!isMobile && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={6}
              sx={{ flex: 1 }}
              flexWrap="wrap"
            >
              <LinkButton>
                <Link to="/">
                  <Typography variant="body2">Home</Typography>
                </Link>  
              </LinkButton>

              <LinkButton>

                <Typography variant="body2">Products</Typography>
    
              </LinkButton>

              <LinkButton>
                <Typography variant="body2">Developers</Typography>
                
              </LinkButton>

              <LinkButton>
                <Link to="/about">
                  <Typography variant="body2">About</Typography>
                </Link>  
              </LinkButton>
              <Link to="contact">
              <LinkButton spacing={0.5}>
                
                  <Typography variant="body2">Contact</Typography>
                  <CallMadeIcon sx={{ fontSize: 12 }} />
              
              </LinkButton>
              </Link>
            </Stack>
          )}

          {/* Action Buttons */}
          {isMobile ? (
            <IconButton>
              <MenuIcon sx={{ color: "text.secondary" }} />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={5} alignItems="center">
              <Link to='register'>
                <LinkButton spacing={1}>
                    <LanguageIcon fontSize="small" />
                    <Typography variant="body2">Register</Typography>
                </LinkButton>
              </Link>
            <Link to="/dashboard">
              <LaunchButton sx={{ borderRadius: 3 }} />
            </Link>
            </Stack>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
