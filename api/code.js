export default async function handler(req, res) {
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/19F4B6w0CcJRoJDEcP8ZbF4nQqjlPjaZK18iz4NMKjiQ/gviz/tq?tqx=out:csv&sheet=code";
  
    try {
      const response = await fetch(SHEET_URL);
      const text = await response.text();
  
      // Transform CSV → array
      const lines = text.trim().split("\n");
  
      const codes = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");
        let code = cols[0] || "";
        code = code.replace(/^"|"$/g, "").trim();
        if (code) codes.push(code);
      }
  
      res.status(200).json({ codes });
    } catch (err) {
      res.status(500).json({ error: "Impossible de lire le Google Sheet", details: err });
    }
  }
  