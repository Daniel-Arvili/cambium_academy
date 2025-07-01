export type Category = {
  name: string;
  count: number;
};
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
export type RowData = { 
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
  highlights: string;
}
