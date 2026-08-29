function sanitizeJsonString(str) {
  let result = '';
  let inString = false;
  let escapeNext = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (escapeNext) { result += char; escapeNext = false; continue; }
    if (char === '\\') { result += char; escapeNext = true; continue; }
    if (char === '"') { inString = !inString; result += char; continue; }
    if (inString && (char === '\n' || char === '\r' || char === '\t')) {
      result += char === '\n' ? '\\n' : char === '\r' ? '\\r' : '\\t';
      continue;
    }
    result += char;
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 4000,
        thinking: { type: 'disabled' },
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!data.content || !Array.isArray(data.content)) {
      return res.status(500).json({ error: data.error?.message || 'Unexpected API response' });
    }

    const raw = data.content.filter(b => b.type === 'text').map(b => b.text).join('');

    if (!raw) return res.status(500).json({ error: 'No text response from API' });

    const cleaned = raw
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();

    const sanitized = sanitizeJsonString(cleaned);

    let parsed;
    try {
      parsed = JSON.parse(sanitized);
    } catch (e) {
      const match = sanitized.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        return res.status(500).json({ error: 'Could not parse response as JSON' });
      }
    }

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
