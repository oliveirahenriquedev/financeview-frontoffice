import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Dialog } from "@mui/material";
import React from "react";
import { HistoricalDataPrice, tickerFields } from "../helpers.ts";
import { TickerDetailsLineWithArrow } from "./TickerDetailsLineWithArrow.tsx";

type TickerDetailsProps = {
  value: HistoricalDataPrice;
  yesterdayValue: HistoricalDataPrice | undefined;
  img: string;
  open: boolean;
  handleClick: () => void;
  tickerName: string;
  tickerId: string;
};

export function TickerDetails({
  value,
  yesterdayValue,
  img,
  open,
  handleClick,
  tickerName,
  tickerId,
}: TickerDetailsProps) {
  if (!yesterdayValue) {
    yesterdayValue = value;
  }

  return (
    <Dialog open={open} maxWidth="xl" sx={{ padding: 8, width: "100%" }}>
      <button onClick={handleClick}>
        <CloseRoundedIcon color="error" sx={{ display: "block" }} />
      </button>
      <div className="p-4">
        <p
          className="text-xl "
          style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}
        >{`${tickerName} (${tickerId})`}</p>
        <img src={img} style={{ height: 400, width: "100%" }} />
        <div className="mt-4 text-xl">
          <p>Data selecionada: {value.date} </p>
          {tickerFields.map(({ text, field }) => (
            <TickerDetailsLineWithArrow
              key={field}
              text={text}
              tickerField={value[field]}
              yesterdayTickerField={yesterdayValue[field]}
            />
          ))}
        </div>
        <br />
      </div>
    </Dialog>
  );
}
