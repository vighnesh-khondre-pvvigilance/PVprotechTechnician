const BASE_URL = "https://yourapi.com/api";

export async function submitVisitReport(payload: any) {
  const response = await fetch(`${BASE_URL}/visit-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function saveDraft(payload: any) {
  const response = await fetch(`${BASE_URL}/visit-draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}