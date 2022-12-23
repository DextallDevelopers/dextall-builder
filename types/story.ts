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

export interface iStories {
  stories: iStory[]
}

export interface iStory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  slug: string
  full_slug: string
  created_at: string
  first_published_at: string
  published_at: number
  name: string
  _uid: string
  id: number
  meta?: iMeta[]
}
