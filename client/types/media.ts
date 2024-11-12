import type { IPagination } from "./pagination";
import type { IQueryMedia } from "./query";

export interface IMedia {
  id: number;
  index: number
  name: string;
  description: string;
  previewUrl: string;
  mimeType: string;
  size: string;
  author: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    avatarUrl: string;
  };
  movieUrl: string;
  pathUrl: string;
  createdAtAgo: string;
  updatedAtAgo: string;
  selected?: boolean;
}

export interface IMovieForm {
  name: string;
  mediaUrl: string;
  type: string;
}

export interface IMediaResponse {
  media: IMedia[]
  pagination: IPagination
  fileTypes: string[] | never[]
  months: string[] | never[]
  queryParams: IQueryMedia
}