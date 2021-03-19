export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export interface Comment {
  _v?: number;
  _id: string;
  comment: string;
  createdAt: string;
  id: string;
  post: string;
  user: UserInfo;
  }
export interface RecentCarousel {
  ratingsAverage: number;
  ratingsity?: number;
  images?: string[];
  _id: string;
  created: string;
  title: string;
  article: string;
  photo: string;
  author: UserInfo;
  slug: string;
  duration?: null;
  id: string;
}
export interface PageContent extends RecentCarousel {
  comments: Comment[];
}
export interface CardProps {
  _id: string;
  title: string;
  photo: string;
  article: string;
};
export interface CarouselItem {
  url: string;
  name?: string;
}
export interface Photo {
  id: number;
  url: string;
  title: string;
}
export interface StoreProps {
  screenSize: number;
  scrollY: number;
}
export interface UserInfo {
  email?: string;
  password?: string;
  name?: string;
  _id?: string;
  photo?: string;
}
export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export interface Post {
title: string;
article: string;
photo: string;
images: string[];
}