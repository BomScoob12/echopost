export interface Post {
  _id: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  authorId: string;
  createdAt: Date;
}
