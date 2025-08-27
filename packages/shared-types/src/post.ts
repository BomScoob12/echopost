export interface Post {
  id: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  authorId: string;
  createdAt: Date;
}
