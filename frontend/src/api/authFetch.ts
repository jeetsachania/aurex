import { toastInfo, toastError } from "../components/ToastNotification";

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token found");

  const response = await fetch("http://localhost:8000/users/refresh_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();
  localStorage.setItem("access_token", data.access_token);
  return data.access_token;
}

export async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  let token = localStorage.getItem("access_token");

  const headers = new Headers(init?.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    try {
      toastInfo("Refreshing access token...");
      token = await refreshAccessToken();

      headers.set("Authorization", `Bearer ${token}`);
      response = await fetch(input, { ...init, headers });
    } catch (err: any) {
      toastError("Session expired. Please log in again.");
      throw err;
    }
  }

  return response;
}

export async function postWithAuth(
  url: RequestInfo,
  body: any,
  init?: RequestInit,
): Promise<Response> {
  let token = localStorage.getItem("access_token");

  const headers = new Headers(init?.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const requestInit: RequestInit = {
    method: "POST",
    ...init,
    headers,
    body: JSON.stringify(body),
  };

  let response = await fetch(url, requestInit);

  if (response.status === 401) {
    try {
      toastInfo("Refreshing access token...");
      token = await refreshAccessToken();

      headers.set("Authorization", `Bearer ${token}`);
      response = await fetch(url, requestInit);
    } catch (err: any) {
      toastError("Session expired. Please log in again.");
      throw err;
    }
  }

  return response;
}
