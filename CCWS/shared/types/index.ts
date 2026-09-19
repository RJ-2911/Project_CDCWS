export type BoardVisibility = 'private' | 'public' | 'community'

export type ContentBlockType =
  | 'drawing'
  | 'shape'
  | 'sticky-note'
  | 'image'
  | 'document'
  | 'spreadsheet'
  | 'slide'

export interface BoardSummary {
  id: string
  title: string
  visibility: BoardVisibility
  ownerId: string
  updatedAt: string
}

export interface ContentBlock {
  id: string
  boardId: string
  type: ContentBlockType
  x: number
  y: number
  width: number
  height: number
  data: Record<string, unknown>
}
