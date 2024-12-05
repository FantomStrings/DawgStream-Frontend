export interface IBook {
    id: number
    isbn13: number,
    title: string,
    authors: string,
    publication_year: number,
    rating_count: number,
    rating_1_star: number,
    rating_2_star: number,
    rating_3_star: number,
    rating_4_star: number,
    rating_5_star: number,
    rating_avg: number,
    image_small_url: string,
    image_url: string,
  }