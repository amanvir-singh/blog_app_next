export interface UserType {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  export type PostType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string | null;
    published: boolean;
    viewCount: number;
    authorId: string;
    author: UserType;
  };