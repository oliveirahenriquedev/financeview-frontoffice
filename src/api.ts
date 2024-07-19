import { GetStockResponse, UserFields } from "./helpers";

type Stock = {
  ticker: string;
  id: string;
};

export async function listStocks(): Promise<Stock[]> {
  const response = await fetch(
    "https://gnxfpkdmjq.us-east-2.awsapprunner.com/stock",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    }
  );
  const data = await response.json(); // Converte a resposta em JSON
  console.log(data);
  return data; // Retorna os dados convertidos
}

export async function getStocksInfo(ticker: string): Promise<GetStockResponse> {
  const response = await fetch(
    `https://gnxfpkdmjq.us-east-2.awsapprunner.com/stock/${ticker}`
  );
  return response.json();
}

{
  /* export async function createUser(body: UserFields) {
  try {
    const response = await fetch(
      `https://gnxfpkdmjq.us-east-2.awsapprunner.com/user/register`,
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
}*/
}
