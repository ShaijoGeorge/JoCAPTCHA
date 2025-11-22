export const BASE_URL = "http://127.0.0.1:8000";

export async function generateChallenge() {
  const res = await fetch(`${BASE_URL}/challenge/generate`);
  return await res.json();
}

export async function verifyChallenge(body) {
  const res = await fetch(`${BASE_URL}/challenge/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
}