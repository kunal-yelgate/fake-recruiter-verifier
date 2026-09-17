const API_BASE_URL =
  window.location.port === "8000" ? "" : "http://127.0.0.1:8000";

export async function verifyPosting(rawText) {
  const response = await fetch(`${API_BASE_URL}/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw_text: rawText }),
  });

  if (!response.ok) {
    let errorMsg = `Server error (${response.status})`;
    try {
      const errJson = await response.json();
      if (errJson.detail) errorMsg = errJson.detail;
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMsg);
  }

  return await response.json();
}
