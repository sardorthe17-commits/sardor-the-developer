import type { LinkItem } from '../types'

interface ProjectDocProps {
  link: LinkItem
  isAdmin: boolean
  onEdit: () => void
  onDelete: () => void
}

export default function ProjectDoc({ link, isAdmin, onEdit, onDelete }: ProjectDocProps) {
  return (
    <article className="doc">
      <header className="doc__project-header">
        <div>
          <p className="doc__eyebrow">loyihalar / {link.site_name}.link</p>
          <h1 className="doc__title">{link.site_name}</h1>
        </div>
        {isAdmin && (
          <div className="doc__project-actions">
            <button className="btn btn--ghost" onClick={onEdit}>
              ✎ Tahrirlash
            </button>
            <button className="btn btn--danger-ghost" onClick={onDelete}>
              🗑 O'chirish
            </button>
          </div>
        )}
      </header>

      <p className="doc__lead">{link.info}</p>

      <h2>Havola</h2>
      <div className="doc__url-box">
        <code>{link.link_url}</code>
      </div>
      <a className="btn btn--primary" href={link.link_url} target="_blank" rel="noopener noreferrer">
        Saytga o'tish ↗
      </a>
    </article>
  )
}
