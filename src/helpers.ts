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
    description: `"Entusiasta de tecnologia, sou um grande apreciador do back-end, bancos de dados e da infraestrutura por trás de aplicações. Entregar o melhor resultado dentro do prazo, com um código organizado, manutenível e testável, é minha meta. Resolver problemas é meu passatempo, independentemente da linguagem, paradigma ou arquitetura.

Durante o desenvolvimento do FinanceView, ter uma comunicação objetiva e constante com o Henrique foi crucial para manter um bom ambiente de trabalho."`,
    linkedinUrl: "https://www.linkedin.com/in/acauhi/",
    githubUrl: "https://github.com/Acauhi99",
  },
];

export function getCurrentUserData() {
  return localStorage.getItem("userdata");
}

export class TokenManager {
  private static cookieName = "accessToken";

  private static getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  private static setCookie(
    name: string,
    value: string,
    minutes: number = 30
  ): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000); // 30 minutos
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  private static removeCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  getCurrentToken(): string | null {
    return TokenManager.getCookie(TokenManager.cookieName);
  }

  setCurrentToken(token: string): void {
    TokenManager.setCookie(TokenManager.cookieName, token);
  }

  removeCurrentToken(): void {
    TokenManager.removeCookie(TokenManager.cookieName);
  }
}

export const setDelay = (ms) => new Promise((res) => setTimeout(res, ms));

export type Period = "1d" | "5d" | "1mo" | "3mo";

export type TrackedEventProps = "click_boto_graficos" | "login" | "registro";
