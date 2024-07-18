import React, { useEffect, useState } from "react";
import {
  getCurrentDate,
  GetStockResponse,
  getYesterdayValue,
  HistoricalDataPrice,
  StockInfo,
} from "../helpers.ts";
import { LineChart } from "@mui/x-charts";
import { Card } from "@mui/material";
import { TickerDetails } from "./TickerDetails.tsx";

type ChartProps = {
  stock: StockInfo;
  secondaryStock: StockInfo | undefined;
  tickerId: string;
  secondaryTickerId: string | undefined;
  isCompairing: boolean;
};

export function Chart({
  stock,
  secondaryStock,
  tickerId,
  secondaryTickerId,
  isCompairing = false,
}: ChartProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<
    HistoricalDataPrice | undefined
  >(undefined);

  // Filtra os valores nulos do array de histórico de preço
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

  return (
    <div style={{ display: "inline-flex", marginTop: 16 }}>
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
                    ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                    : "bg-gray-200"
                } hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
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
          width={950}
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
