import { Category, CommonEntityFields } from '~/types'

export interface Attachment {
  _id: string
  fileName: string
  size: number
}

export interface Lesson extends CommonEntityFields {
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: Category | null
  author: string
}

export interface LessonData {
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: string | null
}

export interface UpdateLessonParams {
  id: Lesson['_id']
  title: Lesson['title']
  description: Lesson['description']
  content: Lesson['content']
  category: string | null
  attachments: Attachment[]
}
