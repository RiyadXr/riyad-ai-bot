export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  role: Role;
  parts: { text: string }[];
  timestamp: string;
  imagePreview?: string;
}
