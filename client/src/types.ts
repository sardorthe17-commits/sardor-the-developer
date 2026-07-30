export interface LinkItem {
  _id: string
  site_name: string
  link_url: string
  info: string
  createdAt?: string
  updatedAt?: string
}

export interface LinkPayload {
  site_name: string
  link_url: string
  info: string
}

// "welcome" — doimiy ochiq bo'lgan bosh sahifa (rezyume) tabi.
// Boshqa har qanday qiymat — Links hujjatining _id si.
export type TabId = 'welcome' | string
