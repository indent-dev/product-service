export interface Category {
  name: string,
  isDeleted: boolean
}

export type CategoryRequest = Omit<Category, 'isDeleted'>
