import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";

export function Header() {
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

  const menuItems = [
    { text: "Ir para Home", href: "/", icon: <HomeIcon /> },
    { text: "Charts", href: "/chartspage", icon: <ShowChartIcon /> },
    { text: "Sobre nós", href: "/aboutus", icon: <InfoIcon /> },
    { text: "Entrar", href: "/signup", icon: <LoginIcon /> },
  ];

  const list = () => (
    <div
      className="w-full"
      role="presentation"
      onClick={toggleDrawer(false)}
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
      </List>
    </div>
  );
  return (
    <header className="bg-gray-50 dark:bg-gray-800 w-full p-4 shadow-md flex items-center justify-between">
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
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#202c34",
          },
        }}
      >
        {list()}
      </Drawer>
    </header>
  );
}
