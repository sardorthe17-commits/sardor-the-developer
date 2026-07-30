import { useCallback, useEffect, useState } from 'react'
import TitleBar from './components/TitleBar'
import ActivityBar from './components/ActivityBar'
import Sidebar from './components/Sidebar'
import EditorArea from './components/EditorArea'
import StatusBar from './components/StatusBar'
import LoginModal from './components/LoginModal'
import LinkFormModal from './components/LinkFormModal'
import ConfirmDialog from './components/ConfirmDialog'
import { useAuth } from './context/AuthContext'
import { createLink, deleteLink, fetchLinks, updateLink } from './api/client'
import type { LinkItem, LinkPayload, TabId } from './types'

type LinkFormState = { mode: 'create' } | { mode: 'edit'; link: LinkItem } | null

export default function App() {
  const { isAdmin } = useAuth()

  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [openTabs, setOpenTabs] = useState<TabId[]>(['welcome'])
  const [activeTab, setActiveTab] = useState<TabId>('welcome')

  const [loginOpen, setLoginOpen] = useState(false)
  const [linkForm, setLinkForm] = useState<LinkFormState>(null)
  const [deleteTarget, setDeleteTarget] = useState<LinkItem | null>(null)

  const loadLinks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLinks()
      setLinks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Loyihalarni yuklab bo'lmadi")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLinks()
  }, [loadLinks])

  function openTab(id: TabId) {
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]))
    setActiveTab(id)
  }

  function closeTab(id: TabId) {
    if (id === 'welcome') return
    setOpenTabs((tabs) => {
      const next = tabs.filter((t) => t !== id)
      if (activeTab === id) {
        setActiveTab(next[next.length - 1] ?? 'welcome')
      }
      return next
    })
  }

  async function handleCreate(payload: LinkPayload) {
    await createLink(payload)
    await loadLinks()
    setLinkForm(null)
  }

  async function handleUpdate(id: string, payload: LinkPayload) {
    await updateLink(id, payload)
    await loadLinks()
    setLinkForm(null)
  }

  async function handleDelete(link: LinkItem) {
    await deleteLink(link._id)
    closeTab(link._id)
    await loadLinks()
    setDeleteTarget(null)
  }

  return (
    <div className="app">
      <TitleBar />
      <div className="app__body">
        <ActivityBar onOpenLogin={() => setLoginOpen(true)} />
        <Sidebar
          links={links}
          loading={loading}
          error={error}
          isAdmin={isAdmin}
          openTabs={openTabs}
          activeTab={activeTab}
          onOpenTab={openTab}
          onCloseTab={closeTab}
          onAddClick={() => setLinkForm({ mode: 'create' })}
          onEditClick={(link) => setLinkForm({ mode: 'edit', link })}
          onDeleteClick={(link) => setDeleteTarget(link)}
        />
        <EditorArea
          openTabs={openTabs}
          activeTab={activeTab}
          links={links}
          isAdmin={isAdmin}
          onSelectTab={setActiveTab}
          onCloseTab={closeTab}
          onEditLink={(link) => setLinkForm({ mode: 'edit', link })}
          onDeleteLink={(link) => setDeleteTarget(link)}
        />
      </div>
      <StatusBar linkCount={links.length} />

      {loginOpen && (
        <LoginModal onClose={() => setLoginOpen(false)} onSuccess={() => setLoginOpen(false)} />
      )}

      {linkForm && (
        <LinkFormModal
          mode={linkForm.mode}
          initial={linkForm.mode === 'edit' ? linkForm.link : undefined}
          onClose={() => setLinkForm(null)}
          onSubmit={(payload) =>
            linkForm.mode === 'create' ? handleCreate(payload) : handleUpdate(linkForm.link._id, payload)
          }
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          siteName={deleteTarget.site_name}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget)}
        />
      )}
    </div>
  )
}
