import { Dialog } from "@mui/material";
import React from "react";

type ErrorDialogProps = {
  open: boolean;
  onClick: () => void;
};

export function ErrorDialog({ open, onClick }: ErrorDialogProps) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          minWidth: "800px", // Define a largura mínima
          minHeight: "350px", // Define a altura mínima
          alignItems: "center",
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "800px", // Define a largura mínima
          minHeight: "350px", // Define a altura mínima
        },
      }}
    >
      <div className="p-8">
        <p className="text-4xl mt-4 text-red-700">
          Houve um erro com a requisição
        </p>
        <p className="text-xl mt-12">
          Encontramos um erro ao realizar a requisição. Por favor, verifique
          quaisquer campos de formulário e tente novamente
          <br />
          <br /> Caso o erro persista, contate nosso suporte.
        </p>
        <div className="flex justify-center mb-auto mt-[15%]">
          <button
            className={`middle none center mr-3 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-6 font-sans text-base font-bold  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-4 w-[30%] mt-auto`}
            data-ripple-light="true"
            onClick={onClick}
          >
            Fechar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
