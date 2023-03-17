export type DocumentAttached = {
  logotipo: string;
  banner: string;
  
  type: DocumentAttachedType;
};

export type DocumentAttachedType =
  | "BANNER"
  | "LOGOTIPO"
  
