import { api } from './index';
import { DataObj } from 'src/models/api';

export function all(params: Partial<DirectionAllParams> = {}) {
  return api.mainKy.get<DirectionListRes>('directions', { searchParams: params }).json();
}

export function show(id: string) {
  return api.mainKy.get<DirectionRes>(`directions/${id}`).json();
}

export function showSubgroup(id: string, params: Partial<SubgroupParams>) {
  return api.mainKy.get<SubgroupRes>(`directions/${id}/subgroup`, { searchParams: params }).json();
}

export function showOffers(id: string, params: Partial<ShowOffersParams>) {
  return api.mainKy.get<ShowOffersRes>(`directions/${id}/offers`, { searchParams: params }).json();
}

export function search(params: Partial<DirectionSearchParams> = {}) {
  return api.mainKy.get<DirectionSearchRes>('direction-search', { searchParams: params }).json();
}

export function favorites(params: DirectionFavParams) {
  const searchParams = new URLSearchParams();
  params.uuids.forEach(value => searchParams.append('uuids[]', value));
  return api.mainKy.get<DataObj<DirectionFavItem[]>>('direction-favorites', { searchParams }).json();
}

export type ShowOffersRes = { data: ShowOfferItem[] }

export interface ShowOfferItem {
  id:              string;
  start_date:      string;
  end_date:        string;
  prepay:          string;
  price:           string;
  prepay_children: string;
  price_children:  string;
  operator:        string;
  description:     string;
  is_weekend:      boolean;
}

export interface ShowOffersParams {
  date: string,
  days_count: string,
}

export interface SubgroupItem {
  id:               string;
  background:       { url: string };
  name:             string;
  title:            string;
  video_url:        null;
  description:      string;
  comfort_level:    number;
  difficulty_level: number;
  priority:         number;
  is_featured:      boolean;
  max_members:      number;
  min_date:         number;
  offers_min_price: string;
  offers_max_end_date: string;
  offers_min_start_date: string;
}

export interface SubgroupRes {
  data:  SubgroupItem[];
}

export type DirectionRes = { data: DirectionItem };

export interface DirectionItem {
  id:               string;
  background:       { url: string };
  name:             string;
  title:            string;
  video_url:        null;
  description:      string;
  comfort_level:    number;
  difficulty_level: number;
  priority:         number;
  is_featured:      boolean;
  max_members:      number;
  preview_stories:  any[];
  services:         Service[];
  location:         AdditionalInfo | null;
  additional_info:  AdditionalInfo | null;
  questions:        Question[];
  dates:            Dates;
  rating:           null;
  hotels:           Hotel[];
  roads:            RouteItem[];
}

export interface RouteItem {
  day: number,
  description: string,
  id: string,
  images: Background[],
  title: string,
}

export interface AdditionalInfo {
  id:   string;
  name: string;
}

export interface Background {
  url: string;
}

export type Dates = Record<string, string[]>;

export interface Hotel {
  description:  string;
  images:       Background[];
  name:         string;
  rating:       string;
  local_rating: number;
  location:     null;
}

export interface Question {
  id:       string;
  question: string;
  answer:   string;
}

export interface Service {
  id:          string;
  description: string;
  type:        string;
  slider:      Background[];
}

export type DirectionListRes = { data: DirectionListItem[] };

export interface DirectionListItem {
  id:               string;
  background:       Background | null;
  name:             string;
  title:            string;
  video_url:        string;
  description:      string;
  comfort_level:    number;
  difficulty_level: number;
  priority:         number;
  is_featured:      boolean;
  max_members:      number;
  offers_min_price: string;
  min_date:         number;
  offers_min_start_date: string;
  offers_max_end_date:   string;
}

export type DirectionFavItem = DirectionListItem & { parent_id: string | null };

export type DirectionAllParams = {
  search: string,
  date_from: string,
  date_to: string,
  price_from: string,
  price_to: string,
  days_count_from: number,
  days_count_to: number,
  is_weekend: boolean,
}

export type DirectionFavParams = { uuids: string[] };

export type DirectionSearchParams = {
  search: string,
  date_from: string,
  date_to: string,
}

export type SubgroupParams = DirectionSearchParams & {
  sort_by: 'popularity' | 'fresh' | 'nearest' | 'decreasing_price' | 'increasing_price',
};

export interface DirectionSearchItem {
  id: string,
  name: string,
  background: Background | null,
  children_count: number,
}

export type DirectionSearchRes = { data: DirectionSearchItem[] };
