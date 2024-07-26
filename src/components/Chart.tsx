import React, { useEffect, useState } from "react";
import {
  getCurrentDate,
  getYesterdayValue,
  HistoricalDataPrice,
  StockInfo,
} from "../helpers.ts";
import { LineChart } from "@mui/x-charts";
import { Card } from "@mui/material";
import { TickerDetails } from "./TickerDetails.tsx";
import { MetricsDialog } from "./MetricsDialog.tsx";

type ChartProps = {
  stock: StockInfo;
  secondaryStock: StockInfo | undefined;
  tickerId: string;
  secondaryTickerId: string | undefined;
  isCompairing: boolean;
  displayButton: boolean | undefined;
};

export function Chart({
  stock,
  secondaryStock,
  tickerId,
  secondaryTickerId,
  isCompairing = false,
  displayButton,
}: ChartProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [metricsOpen, setMetricsOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<
    HistoricalDataPrice | undefined
  >(undefined);

  const filteredHistoricalDataPrice = stock.historicalDataPrice.filter(
    (value) =>
      tickerId && value.date !== getCurrentDate() && value.close !== null
  );

  const secondaryFilteredHistoricalDataPrice =
    secondaryStock?.historicalDataPrice.filter(
      (value) =>
        isCompairing && value.date !== getCurrentDate() && value.close !== null
    );

  const closeValues =
    filteredHistoricalDataPrice.slice(-10).map((value) => value.close) || [];

  const secondaryValues =
    secondaryFilteredHistoricalDataPrice
      ?.slice(-10)
      .map((value) => value.close) || [];

  const dateValues = filteredHistoricalDataPrice
    .slice(-10)
    .map((value) => value.date);

  const handleSeeMoreClick = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    setSelectedStock(undefined);
  }, [stock]);

  const handleSeeMetricsClick = () => {
    setMetricsOpen(!metricsOpen);
  };

  return (
    <div style={{ display: "inline-flex", marginTop: 16 }}>
      {displayButton ? (
        <div className="flex mt-auto mb-auto flex-col justify-center">
          <button
            style={{
              display: "flex",
              float: "right",
            }}
            type="button"
            className={`flex float-right p-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 mt-4 float-right`}
            onClick={handleSeeMetricsClick}
          >
            Ver as métricas
          </button>
        </div>
      ) : (
        <Card sx={{ height: 680, width: 1000 }}>
          <div>
            {closeValues.length > 0 && (
              <>
                <p className="text-3xl flex justify-center items-center mb-2 mt-4 ml-8 max-w-4xl">
                  {stock.longName}{" "}
                  {isCompairing &&
                    secondaryStock?.longName &&
                    `x ${secondaryStock.longName}`}
                </p>
                <button
                  style={{
                    display: "flex",
                    float: "right",
                    marginTop: "-3rem",
                  }}
                  type="button"
                  className={`text-white ${
                    selectedStock
                      ? "bg-green-500 hover:bg-green-700 border-b-4 border-green-700 transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 mt-4 "
                      : "bg-gray-200 border-none"
                  } text-white font-bold py-2 px-4 mr-2 rounded float-right`}
                  onClick={handleSeeMoreClick}
                  disabled={!selectedStock}
                >
                  Ver mais
                </button>
              </>
            )}
          </div>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: dateValues,
              },
            ]}
            series={[
              {
                data: closeValues,
                label: tickerId,
              },
              {
                data: secondaryValues,
                label:
                  secondaryTickerId !== "" && isCompairing
                    ? secondaryTickerId
                    : "Não selecionado",
              },
            ]}
            width={1000}
            height={600}
            onAxisClick={(_e, value) =>
              setSelectedStock(
                filteredHistoricalDataPrice.find(
                  (hist) => hist.date === value?.axisValue
                )
              )
            }
            grid={{ vertical: true, horizontal: true }}
          />
        </Card>
      )}
      <MetricsDialog
        open={metricsOpen}
        onClose={() => setMetricsOpen(false)}
        metricsProps={{
          closeValues,
          dateValues,
          isCompairing,
          tickerId,
          secondaryTickerId,
          secondaryValues,
          longName: stock.longName,
          secondaryLongName: secondaryStock?.longName,
        }}
      />
      {modalOpen && selectedStock && (
        <TickerDetails
          value={selectedStock}
          yesterdayValue={getYesterdayValue(
            filteredHistoricalDataPrice,
            selectedStock.date
          )}
          img={stock.logourl}
          open={modalOpen}
          handleClick={() => setModalOpen(false)}
          tickerId={tickerId}
          tickerName={stock.longName}
        />
      )}
    </div>
  );
}
