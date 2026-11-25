import React from 'react'

export default function NameInput({ value, onChange, phoneNumber, onPhoneChange, address, onAddressChange, disabled, onSubmit }) {
  return (
    <form
      className="name-form"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <label className="name-label" htmlFor="player-name">
        Nhập tên của bạn
      </label>
      <input
        id="player-name"
        className="name-input"
        type="text"
        maxLength={100}
        value={value}
        disabled={disabled}
        placeholder="Ví dụ: Nguyễn Văn A"
        onChange={(event) => onChange(event.target.value)}
      />
      <label className="name-label" htmlFor="player-phone">Số điện thoại</label>
      <input
        id="player-phone"
        className="name-input"
        type="tel"
        autoComplete="tel"
        maxLength={30}
        value={phoneNumber}
        disabled={disabled}
        placeholder="Nhập số điện thoại"
        onChange={(event) => onPhoneChange(event.target.value)}
      />
      <label className="name-label" htmlFor="player-address">Địa chỉ</label>
      <input
        id="player-address"
        className="name-input"
        type="text"
        autoComplete="street-address"
        maxLength={500}
        value={address}
        disabled={disabled}
        placeholder="Nhập địa chỉ của bạn"
        onChange={(event) => onAddressChange(event.target.value)}
      />
    </form>
  )
}
