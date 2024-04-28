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

export type DocumentAsset = {
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

export type AuthUserContext = {
  userInfo?: User;
  setUserInfo: (User?: User) => void;
}

export enum ButtonText {
  LogIn = "log in",
  Next = "next"
}

export type Payload = {
  id: number,
  value: string
}

export type Column = {
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

export type AssetsPayload = {
  documentAssets: DocumentAsset[];
  pagingInfo: AssetPagination
}

export type ToastInfo = {
  variant: string;
  message: string;
  timeOut?: number;
}

export type ToastContext = {
  toastHandler: (message: string, variant: string, timeOut?: number ) =>  void
}

export type FetchDocuments = {
  data?: Document[]; 
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

export type CheckEmail = {
  message: string
}

export const PAGE_COUNT = 5;
export const USER = 'user'