import React, { useEffect, useState } from "react";
import {
  getCurrentDate,
  getYesterdayValue,
  HistoricalDataPrice,
  Period,
  setDelay,
  StockInfo,
  TokenManager,
} from "../helpers.ts";
import { LineChart } from "@mui/x-charts";
import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { TickerDetails } from "./TickerDetails.tsx";
import { MetricsDialog } from "./MetricsDialog.tsx";
import { PeriodSelector } from "./PeriodSelector.tsx";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { favoriteStock, listFavoriteStocks } from "../api.ts";
import { jwtDecode } from "jwt-decode";
import DefaultAlert from "./DefaultAlert.tsx";
import GradeIcon from "@mui/icons-material/Grade";

type ChartProps = {
  stock: StockInfo;
  secondaryStock: StockInfo | undefined;
  tickerId: string;
  secondaryTickerId: string | undefined;
  isCompairing: boolean;
  displayButton: boolean | undefined;
  period: Period;
  onPeriodChange: (e, newValue) => void;
};

const tokenManager = new TokenManager();

export function Chart({
  stock,
  secondaryStock,
  tickerId,
  secondaryTickerId,
  isCompairing = false,
  displayButton,
  period,
  onPeriodChange,
}: ChartProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [method, setMethod] = useState<"POST" | "DELETE">("POST");
  const [favoriteStocks, setFavoriteStocks] = useState<string[]>([]);
  const [isFavoriting, setIsFavoriting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [metricsOpen, setMetricsOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<
    HistoricalDataPrice | undefined
  >(undefined);

  const isAuthenticated = !!tokenManager.getCurrentToken();
  let user;
  if (isAuthenticated) {
    user = jwtDecode(tokenManager.getCurrentToken() || "");
  }

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
    filteredHistoricalDataPrice.map((value) => value.close) || [];

  const secondaryValues =
    secondaryFilteredHistoricalDataPrice?.map((value) => value.close) || [];

  const dateValues = filteredHistoricalDataPrice.map((value) => value.date);

  useEffect(() => {}, []);

  const handleSeeMoreClick = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fn = async () => {
      await setDelay(2500);
      setLoading(false);
    };
    fn();
  }, []);

  useEffect(() => {
    setSelectedStock(undefined);
  }, [stock]);

  const handleSeeMetricsClick = () => {
    setMetricsOpen(!metricsOpen);
  };

  const handleFavoriteTicker = async () => {
    if (isAuthenticated) {
      const fn = async () => {
        const res = await listFavoriteStocks(
          user.user_id,
          tokenManager.getCurrentToken()
        );
        setFavoriteStocks(res.favorites);
      };

      fn();
    }

    if (favoriteStocks.includes(tickerId)) {
      await favoriteStock(
        { user_id: +user.user_id, stock_ticker: tickerId },
        "DELETE",
        tokenManager.getCurrentToken()
      );
      setIsFavoriting(false);
    } else {
      await favoriteStock(
        { user_id: +user.user_id, stock_ticker: tickerId },
        "POST",
        tokenManager.getCurrentToken()
      );
      setIsFavoriting(true);
    }

    setSuccess(true);
  };

  useEffect(() => {
    const fn = async () => {
      await setDelay(2500);
      setSuccess(false);
    };

    fn();
  }, [success]);

  return (
    <div style={{ display: "inline-flex", marginTop: 16 }}>
      {displayButton ? (
        loading ? (
          <div className="mr-8 mt-4 float-right">
            <div className="w-8 h-8 rounded-full absolute border-8 border-solid border-gray-200"></div>
            <div className="w-8 h-8 rounded-full animate-spin absolute border-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
          </div>
        ) : (
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
        )
      ) : (
        <Card sx={{ height: 680, width: 1000 }}>
          <div>
            {closeValues.length > 0 && (
              <>
                <p className="text-3xl flex justify-start items-center mt-4 max-w-4xl">
                  <div className="flex flex-row w-[40%]">
                    <PeriodSelector
                      onChange={onPeriodChange}
                      value={period}
                      disabled={!isAuthenticated}
                    />
                    {/* <IconButton
                      title={`${
                        !favoriteStocks.includes(tickerId)
                          ? "Desmarcar"
                          : "Marcar"
                      } ação como favorita`}
                      disabled={!isAuthenticated}
                      onClick={handleFavoriteTicker}
                      sx={{ marginLeft: "-20px", marginTop: 1 }}
                    >
                      {!favoriteStocks.includes(tickerId) ? (
                        <GradeIcon
                          fontSize="medium"
                          sx={{ color: "#a88932" }}
                        />
                      ) : (
                        <StarOutlineIcon fontSize="medium" />
                      )}
                    </IconButton>*/}
                  </div>
                  {stock.longName}{" "}
                  {isCompairing &&
                    secondaryStock?.longName &&
                    `x ${secondaryStock.longName}`}
                </p>
                <button
                  style={{
                    display: "flex",
                    float: "right",
                    marginTop: "-3.5rem",
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
      {success && (
        <DefaultAlert
          message={`A ação foi ${
            isFavoriting ? "adicionada" : "removida"
          } com sucesso`}
          onClick={() => setSuccess(false)}
        />
      )}
    </div>
  );
}
