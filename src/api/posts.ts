import { api } from './index';
import type { DataObj } from 'src/models/api';

export function all(params: PostsAllParams = {}) {
  const searchParams = new URLSearchParams();
  params.rubric_ids?.forEach(value => searchParams.append('rubric_ids[]', value));
  return api.mainKy.get<DataObj<PostsItem[]>>('posts', { searchParams }).json();
}

export function show(id: string) {
  return api.mainKy.get<DataObj<PostsShowItem>>(`posts/${id}`).json();
}

export function categories() {
  return api.mainKy.get<DataObj<PostCategory[]>>('rubrics').json();
}

export type PostsAllParams = {
  rubric_ids?: string[]
};

export interface PostsItem {
  id:            string;
  reading_time:  number;
  title:         string;
  preview_image: PostsImage;
  created_at:    string;
  rubrics:       PostCategory[];
}

export interface PostsImage {
  url: string;
}

export interface PostCategory {
  id: string,
  name: string;
}


export interface PostsShowItem {
  id:            string;
  reading_time:  number;
  title:         string;
  description:   string;
  banner_image:  PostsImage | null;
  images:        PostsImage[];
  created_at:    string;
}
