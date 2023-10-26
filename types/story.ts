export interface iBlokBody {
  _uid: string
  component: string
  [any: string]: any
}

export interface iMeta {
  title: string
  description?: string
  image?: {
    _uid: string
    filename: string
  }
}
export interface iImage {
  image: {
    _uid: string
    filename: string
  }
}

export interface iStory {
  content: any
  slug: string
  full_slug: string
  created_at: string
  first_published_at: string
  published_at: string
  name: string
  _uid?: string
  uuid: string
  id: number
  meta?: iMeta[]
}

export interface iStories {
  stories: iStory[]
}
