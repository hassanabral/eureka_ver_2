import firebase from 'firebase/compat/app';

export interface Post {
  id: string;
  title: string;
  body: string;
  status: 'published' | 'draft';
  deleted: boolean;
  date: firebase.firestore.Timestamp;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  likeCount: number;
  commentCount: number;
  savedCount: number;
  hashtags?: string[];
  visibility?: string;
}

export interface Comment {
  id: string;
  commentBody: string;
  date: firebase.firestore.Timestamp;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  likeCount: number;
  commentCount: number;
}

export interface UserProfile {
  id?: string;
  displayName?: string;
  photoURL?: string;
  email?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  interests?: string;
  website?: string;
  githubUsername?: string;
  userStatus?: string;
  bio?: string;
  createdAt?: firebase.firestore.Timestamp;
  followings?: string[];
  followers?: string[];
}

export interface Tag {
  name: string;
  count: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
}

export interface FirebaseAuth {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  isLoaded: boolean;
  isEmpty: boolean;
}
