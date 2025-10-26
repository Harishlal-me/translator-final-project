// Proxy the Next.js API route to the local Python translation backend
// This keeps the frontend calls to `/api/translate` working while the
// Python service runs separately on localhost:5000.

const PY_BACKEND = process.env.PY_BACKEND_URL || 'http://127.0.0.1:5000'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Map incoming body fields to backend expected shape if needed
    // Accept both { text, sourceLang, targetLang } and { q, source, target }
    const payload: any = {}
    if (body.text !== undefined) payload.q = body.text
    if (body.sourceLang !== undefined) payload.source = body.sourceLang
    if (body.targetLang !== undefined) payload.target = body.targetLang
    // fallback to direct pass-through
    if (!payload.q && body.q) payload.q = body.q
    if (!payload.source && body.source) payload.source = body.source
  if (!payload.target && body.target) payload.target = body.target

  // Normalize common language codes: map generic 'zh' to 'zh-CN' which the
  // Python translator accepts (Deep Translator expects more specific zh-CN/zh-TW).
  if (payload.target === 'zh') payload.target = 'zh-CN'

    const res = await fetch(`${PY_BACKEND}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({ error: 'Invalid response from backend' }))

    // If the Python backend returned the expected shape, forward it directly
    return new Response(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error('Proxy translation error:', error)
    return new Response(JSON.stringify({ error: 'Translation failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
