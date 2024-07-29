import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type DefaultAlertProps = {
  message: string;
  onClick: () => void;
};

export default function DefaultAlert({ message, onClick }: DefaultAlertProps) {
  return (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity="success"
      sx={{ backgroundColor: "lightgreen" }}
      className="animate-fade-in"
    >
      {message}{" "}
      <CloseRoundedIcon
        sx={{ padding: 0.2, marginLeft: 2, marginBottom: 0.3, color: "red" }}
        onClick={onClick}
      />
    </Alert>
  );
}
