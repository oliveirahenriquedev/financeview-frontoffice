import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx"; // Certifique-se de que o Header esteja importado
import { CommonText } from "./CommonText.tsx";
import { Autocomplete, Switch, TextField, useMediaQuery } from "@mui/material";
import { useAsyncCallback } from "react-async-hook";
import { getStocksInfo, listStocks } from "../api.ts";
import { GetStockResponse, setDelay } from "../helpers.ts";
import { Chart } from "./Chart.tsx";

export function Chartspage() {
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const [secondarySelectedTicker, setSecondarySelectedTicker] =
    useState<string>();

  const [stocksInfo, setStocksInfo] = useState<GetStockResponse>();
  const [secondaryStocksInfo, setSecondaryStocksInfo] =
    useState<GetStockResponse>();

  const [compare, setCompare] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const listStocksAsyncCallback = useAsyncCallback(listStocks);

  const isWideScreen = useMediaQuery("(min-width: 1506px)");
  const isTallScreen = useMediaQuery("(min-height: 896px)");

  useEffect(() => {
    listStocksAsyncCallback.execute();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (selectedTicker === "") {
      setSelectedTicker(undefined);
      setLoading(false);
    }

    if (selectedTicker) {
      async function fetchData() {
        setStocksInfo(await getStocksInfo(selectedTicker || ""));
        setLoading(false);
      }
      fetchData();
    }
  }, [selectedTicker]);

  useEffect(() => {
    if (secondarySelectedTicker === "") {
      setSecondaryStocksInfo(undefined);
    }

    if (secondarySelectedTicker) {
      async function fetchData() {
        setSecondaryStocksInfo(
          await getStocksInfo(secondarySelectedTicker || "")
        );
      }
      fetchData();
    }
  }, [secondarySelectedTicker]);

  useEffect(() => {
    setSecondaryStocksInfo(undefined);
    setSecondarySelectedTicker("");
  }, [compare]);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      {isWideScreen && isTallScreen ? (
        <div className="mr-20">
          <Sidebar />
        </div>
      ) : (
        <div className="flex justify-center">
          <Header />
        </div>
      )}
      <div
        className={`bg-gradient-to-b from-white to-black h-screen w-screen flex flex-col items-center transition-all duration-500`}
      >
        <CommonText
          text={`Por favor, selecione ${
            compare ? "ações" : "alguma ação"
          } para ver as métricas: `}
          style={{ marginTop: "80px", paddingLeft: 10, paddingRight: 10 }}
          hasAnimation
        />
        <div style={{ display: "inline-flex" }} className="animate-slide-in-up">
          <Autocomplete
            options={
              listStocksAsyncCallback.result
                ? listStocksAsyncCallback.result.map((stock) => stock.ticker)
                : []
            }
            onChange={(e, newValue) =>
              setSelectedTicker((newValue as any) || "")
            }
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ bgcolor: "white" }} />
            )}
            loading={
              listStocksAsyncCallback.loading || !listStocksAsyncCallback.result
            }
            disableClearable={!!secondarySelectedTicker}
            sx={{
              width: compare && isTallScreen ? 150 : isTallScreen ? 150 : 200,
              bgcolor: "white",
            }}
          />
          {compare && (
            <Autocomplete
              options={
                listStocksAsyncCallback.result
                  ? listStocksAsyncCallback.result.map((stock) => stock.ticker)
                  : []
              }
              onChange={(_e, newValue) =>
                setSecondarySelectedTicker((newValue as any) || "")
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ bgcolor: "white" }} />
              )}
              loading={
                listStocksAsyncCallback.loading ||
                !listStocksAsyncCallback.result
              }
              disabled={!selectedTicker}
              sx={{
                width: isTallScreen ? 150 : 200,
                bgcolor: "white",
                marginLeft: 4,
              }}
            />
          )}
        </div>

        <div style={{ display: "inline-flex" }} className="animate-slide-in-up">
          <CommonText
            text="Quero comparar ações"
            style={{ fontSize: "20px", marginRight: "8px" }}
          />
          <Switch
            onChange={() => setCompare(!compare)}
            color={compare ? "success" : "info"}
          />
        </div>
        {loading && isWideScreen && selectedTicker ? (
          <div className="w-full max-w-[1000px] h-[1200px] border-2 rounded-lg mt-6 p-8 bg-white mb-[220px]">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between mb-4">
                <div className="w-32 h-8 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
              {/* Y-Axis */}
              <div className="flex h-full">
                <div className="flex flex-col justify-between">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="w-8 h-4 bg-gray-300 rounded-md animate-pulse"
                    ></div>
                  ))}
                </div>
                {/* Bars */}
                <div className="flex-1 flex items-end justify-between pl-4">
                  {[...Array(10)].map((_, index) => (
                    <div
                      key={index}
                      className="w-8 bg-gray-300 rounded-md animate-pulse"
                      style={{ height: `${Math.random() * 60 + 20}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          (selectedTicker || secondarySelectedTicker) &&
          stocksInfo &&
          stocksInfo.results &&
          !loading && (
            <Chart
              stock={stocksInfo.results[0]}
              secondaryStock={secondaryStocksInfo?.results[0]}
              tickerId={selectedTicker || ""}
              secondaryTickerId={secondarySelectedTicker}
              isCompairing={compare}
              displayButton={!isWideScreen || !isTallScreen}
            />
          )
        )}
      </div>
    </div>
  );
}
