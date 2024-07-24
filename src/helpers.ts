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
    description: `"Sempre fui apaixonado por código. Desde criança sempre estive muito ligado ao código então sempre soube que era a área que eu gostaria de seguir. No FinanceView, fiquei responsável pela parte visual do projeto, prosseguindo com os padrões de código e usabilidade como prioridade. Além disso, auxiliei o Mateus em alguns pontos da arquitetura do software, entendendo quais boas práticas utilizaríamos no escopo, mantendo o foco em um fluxo correto e coeso."`,
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

export function getCurrentUserName() {
  return localStorage.getItem("username");
}
