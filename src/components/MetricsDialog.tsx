import { Dialog } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";

type MetricsDialogProps = {
  metricsProps: {
    dateValues: any[];
    closeValues: any[];
    tickerId: string;
    secondaryValues?: any[];
    secondaryTickerId?: string;
    secondaryLongName?: string;
    isCompairing: boolean;
    longName: string;
  };
  open: boolean;
  onClose: () => void;
};

export function MetricsDialog({
  open,
  metricsProps,
  onClose,
}: MetricsDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ width: "100%", height: "100%" }}
    >
      <p className="text-3xl flex justify-center items-center mb-2 mt-4 ml-8 max-w-4xl flex-nowrap">
        {metricsProps.longName}{" "}
        {metricsProps.isCompairing &&
          metricsProps.secondaryLongName &&
          `x ${metricsProps.secondaryLongName}`}
      </p>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: metricsProps.dateValues,
          },
        ]}
        series={[
          {
            data: metricsProps.closeValues,
            label: metricsProps.tickerId,
          },
          {
            data: metricsProps.secondaryValues,
            label:
              metricsProps.secondaryTickerId !== "" && metricsProps.isCompairing
                ? metricsProps.secondaryTickerId
                : undefined,
          },
        ]}
        height={600}
        sx={{ minWidth: 1000 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </Dialog>
  );
}
