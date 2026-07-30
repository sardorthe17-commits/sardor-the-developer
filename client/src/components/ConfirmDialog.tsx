import { useState } from 'react'
import Modal from './Modal'

interface ConfirmDialogProps {
  siteName: string
  onCancel: () => void
  onConfirm: () => Promise<void>
}

export default function ConfirmDialog({ siteName, onCancel, onConfirm }: ConfirmDialogProps) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm() {
    setDeleting(true)
    setError(null)
    try {
      await onConfirm()
    } catch (err) {
      setError(err instanceof Error ? err.message : "O'chirib bo'lmadi")
      setDeleting(false)
    }
  }

  return (
    <Modal title="O'chirishni tasdiqlang" onClose={onCancel} width={380}>
      <p className="form__confirm-text">
        <strong>{siteName}</strong> loyihasini o'chirmoqchimisiz? Bu amalni ortga qaytarib
        bo'lmaydi.
      </p>
      {error && <p className="form__error">{error}</p>}
      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Bekor qilish
        </button>
        <button type="button" className="btn btn--danger" onClick={handleConfirm} disabled={deleting}>
          {deleting ? "O'chirilmoqda…" : "O'chirish"}
        </button>
      </div>
    </Modal>
  )
}
