import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar.tsx";
import { CommonText } from "./CommonText.tsx";
import { Autocomplete, Switch, TextField } from "@mui/material";
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
    <>
      <Sidebar />
      <div className="bg-green-100 h-screen w-screen flex flex-col items-center">
        <CommonText
          text={`Por favor, selecione ${
            compare ? "ações" : "alguma ação"
          } para ver as métricas: `}
          style={{ marginTop: "80px" }}
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
            sx={{ width: compare ? 200 : 400, bgcolor: "white" }}
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
              sx={{ width: 200, bgcolor: "white", marginLeft: 4 }}
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
            />
          )}
      </div>
    </>
  );
}
