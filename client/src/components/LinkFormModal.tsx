import { useState, type FormEvent } from 'react'
import Modal from './Modal'
import type { LinkItem, LinkPayload } from '../types'

interface LinkFormModalProps {
  mode: 'create' | 'edit'
  initial?: LinkItem
  onClose: () => void
  onSubmit: (payload: LinkPayload) => Promise<void>
}

export default function LinkFormModal({ mode, initial, onClose, onSubmit }: LinkFormModalProps) {
  const [siteName, setSiteName] = useState(initial?.site_name ?? '')
  const [linkUrl, setLinkUrl] = useState(initial?.link_url ?? '')
  const [info, setInfo] = useState(initial?.info ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({ site_name: siteName, link_url: linkUrl, info })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlab bo'lmadi")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={mode === 'create' ? 'Yangi loyiha qo\'shish' : "Loyihani tahrirlash"} onClose={onClose} width={480}>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span>Sayt nomi</span>
          <input
            autoFocus
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Masalan: QR Menu"
            required
          />
        </label>
        <label className="form__field">
          <span>Havola (URL)</span>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            required
          />
        </label>
        <label className="form__field">
          <span>Tavsif</span>
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Bu sayt nima ekanligi haqida qisqacha..."
            rows={4}
            required
          />
        </label>

        {error && <p className="form__error">{error}</p>}

        <div className="form__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Bekor qilish
          </button>
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? 'Saqlanmoqda…' : 'Saqlash'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
