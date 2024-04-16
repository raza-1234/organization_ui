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

export type DocumentAssetType = {
  Document: Document;
  Organization: Organization;
  createdAt: string;
  date: string;
  documentId: string;
  id: string;
  organizationId: number;
  title: string;
  type: string;
  updatedAt: string; 
  url: string;
}

export enum AssetMedia {
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video"
}

export type Children = {
  children: JSX.Element | JSX.Element[]
}

export type AuthContextType = {
  userInfo?: User;
  setUserInfo: (User: User | undefined) => void;
}

export enum ButtonText {
  LogIn = "log in",
  Next = "next"
}

export const API_FAILS = "Something went wrong. Please try again.";

export type PayloadType = {
  id: number;
  value: string
}

export type ColumnType = {
  header: string,
  key: string,
  field?: string,
  className?: string,
  render?: (value?: any, item?: any) => any;
  width?: string;
  sort?: boolean;
}

export type AssetPagination = {
  currentDataCount?: number;
  nextPage?: number;
  start?: number;
  totalCount?: number;
}

export type AssetsType = {
  documentAsset: DocumentAssetType[];
  pagination: AssetPagination
}