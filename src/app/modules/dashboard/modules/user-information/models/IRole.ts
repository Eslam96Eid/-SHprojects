export interface IRole {
    id: number
    name: string
    scope: string
    ownerId: any
    roleClaims: IRoleClaim[]
    createdDate: string
    updatedDate: any
  }
  
  export interface IRoleClaim {
    id: number
    title: string
    type: string
  }