import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenManager } from "../helpers.ts";

type SignInSidebarButton = {
  isSignedIn?: boolean;
};

export function SignInSidebarButton({ isSignedIn }: SignInSidebarButton) {
  const tokenManager = new TokenManager();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  let user;
  if (tokenManager.getCurrentToken()) {
    user = jwtDecode(tokenManager.getCurrentToken() || "");
  } else {
    user = null;
  }

  const handleLoginLogout = () => {
    if (tokenManager.getCurrentToken()) {
      setOpen(false);
      tokenManager.removeCurrentToken();
      window.location.reload();
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="relative">
      <button
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        onClick={() => setOpen(!open)}
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
        className={`absolute bottom-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md transition-all duration-300 ${
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        } w-[90%]`}
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
            <ListItemButton
              sx={{
                pl: 2,
              }}
              onClick={handleLoginLogout}
            >
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
                  <ListItemText primary="Entrar" sx={{ color: "#90EE90" }} />
                </>
              )}
            </ListItemButton>
          </List>
        </Collapse>
      </div>
    </div>
  );
}
