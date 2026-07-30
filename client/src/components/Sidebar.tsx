import { useMemo, useState } from 'react'
import type { LinkItem, TabId } from '../types'

interface SidebarProps {
  links: LinkItem[]
  loading: boolean
  error: string | null
  isAdmin: boolean
  openTabs: TabId[]
  activeTab: TabId
  onOpenTab: (id: TabId) => void
  onCloseTab: (id: TabId) => void
  onAddClick: () => void
  onEditClick: (link: LinkItem) => void
  onDeleteClick: (link: LinkItem) => void
}

function tabLabel(id: TabId, links: LinkItem[]) {
  if (id === 'welcome') return 'README.md'
  const link = links.find((l) => l._id === id)
  return link ? `${link.site_name}.link` : id
}

export default function Sidebar({
  links,
  loading,
  error,
  isAdmin,
  openTabs,
  activeTab,
  onOpenTab,
  onCloseTab,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: SidebarProps) {
  const [query, setQuery] = useState('')
  const [projectsExpanded, setProjectsExpanded] = useState(true)

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return links
    return links.filter((l) => l.site_name.toLowerCase().includes(q))
  }, [links, query])

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span>Explorer</span>
      </div>

      {openTabs.length > 0 && (
        <section className="sidebar__section">
          <div className="sidebar__section-title">Open Editors</div>
          <ul className="sidebar__list">
            {openTabs.map((id) => (
              <li
                key={id}
                className={`sidebar__editor-row ${id === activeTab ? 'is-active' : ''}`}
                onClick={() => onOpenTab(id)}
              >
                <span className="sidebar__file-icon" data-kind={id === 'welcome' ? 'md' : 'link'} />
                <span className="sidebar__row-label">{tabLabel(id, links)}</span>
                <button
                  className="sidebar__row-close"
                  title="Yopish"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCloseTab(id)
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="sidebar__section sidebar__section--grow">
        <div className="sidebar__section-title">sardor-the-developer</div>

        <ul className="sidebar__list">
          <li
            className={`sidebar__row ${activeTab === 'welcome' ? 'is-active' : ''}`}
            onClick={() => onOpenTab('welcome')}
          >
            <span className="sidebar__file-icon" data-kind="md" />
            <span className="sidebar__row-label">README.md</span>
          </li>
        </ul>

        <div
          className="sidebar__folder-row"
          onClick={() => setProjectsExpanded((v) => !v)}
        >
          <span className={`sidebar__chevron ${projectsExpanded ? 'is-open' : ''}`}>▸</span>
          <span className="sidebar__folder-icon" />
          <span className="sidebar__row-label sidebar__row-label--folder">loyihalar</span>
          {isAdmin && (
            <button
              className="sidebar__add-btn"
              title="Yangi loyiha qo'shish"
              onClick={(e) => {
                e.stopPropagation()
                onAddClick()
              }}
            >
              +
            </button>
          )}
        </div>

        {projectsExpanded && (
          <div className="sidebar__folder-content">
            <div className="sidebar__search">
              <input
                type="text"
                placeholder="Loyiha qidirish..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {loading && <div className="sidebar__hint">Yuklanmoqda…</div>}
            {error && !loading && <div className="sidebar__hint sidebar__hint--error">{error}</div>}
            {!loading && !error && filteredLinks.length === 0 && (
              <div className="sidebar__hint">
                {links.length === 0 ? "Hali loyiha qo'shilmagan" : 'Hech narsa topilmadi'}
              </div>
            )}

            <ul className="sidebar__list">
              {filteredLinks.map((link) => (
                <li
                  key={link._id}
                  className={`sidebar__row sidebar__row--nested ${
                    activeTab === link._id ? 'is-active' : ''
                  }`}
                  onClick={() => onOpenTab(link._id)}
                >
                  <span className="sidebar__file-icon" data-kind="link" />
                  <span className="sidebar__row-label">{link.site_name}.link</span>
                  {isAdmin && (
                    <span className="sidebar__row-actions">
                      <button
                        title="Tahrirlash"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditClick(link)
                        }}
                      >
                        ✎
                      </button>
                      <button
                        title="O'chirish"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteClick(link)
                        }}
                      >
                        🗑
                      </button>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </aside>
  )
}
