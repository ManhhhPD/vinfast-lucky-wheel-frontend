import React from 'react'

export default function ResultModal({ prize, playerName, onClose }) {
  if (!prize) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <p className="modal-kicker">Chúc mừng {playerName || 'bạn'}!</p>
        <h2 className="modal-title">Bạn đã trúng</h2>
        <p className="modal-prize">{prize.name}</p>
        <p className="modal-note">Vui lòng liên hệ nhân viên VinFast để nhận phần thưởng.</p>
        <button type="button" className="primary-button" onClick={onClose}>
          Tiếp tục quay
        </button>
      </div>
    </div>
  )
}
