export type Video = {
  id: number
  title: string
  description: string
  mp4: string
  seen: boolean
  slug: string
  thumbnail: {
    url: string
  }
  tags: string[]
  platform: string[]
}
