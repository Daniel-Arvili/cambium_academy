import { cache } from "react"
// Types
export type Category = {
  id: string
  name: string
  slug: string
  count: number
  icon: string
}
export type Video = {
  id: string;
  date: string;
  title: string;
  description: string;
  person_name: string;
  video_id: string;
  slide_url_1: string;
  slide_url_2: string;
  category: string;
  hashtags: string;
  image: string;
}
// added from the exist project
export type RowData = { 
  id: string;
  date: string;
  // title	description	person_name	video_id	slide_url_1	slide_url_2	category	hashtags	image	highlights
  title: string;
  description: string;
  person_name: string;
  video_id: string;
  slide_url_1: string;
  slide_url_2: string;
  category: string;
  hashtags: string;
  image: string;
  highlights: string;
}
//////
