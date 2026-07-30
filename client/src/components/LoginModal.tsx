import { useState, type FormEvent } from 'react'
import Modal from './Modal'
import { useAuth } from '../context/AuthContext'

interface LoginModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const { login, isLoggingIn, loginError, clearLoginError } = useAuth()
  const [loginValue, setLoginValue] = useState('')
  const [parol, setParol] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    clearLoginError()
    const ok = await login(loginValue, parol)
    if (ok) onSuccess()
  }

  return (
    <Modal title="Admin sifatida kirish" onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span>Login</span>
          <input
            autoFocus
            type="text"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            required
          />
        </label>
        <label className="form__field">
          <span>Parol</span>
          <input
            type="password"
            value={parol}
            onChange={(e) => setParol(e.target.value)}
            required
          />
        </label>

        {loginError && <p className="form__error">{loginError}</p>}

        <div className="form__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Bekor qilish
          </button>
          <button type="submit" className="btn btn--primary" disabled={isLoggingIn}>
            {isLoggingIn ? 'Kirilmoqda…' : 'Kirish'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
