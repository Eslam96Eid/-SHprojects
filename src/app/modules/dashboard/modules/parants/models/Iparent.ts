export interface Iparent {
    id: number
    name: Iname
    email: string
    mobile: string
    surname: Isurname
    nationalityName: InationalityName
    childrenCount: number
  }
  
  export interface Iname {
    en: string
    ar: string
  }
  
  export interface Isurname {
    en: string
    ar: string
  }
  
  export interface InationalityName {
    en: string
    ar: string
  }
  