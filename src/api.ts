import { GetStockResponse, TokenManager, UserFields } from "./helpers.ts";

type Stock = {
  ticker: string;
  id: string;
};

const tokenManager = new TokenManager();

export async function listStocks(): Promise<Stock[]> {
  const response = await fetch(
    "https://cxnv7rnab4.us-east-2.awsapprunner.com/stock"
  );
  const data = await response.json();
  return data;
}

export async function getStocksInfo(ticker: string): Promise<GetStockResponse> {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/stock/${ticker}`
  );
  return response.json();
}

export async function createUser(body: UserFields) {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Adiciona o header para JSON
      },
      body: JSON.stringify(body), // Converte o corpo para JSON
      mode: "cors", // Define o modo como 'cors'
    }
  );

  if (!response.ok) {
    return response.status;
  }

  // Converte a resposta em JSON
  return response;
}

export async function getUser(body: { username: string; password: string }) {
  try {
    const formBody = new URLSearchParams();
    formBody.append("username", body.username);
    formBody.append("password", body.password);

    const response = await fetch(
      `https://cxnv7rnab4.us-east-2.awsapprunner.com/user/login`,
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
    tokenManager.setCurrentToken(responseData.access_token);
  } catch (error) {}
}

export async function sendReview(
  body: {
    user_id: number;
    description: string;
    rating: number;
  },
  token: string | null
) {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/user/feedback`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body, token: undefined }),
    }
  );

  if (!response.ok) {
    return response.status;
  }
}

export async function putUserInfo(
  userId: string,
  body: {
    name: string;
    email: string;
    url_image: string | ArrayBuffer | null;
  },
  token: string | null
) {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/user/update/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    return response.status;
  }

  const responseData = await response.json();
  tokenManager.setCurrentToken(responseData.access_token);
}

export async function getUserImage(userId: string, token: string | null) {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/user/image/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
