const BACKEND = import.meta.env.VITE_BACKEND;

export async function executeCode(code, stdInput, language) {
  const codeResponse = await fetch(`${BACKEND}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      stdin: stdInput,
      language,
    }),
  });
  const submissionData = await codeResponse.json();
  return submissionData;
}

export async function submitEntry(username, language, code, stdInput, output) {
  const res = await fetch(`${BACKEND}/new`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username,
      language,
      source_code: code,
      input: stdInput,
      output,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    return { ok: false };
  }
  return { ...data, ok: true };
}
