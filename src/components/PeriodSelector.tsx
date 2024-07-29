import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type PeriodSelectorProps = {
  value: string;
  onChange: (e, value) => void;
  disabled?: boolean;
};

export function PeriodSelector({
  value,
  onChange,
  disabled = false,
}: PeriodSelectorProps) {
  return (
    <FormControl
      sx={{
        display: "flex",
        width: "35%",
        marginTop: "10px",
        marginLeft: "16px",
      }}
      disabled={disabled}
    >
      <InputLabel id="demo-simple-select-label">Período</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        defaultValue="1mo"
        id="demo-simple-select"
        value={value}
        label="Período"
        onChange={onChange}
      >
        {/* <MenuItem value={"1d"}>1 dia</MenuItem>*/}
        <MenuItem value={"5d"}>5 dias</MenuItem>
        <MenuItem value={"1mo"}>1 mês</MenuItem>
        <MenuItem value={"3mo"}>3 meses</MenuItem>
      </Select>
    </FormControl>
  );
}
