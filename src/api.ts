import { GetStockResponse, UserFields } from "./helpers";

type Stock = {
  ticker: string;
  id: string;
};

export async function listStocks(): Promise<Stock[]> {
  const response = await fetch(
    "https://wg2bvjgjwg.us-east-2.awsapprunner.com/stock"
  );
  const data = await response.json(); // Converte a resposta em JSON
  console.log(data);
  return data; // Retorna os dados convertidos
}

export async function getStocksInfo(ticker: string): Promise<GetStockResponse> {
  const response = await fetch(
    `https://wg2bvjgjwg.us-east-2.awsapprunner.com/stock/${ticker}`
  );
  return response.json();
}

export async function createUser(body: UserFields) {
  try {
    const response = await fetch(
      `https://wg2bvjgjwg.us-east-2.awsapprunner.com/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Adiciona o header para JSON
        },
        body: JSON.stringify(body), // Converte o corpo para JSON
        mode: "cors", // Define o modo como 'cors'
      }
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json(); // Obtém os dados de erro
      throw new Error(`Error ${response.status}: ${errorData.detail[0].msg}`); // Lança um erro com a mensagem do servidor
    }

    // Converte a resposta em JSON
    const data = await response.json();
    console.log("Usuário criado com sucesso!", data);
    return data; // Retorna os dados da resposta
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error; // Re-lança o erro para que possa ser tratado externamente
  }
}

export async function getUser(body: { username: string; password: string }) {
  try {
    const formBody = new URLSearchParams();
    formBody.append("username", body.username);
    formBody.append("password", body.password);

    const response = await fetch(
      `https://wg2bvjgjwg.us-east-2.awsapprunner.com/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
        mode: "cors",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData);
      return response.status;
    }

    const responseData = await response.json();
    localStorage.setItem(
      "accessToken",
      responseData.data.user_data.access_token
    );
    localStorage.setItem("userData", responseData.data.user_data);
  } catch (error) {
    console.log("error > ", error);
  }
}

export async function sendReview(body: {
  userId: string;
  description: string;
  rating: number;
}) {
  try {
    await fetch(`https://wg2bvjgjwg.us-east-2.awsapprunner.com/user/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {}
}
