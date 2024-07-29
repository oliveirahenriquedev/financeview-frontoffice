import { GetStockResponse, TokenManager, UserFields } from "./helpers.ts";

type Stock = {
  ticker: string;
  id: string;
};

const tokenManager = new TokenManager();

export async function listStocks(): Promise<Stock[]> {
  const response = await fetch(
    "https://cxnv7rnab4.us-east-2.awsapprunner.com/stock",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  );
  const data = await response.json();
  return data;
}

export async function getStocksInfo(
  ticker: string,
  range: string
): Promise<GetStockResponse> {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/stock/${ticker}/${range}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  );

  return response.json();
}

export async function createUser(body: UserFields) {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: "cors",
    }
  );

  if (!response.ok) {
    return response.status;
  }

  return response.json();
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
  } catch (error) {
    console.error("Network error:", error);
  }
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
      body: JSON.stringify(body),
      mode: "cors",
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
      mode: "cors",
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
      mode: "cors",
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function favoriteStock(
  body: {
    user_id: number;
    stock_ticker: string;
  },
  method: "POST" | "DELETE",
  token: string | null
) {
  await fetch(`https://cxnv7rnab4.us-east-2.awsapprunner.com/user/favorites`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    mode: "cors",
  });
}

export async function listFavoriteStocks(userId: number, token: string | null) {
  const response = await fetch(
    `https://cxnv7rnab4.us-east-2.awsapprunner.com/user/favorites/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}
