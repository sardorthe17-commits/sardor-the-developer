import type { LinkItem, TabId } from '../types'
import Welcome from './Welcome'
import ProjectDoc from './ProjectDoc'

interface EditorAreaProps {
  openTabs: TabId[]
  activeTab: TabId
  links: LinkItem[]
  isAdmin: boolean
  onSelectTab: (id: TabId) => void
  onCloseTab: (id: TabId) => void
  onEditLink: (link: LinkItem) => void
  onDeleteLink: (link: LinkItem) => void
}

function tabMeta(id: TabId, links: LinkItem[]) {
  if (id === 'welcome') return { label: 'README.md', kind: 'md' as const }
  const link = links.find((l) => l._id === id)
  return { label: link ? `${link.site_name}.link` : 'noma\u2019lum', kind: 'link' as const }
}

export default function EditorArea({
  openTabs,
  activeTab,
  links,
  isAdmin,
  onSelectTab,
  onCloseTab,
  onEditLink,
  onDeleteLink,
}: EditorAreaProps) {
  const activeLink = activeTab !== 'welcome' ? links.find((l) => l._id === activeTab) : undefined

  return (
    <main className="editor">
      <div className="editor__tabs" role="tablist">
        {openTabs.map((id) => {
          const meta = tabMeta(id, links)
          const active = id === activeTab
          return (
            <div
              key={id}
              role="tab"
              aria-selected={active}
              className={`editor__tab ${active ? 'is-active' : ''}`}
              onClick={() => onSelectTab(id)}
            >
              <span className="sidebar__file-icon" data-kind={meta.kind} />
              <span>{meta.label}</span>
              <button
                className="editor__tab-close"
                title="Yopish"
                onClick={(e) => {
                  e.stopPropagation()
                  onCloseTab(id)
                }}
              >
                ×
              </button>
            </div>
          )
        })}
      </div>

      <div className="editor__breadcrumb">
        sardor-the-developer {activeTab === 'welcome' ? '› README.md' : activeLink ? `› loyihalar › ${activeLink.site_name}.link` : ''}
      </div>

      <div className="editor__content">
        {activeTab === 'welcome' && <Welcome />}
        {activeLink && (
          <ProjectDoc
            link={activeLink}
            isAdmin={isAdmin}
            onEdit={() => onEditLink(activeLink)}
            onDelete={() => onDeleteLink(activeLink)}
          />
        )}
        {activeTab !== 'welcome' && !activeLink && (
          <div className="editor__missing">Bu fayl endi mavjud emas.</div>
        )}
      </div>
    </main>
  )
}
