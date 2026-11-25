const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function fetchPrizes() {
  const response = await fetch(`${API_BASE}/api/prizes`)
  if (!response.ok) throw new Error('Không tải được danh sách phần thưởng')
  return response.json()
}

export async function createSpin(playerName, phoneNumber, address) {
  const response = await fetch(`${API_BASE}/api/spins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player_name: playerName, phone_number: phoneNumber, address }),
  })
  if (!response.ok) {
    let detail = 'Không thể quay thưởng lúc này'
    try {
      const data = await response.json()
      if (Array.isArray(data.detail)) detail = data.detail[0]?.msg || detail
      else if (data.detail) detail = data.detail
    } catch {
      /* giữ message mặc định */
    }
    throw new Error(detail)
  }
  return response.json()
}
