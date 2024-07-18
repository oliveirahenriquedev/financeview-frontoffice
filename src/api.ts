import { GetStockResponse } from "./helpers";

type Stock = {
  ticker: string;
  id: string;
};

export async function listStocks(): Promise<Stock[]> {
  const response = await fetch(
    "https://gnxfpkdmjq.us-east-2.awsapprunner.com/stocks"
  );
  const data = await response.json(); // Converte a resposta em JSON
  return data; // Retorna os dados convertidos
}

export async function getStocksInfo(ticker: string): Promise<GetStockResponse> {
  const response = await fetch(
    `https://gnxfpkdmjq.us-east-2.awsapprunner.com/stocks/${ticker}`
  );
  return response.json();
}
