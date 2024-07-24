import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx"; // Certifique-se de que o Header esteja importado
import { CommonText } from "./CommonText.tsx";
import { Autocomplete, Switch, TextField, useMediaQuery } from "@mui/material";
import { useAsyncCallback } from "react-async-hook";
import { getStocksInfo, listStocks } from "../api.ts";
import { GetStockResponse } from "../helpers.ts";
import { Chart } from "./Chart.tsx";

export function Chartspage() {
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const [secondarySelectedTicker, setSecondarySelectedTicker] =
    useState<string>();

  const [stocksInfo, setStocksInfo] = useState<GetStockResponse>();
  const [secondaryStocksInfo, setSecondaryStocksInfo] =
    useState<GetStockResponse>();

  const [compare, setCompare] = useState<boolean>(false);
  const listStocksAsyncCallback = useAsyncCallback(listStocks);

  const isWideScreen = useMediaQuery("(min-width: 1506px)");
  const isTallScreen = useMediaQuery("(min-height: 896px)");

  useEffect(() => {
    listStocksAsyncCallback.execute();
  }, []);

  useEffect(() => {
    if (selectedTicker === "") {
      setSelectedTicker(undefined);
    }

    if (selectedTicker) {
      async function fetchData() {
        setStocksInfo(await getStocksInfo(selectedTicker || ""));
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
        className={`bg-gradient-to-r from-green-300 via-green-200 to-green-100 h-screen w-screen flex flex-col items-center transition-all duration-500`}
      >
        <CommonText
          text={`Por favor, selecione ${
            compare ? "ações" : "alguma ação"
          } para ver as métricas: `}
          style={{ marginTop: "80px", paddingLeft: 10, paddingRight: 10 }}
          hasAnimation
        />
        <div style={{ display: "inline-flex" }}>
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
        <div style={{ display: "inline-flex" }}>
          <CommonText
            text="Quero comparar ações"
            style={{ fontSize: "20px", marginRight: "8px" }}
          />
          <Switch
            onChange={() => setCompare(!compare)}
            color={compare ? "success" : "info"}
          />
        </div>
        {(selectedTicker || secondarySelectedTicker) &&
          stocksInfo &&
          stocksInfo.results && (
            <Chart
              stock={stocksInfo.results[0]}
              secondaryStock={secondaryStocksInfo?.results[0]}
              tickerId={selectedTicker || ""}
              secondaryTickerId={secondarySelectedTicker}
              isCompairing={compare}
              displayButton={!isWideScreen || !isTallScreen}
            />
          )}
      </div>
    </div>
  );
}
