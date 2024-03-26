export type User = {
  id: number | null
  userName: string
  email: string
  role: string
  rights: string
  organizationId: number | null
}

export type UserInfo = {
  user: User
}

export const STATUS_TEXT = "OK" // create enum if there's more status code 

export type Organization = {
  createdAt: string;
  updatedAt: string;
  organizationName: string;
  id: number;
}

export type Document = {
  Organization: Organization;
  createdAt: string;
  documentName: string;
  id: number;
  organizationId: number;
  updatedAt: string;
}

export type Children = {
  children: JSX.Element | JSX.Element[]
}

export type AuthContextType = {
  userInfo?: User;
  setUserInfo: (User: User | undefined) => void;
}