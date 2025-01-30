import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { NAVBAR_HEIGHT } from "./constants";
import useScrollPosition from "../../hooks/useScrollPosition";
import { navbarContent } from "../../utils/content";
import CallMadeIcon from "@mui/icons-material/CallMade";
import LanguageIcon from "@mui/icons-material/Language";
import LaunchButton from "../../components/Buttons/LaunchButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsloggIn, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { isUserLogin } from "../../redux/features/auth/authService";

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
  const isLogin = useSelector(selectIsloggIn);
  const dispatch = useDispatch();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  // Login Status
  const loginStatus = async () => {
    try {
      const data = await isUserLogin();
      dispatch(SET_LOGIN(data));
    } catch (error) {
      console.error("Error checking login status:", error);
      setError("Failed to check login status. Please try again.");
    }
  };

  useEffect(() => {
    loginStatus();
  }, [dispatch]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
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
            <Link to="/">
              <img className="w-28" src={Logo} alt="Logo" />
            </Link>

            {/* Links */}
            {!isMobile ? (
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

                <Link to="/contact">
                  <LinkButton spacing={0.5}>
                    <Typography variant="body2">Contact</Typography>
                    <CallMadeIcon sx={{ fontSize: 12 }} />
                  </LinkButton>
                </Link>
              </Stack>
            ) : (
              <IconButton onClick={toggleMobileMenu}>
                <MenuIcon sx={{ color: "text.secondary" }} />
              </IconButton>
            )}

            {/* Action Buttons */}
            {!isMobile ? (
              <Stack direction="row" spacing={5} alignItems="center">
                {!isLogin ? (
                  <>
                    <Link to="/login">
                      <LinkButton spacing={1}>
                        <Typography variant="body2">Login</Typography>
                      </LinkButton>
                    </Link>
                    <Link to="/register">
                      <LinkButton spacing={1}>
                        <LanguageIcon fontSize="small" />
                        <Typography variant="body2">Register</Typography>
                      </LinkButton>
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard">
                    <LaunchButton sx={{ borderRadius: 3 }} />
                  </Link>
                )}
              </Stack>
            ) : (
              <></>
            )}
          </Stack>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{ width: 250 }}
      >
        <List>
          <ListItem button onClick={toggleMobileMenu}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem button onClick={toggleMobileMenu}>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={toggleMobileMenu}>
            <ListItemText primary="Developers" />
          </ListItem>
          <ListItem button onClick={toggleMobileMenu}>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <ListItemText primary="About" />
            </Link>
          </ListItem>
          <ListItem button onClick={toggleMobileMenu}>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <ListItemText primary="Contact" />
            </Link>
          </ListItem>
          <ListItem button onClick={toggleMobileMenu}>
            {!isLogin ? (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <ListItemText primary="Login " />
                </Link>  ..| |..  
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <ListItemText primary=" Register" />
                </Link>
              </>
            ) : (
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <ListItemText primary="Dashboard" />
              </Link>
            )}
          </ListItem>
        </List>
      </Drawer>

      {/* Error Snackbar */}
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Navbar;
