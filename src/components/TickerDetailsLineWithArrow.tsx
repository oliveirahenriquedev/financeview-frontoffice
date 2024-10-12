import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import React from "react";
import { isGreaterOrEqualThanYesterday } from "../helpers.ts";

type TickerDetailsLineWithArrowProps = {
  text: string;
  tickerField: number;
  yesterdayTickerField: number;
};

export function TickerDetailsLineWithArrow({
  text,
  tickerField,
  yesterdayTickerField,
}: TickerDetailsLineWithArrowProps) {
  const fieldStatus = () => {
    if (
      isGreaterOrEqualThanYesterday(yesterdayTickerField, tickerField) ===
      "equal"
    ) {
      return <HorizontalRuleRoundedIcon color="action" />;
    }

    return isGreaterOrEqualThanYesterday(yesterdayTickerField, tickerField) ? (
      <KeyboardArrowUpRoundedIcon color="success" />
    ) : (
      <KeyboardArrowDownRoundedIcon color="error" />
    );
  };

  return (
    <p>
      {text} {tickerField}
      {fieldStatus()}
    </p>
  );
}
