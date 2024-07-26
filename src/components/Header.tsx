import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import { getCurrentUserData, TokenManager } from "../helpers.ts";
import { jwtDecode } from "jwt-decode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export function Header() {
  const tokenManager = new TokenManager();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  let user;
  if (tokenManager.getCurrentToken()) {
    user = jwtDecode(tokenManager.getCurrentToken() || "");
  } else {
    user = null;
  }
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const isSmallScreen = useMediaQuery("(max-width: 635px)");

  const handleLoginLogout = () => {
    if (tokenManager.getCurrentToken()) {
      setOpen(false);
      tokenManager.removeCurrentToken();
      window.location.reload();
    } else {
      navigate("/signup");
    }
  };

  const menuItems = [
    { text: "FinanceView", href: "/", icon: <></> },
    {
      text: "Charts",
      href: "/chartspage",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
    },
    {
      text: "Sobre nós",
      href: "/aboutus",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="#D9D9D9"
          height="800px"
          width="800px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 502.643 502.643"
        >
          <g>
            <g>
              <path d="M251.256,237.591c37.166,0,67.042-30.048,67.042-66.977c0.043-37.037-29.876-66.999-67.042-66.999    c-36.908,0-66.869,29.962-66.869,66.999C184.387,207.587,214.349,237.591,251.256,237.591z" />
              <path d="M305.032,248.506H197.653c-19.198,0-34.923,17.602-34.923,39.194v107.854c0,1.186,0.604,2.243,0.669,3.473h175.823    c0.129-1.229,0.626-2.286,0.626-3.473V287.7C339.912,266.108,324.187,248.506,305.032,248.506z" />
              <path d="M431.588,269.559c29.832,0,53.754-24.008,53.754-53.668s-23.922-53.711-53.754-53.711    c-29.617,0-53.582,24.051-53.582,53.711C377.942,245.53,401.972,269.559,431.588,269.559z" />
              <path d="M474.708,278.317h-86.046c-15.445,0-28.064,14.107-28.064,31.472v86.413c0,0.928,0.453,1.812,0.518,2.826h141.03    c0.065-1.014,0.496-1.898,0.496-2.826v-86.413C502.707,292.424,490.11,278.317,474.708,278.317z" />
              <path d="M71.011,269.559c29.789,0,53.733-24.008,53.733-53.668S100.8,162.18,71.011,162.18c-29.638,0-53.603,24.051-53.603,53.711    S41.373,269.559,71.011,269.559L71.011,269.559z" />
              <path d="M114.109,278.317H27.977C12.576,278.317,0,292.424,0,309.789v86.413c0,0.928,0.453,1.812,0.539,2.826h141.03    c0.065-1.014,0.475-1.898,0.475-2.826v-86.413C142.087,292.424,129.489,278.317,114.109,278.317z" />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </g>
        </svg>
      ),
    },
  ];

  const list = () => (
    <div
      className="w-full"
      role="presentation"
      onClick={(event) => {}}
      onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundColor: "#202c34",
        }}
      >
        {menuItems.map((item, index) => (
          <ListItem button key={index} component="a" href={item.href}>
            <ListItemIcon sx={{ color: "#D9D9D9" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: "#D9D9D9",
                display: "flex",
              }}
            />
          </ListItem>
        ))}
        <ListItem component="button">
          <div className="relative dont-close-drawer">
            <button
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Olá,{" "}
                    {user
                      ? user.name.trim().split(" ")[0].charAt(0).toUpperCase() +
                        user.name.trim().split(" ")[0].slice(1).toLowerCase()
                      : "visitante"}
                    !
                  </span>
                </div>
              </div>
            </button>

            <div
              className={`absolute top-full left-0 min-w-[150px] bg-white dark:bg-gray-800 shadow-lg rounded-md transition-all duration-300 ${
                open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
              style={{ zIndex: 1300 }} // Ensure the Collapse is above the Header
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {user && (
                    <ListItemButton
                      sx={{ pl: 2, color: "#FFFFFF" }}
                      onClick={() => {
                        setOpen(false);
                        navigate("/account");
                      }}
                    >
                      <ListItemIcon sx={{ color: "#FFFFFF" }}>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Conta" />
                    </ListItemButton>
                  )}
                  <ListItemButton sx={{ pl: 2 }} onClick={handleLoginLogout}>
                    {user ? (
                      <>
                        <ListItemIcon sx={{ color: "#FF7F7F" }}>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Sair"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "24px",
                            fontFamily: "sans-serif",
                            color: "#FF7F7F",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <ListItemIcon sx={{ color: "#90EE90" }}>
                          <LoginIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Entrar"
                          sx={{ color: "#90EE90" }}
                        />
                      </>
                    )}
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          </div>
        </ListItem>
      </List>
    </div>
  );

  return (
    <header className="bg-gray-50 dark:bg-gray-800 w-full p-4 shadow-md flex items-center justify-between ">
      <a
        href="/"
        className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        FinanceView
      </a>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        className="dark:text-white"
        sx={{ color: "#D9D9D9" }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"top"}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#202c34",
            height: open ? "180px" : undefined,
          },
        }}
      >
        {list()}
      </Drawer>
    </header>
  );
}
