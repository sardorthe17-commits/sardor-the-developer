import { useAuth } from '../context/AuthContext'

interface StatusBarProps {
  linkCount: number
}

export default function StatusBar({ linkCount }: StatusBarProps) {
  const { isAdmin, logout } = useAuth()

  return (
    <footer className="status-bar">
      <div className="status-bar__group">
        <span>⎇ main</span>
        <span>{linkCount} ta loyiha</span>
      </div>
      <div className="status-bar__group">
        <a href="https://github.com/sardorthe17-commits" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {isAdmin && (
          <button className="status-bar__logout" onClick={logout}>
            Admin sifatida — chiqish
          </button>
        )}
      </div>
    </footer>
  )
}
