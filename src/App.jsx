import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createSpin, fetchPrizes } from './api'
import Wheel from './components/Wheel'
import NameInput from './components/NameInput'
import ResultModal from './components/ResultModal'

const SPIN_DURATION_MS = 5200
const EXTRA_TURNS = 5

export default function App() {
  const [prizes, setPrizes] = useState([])
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const rotationRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    fetchPrizes()
      .then((data) => {
        if (!cancelled) setPrizes(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const canSpin = useMemo(() => name.trim().length > 0 && !spinning && prizes.length > 0, [name, spinning, prizes.length])

  const handleSpin = useCallback(async () => {
    if (!canSpin) return
    setSpinning(true)
    setError('')
    setResult(null)
    try {
      const data = await createSpin(name.trim(), phoneNumber.trim(), address.trim())
      const index = prizes.findIndex((prize) => prize.code === data.prize_code)
      if (index < 0) throw new Error('Không tìm thấy phần thưởng trên vòng quay')

      const segment = 360 / prizes.length
      // Pointer ở đỉnh vòng quay (góc 0), nên mục tiêu là giữa ô của phần thưởng trúng.
      const targetRotation = -(index * segment + segment / 2)
      const current = rotationRef.current
      const normalized = ((targetRotation - current) % 360 + 360) % 360
      const next = current + EXTRA_TURNS * 360 + normalized

      rotationRef.current = next
      setRotation(next)

      window.setTimeout(() => {
        setSpinning(false)
        setResult({ prize: { name: data.prize_name }, code: data.prize_code })
      }, SPIN_DURATION_MS)
    } catch (err) {
      setSpinning(false)
      setError(err.message)
    }
  }, [canSpin, name, phoneNumber, address, prizes])

  return (
    <div className="app">
      <div className="background" aria-hidden="true" />
      <header className="campaign">
        <h1 className="visually-hidden">Vinfast Hoàng Anh — Triệu gia đình tin chọn</h1>
        <img
          className="campaign-image"
          src={`${import.meta.env.BASE_URL}image/image3.png`}
          width="1584"
          height="672"
          alt="VinFast: Gần 1.500.000 xe máy điện xuất xưởng. Triệu gia đình tin chọn."
          fetchPriority="high"
          decoding="async"
        />
      </header>

      <main className="main" id="vong-quay">
        <div className="game-heading">
          <p className="section-kicker"><span /> TRI ÂN KHÁCH HÀNG <span /></p>
          <p className="store-name">Vinfast Hoàng Anh</p>
          <h2>VÒNG QUAY <span>MAY MẮN</span></h2>
          <p>Trao niềm tin, nhận ngàn quà tặng</p>
          <p className="campaign-deadline">Chương trình áp dụng đến hết ngày <time dateTime="2026-12-25">25/12/2026</time></p>
        </div>
        {loading && <p className="loading" role="status">Đang tải phần thưởng...</p>}
        {!loading && prizes.length === 0 && (
          <p className="error-text" role="alert">{error || 'Hiện chưa có phần thưởng. Vui lòng thử lại sau.'}</p>
        )}

        {prizes.length > 0 && (
          <div className="game-layout">
            <div className="wheel-stage">
              <span className="stage-spark spark-one" aria-hidden="true">✦</span>
              <span className="stage-spark spark-two" aria-hidden="true">✦</span>
              <Wheel prizes={prizes} rotation={rotation} spinning={spinning} />
              <div className="wheel-pedestal" aria-hidden="true" />
            </div>

            <div className="participation-card">
            <div className="controls">
              <p className="card-kicker">MỘT VÒNG QUAY · NGÀN NIỀM VUI</p>
              <h3>Quà may mắn đang chờ bạn!</h3>
              <p className="card-description">Nhập thông tin khách hàng và quay ngay để khám phá phần quà của bạn.</p>
              <NameInput value={name} onChange={setName} phoneNumber={phoneNumber} onPhoneChange={setPhoneNumber} address={address} onAddressChange={setAddress} disabled={spinning} onSubmit={handleSpin} />
              <button type="button" className="primary-button spin-button" disabled={!canSpin} onClick={handleSpin}>
                {spinning ? 'ĐANG QUAY...' : 'QUAY NGAY'}
              </button>
              {error && <p className="error-text">{error}</p>}
            </div>

            <section className="prize-list">
              <h4 className="prize-list-title">Những phần quà hấp dẫn</h4>
              <ul>
                {prizes.map((prize) => (
                  <li key={prize.code}>
                    <span className="prize-icon" aria-hidden="true">✦</span>
                    <span>{prize.name}</span>
                  </li>
                ))}
              </ul>
            </section>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">© {new Date().getFullYear()} Vinfast Hoàng Anh - Chương trình vòng quay may mắn</footer>

      <ResultModal prize={result?.prize} playerName={name.trim()} onClose={() => setResult(null)} />
    </div>
  )
}
