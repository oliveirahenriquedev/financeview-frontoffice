import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar.tsx";
import { CommonText } from "./CommonText.tsx";
import { Autocomplete, TextField } from "@mui/material";

export function Chartspage() {
  const [selectedTicker, setSelectedTicker] = useState<string>();

  useEffect(() => {
    console.log("mudou >> ", selectedTicker);
  }, [selectedTicker]);
  return (
    <>
      <Sidebar />
      <div className="bg-green-100 h-screen w-screen flex flex-col items-center">
        <CommonText
          text={"Por favor, selecione: "}
          style={{ marginTop: "80px" }}
        />
        <Autocomplete
          options={["test"]}
          onChange={(e, newValue) => setSelectedTicker(newValue || "")}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </>
  );
}
