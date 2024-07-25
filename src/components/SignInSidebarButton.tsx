import React, { useEffect } from "react";
import { useAsyncCallback } from "react-async-hook";
import { getUser } from "../api.ts";
import { jwtDecode } from "jwt-decode";
import { TokenManager } from "../helpers.ts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type SignInSidebarButton = {
  isSignedIn?: boolean;
};

export function SignInSidebarButton({ isSignedIn }: SignInSidebarButton) {
  const tokenManager = new TokenManager();

  let user;
  if (tokenManager.getCurrentToken()) {
    user = jwtDecode(tokenManager.getCurrentToken() || "");
  } else {
    user = null;
  }
  return (
    <a
      href={user ? `/account` : `/signup`}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      {isSignedIn ? (
        <>
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8H6m0 0 4 4m-4-4 4-4M7 15H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
            />
          </svg>

          <span className="flex-1 ms-3 whitespace-nowrap">Sair</span>
        </>
      ) : (
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            {user ? (
              <AccountCircleIcon sx={{ marginRight: -0.5 }} />
            ) : (
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
            )}
            <span className="flex-1 ms-3 whitespace-nowrap ">
              Olá, {user ? user.name : "visitante"}!
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 ms-8">
            Clique aqui {user ? "para acessar sua conta" : "para entrar"}
          </span>
        </div>
      )}
    </a>
  );
}
