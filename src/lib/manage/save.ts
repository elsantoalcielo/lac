export type SaveResult = { kind: "saved"; version: number } | { kind: "conflict" } | { kind: "error"; text: string };

// PUTs a document to a versioned endpoint and turns the answer into something the page can show
export async function putDocument(url: string, data: unknown): Promise<SaveResult> {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (response.ok) {
      return { kind: "saved", version: (await response.json()).version };
    }
    if (response.status == 409) {
      return { kind: "conflict" };
    }
    return { kind: "error", text: "No s'ha pogut desar. Torna-ho a provar." };
  } catch {
    return { kind: "error", text: "No hi ha connexió. Torna-ho a provar." };
  }
}
