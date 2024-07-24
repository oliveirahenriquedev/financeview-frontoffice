export interface UserFields {
  name: string;
  email: string;
  password: string;
}

export interface HistoricalDataPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

export interface StockInfo {
  currency: string;
  shortName: string;
  longName: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  symbol: string;
  usedInterval: string;
  usedRange: string;
  historicalDataPrice: HistoricalDataPrice[];
  validRanges: string[];
  validIntervals: string[];
  priceEarnings: number;
  earningsPerShare: number;
  logourl: string;
}

export interface GetStockResponse {
  results: StockInfo[];
  requestedAt: string;
  took: string;
}

export function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

export function isGreaterOrEqualThanYesterday(
  yesterdayValue: number,
  actualFieldValue: number
): boolean | "equal" {
  if (actualFieldValue === yesterdayValue) {
    return "equal";
  }

  return actualFieldValue > yesterdayValue;
}

export function getYesterdayValue(
  originalArr: HistoricalDataPrice[],
  selectedDate: string
) {
  const selectedIndex = originalArr.findIndex(
    (value) => value.date === selectedDate
  );
  if (selectedIndex > 0) {
    return originalArr[selectedIndex - 1];
  }
  return undefined;
}

export const tickerFields = [
  { text: "Valor de abertura: ", field: "open" },
  { text: "Valor de fechamento: ", field: "adjustedClose" },
  { text: "Valor de alta: ", field: "high" },
  { text: "Valor de baixa: ", field: "low" },
  { text: "Volume de transações: ", field: "volume" },
];

export const defaultDevsInfo = [
  {
    name: "Henrique de Oliveira",
    imagePath: "images/henrique.jpeg",
    description:
      "Phasellus finibus turpis quis lorem varius rutrum. Sed ultrices auctor massa sit amet finibus. Phasellus cursus iaculis orci ac feugiat. Sed ante ligula, elementum quis porttitor sed, fermentum quis neque. Nunc metus turpis, ornare ac dui id, euismod interdum nisl. In nec convallis justo, nec eleifend metus. Ut finibus massa sit amet eros molestie consectetur. Sed sodales egestas ornare. Aliquam erat volutpat. ",
    linkedinUrl: "https://www.linkedin.com/in/henrique-de-oliveira-c/",
    githubUrl: "https://github.com/oliveirahenriquedev",
  },
  {
    name: "Mateus Acauhi",
    imagePath: "/images/acauhiofc.jpeg",
    description:
      "Mauris ut purus hendrerit, bibendum augue eget, volutpat metus. Fusce fermentum purus eu ullamcorper pharetra. Pellentesque odio tortor, fermentum id maximus id, tincidunt non enim. Integer iaculis faucibus nisi eget efficitur. Nulla sit amet diam id lectus rutrum hendrerit pharetra tempor purus. Vestibulum sit amet purus ac sapien faucibus eleifend. Mauris auctor accumsan libero, at lobortis nulla.",
    linkedinUrl: "https://www.linkedin.com/in/acauhi/",
    githubUrl: "https://github.com/Acauhi99",
  },
];
