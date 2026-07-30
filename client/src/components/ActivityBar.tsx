import { useAuth } from '../context/AuthContext'

interface ActivityBarProps {
  onOpenLogin: () => void
}

// VS Code'dagi eng chapdagi tor ikonkalar paneli.
// Faqat "Explorer" (doim faol) va "Admin" (login/logout) ishlaydi,
// qolganlari asl VS Code kabi ko'rinish uchun turadi, lekin bosilmaydi.
export default function ActivityBar({ onOpenLogin }: ActivityBarProps) {
  const { isAdmin, logout } = useAuth()

  return (
    <div className="activity-bar">
      <div className="activity-bar__group">
        <button className="activity-bar__icon activity-bar__icon--active" title="Explorer" aria-current="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path
              fill="currentColor"
              d="M4 3.5h9.5L18 8v12.5H4V3.5zm9 1.2v3.8h3.8L13 4.7zM5.5 5v14h11V9.8h-5V5H5.5z"
            />
          </svg>
        </button>
        <button className="activity-bar__icon activity-bar__icon--disabled" title="Qidiruv (tez orada)" disabled>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M10 4a6 6 0 0 1 4.7 9.7l4.8 4.8-1.4 1.4-4.8-4.8A6 6 0 1 1 10 4zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
            />
          </svg>
        </button>
        <button className="activity-bar__icon activity-bar__icon--disabled" title="Manba nazorati (tez orada)" disabled>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M7 3a2.5 2.5 0 1 1-1 4.8v8.4a2.5 2.5 0 1 1-1 0V7.8A2.5 2.5 0 0 1 7 3zm10 4a2.5 2.5 0 1 1-1 4.8 5 5 0 0 1-4.5 4.7 2.5 2.5 0 1 1 .1-1c1.8-.3 3.2-1.7 3.4-3.5A2.5 2.5 0 0 1 17 7z"
            />
          </svg>
        </button>
      </div>

      <div className="activity-bar__spacer" />

      <div className="activity-bar__group">
        <button
          className={`activity-bar__icon ${isAdmin ? 'activity-bar__icon--active' : ''}`}
          title={isAdmin ? 'Admin sifatida kirdingiz — chiqish uchun bosing' : 'Admin sifatida kirish'}
          onClick={isAdmin ? logout : onOpenLogin}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z"
            />
          </svg>
        </button>
        <button className="activity-bar__icon activity-bar__icon--disabled" title="Sozlamalar (tez orada)" disabled>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.7 7.7 0 0 0-1.7-1L15 3h-4l-.3 2.5a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1 .7 1.7 1L11 21h4l.3-2.5c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.6zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
