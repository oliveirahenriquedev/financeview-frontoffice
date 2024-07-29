import React from "react";
import { Card, Dialog, useMediaQuery } from "@mui/material";

type NotAuthenticatedDialogProps = {
  open: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
};

export function NotAuthenticatedDialog({
  open,
  onClose,
  navigate,
}: NotAuthenticatedDialogProps) {
  const isSmallScreen = useMediaQuery("(max-width: 800px)");

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          minWidth: isSmallScreen ? "20px" : "880px", // Define a largura mínima
          minHeight: "350px",
          alignItems: "center",
          maxWidth: isSmallScreen ? "20px" : undefined,
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: isSmallScreen ? "20px" : "880px", // Define a largura mínima
          minHeight: "350px",
          maxWidth: isSmallScreen ? "80%" : undefined,
        },
      }}
    >
      <div className="p-4 font-roboto">
        <p className="text-4xl mt-4 text-red-700">Você não está autenticado</p>
        <p className="text-xl mt-12">
          Para realizar o envio deste formulário, você precisa estar
          autenticado. <br />
          <br /> Por favor, realize sua autenticação e tente novamente.
        </p>
        <div className="flex justify-center mb-auto mt-[15%]">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-7">
            <button onClick={onClose}>
              <p className="mr-2 text-teal-700">Fechar</p>
            </button>
            <button onClick={() => navigate("/signup")}>
              <p className="mr-2 bg-green-600 text-white shadow focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Quero me autenticar!
              </p>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
