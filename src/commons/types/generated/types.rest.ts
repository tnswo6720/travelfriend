

export interface Post {
  id: number;
  title: string;
  contents: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  youtubeUrl: string;
  mapLocation: string;
  votes: string;
  averageRating: number;
  password: string;
  fileUrls: string[];
  fileEntities: FileEntity[];
}

export interface  FileEntity {
  id: number;
  fileUrl: string;
  post: Post;
}

export interface  Role {
  name: string;
}

export interface  User {
  id: number;
  username: string;
  password: string;
  email: string;
  profileImageUrl: string;
  nickname: string;
  registrationDate: Date;
  introduction: string;
  dateOfBirth: Date;
  gender: string;
  salt: string;
  roles: Role[];
}

export interface  Comment {
  id: number;
  post: Post;
  content: string;
  author: string;
  createdAt: Date;
  rating: number;
}

export interface  UserRequest {
  username: string;
  password: string;
  email: string;
  profileImageUrl: string;
  nickname: string;
  dateOfBirth: Date;
  gender: string;
  introduction: string;
}
