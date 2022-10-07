export class Category{
    id:string
    createdAt:Date
    updatedAt:Date
    isDeleted:boolean
    name:string
    content:string
    slug:string
    parentId?:string
}

export enum CATEGORY_API{
    CATEGORY='/category',
}