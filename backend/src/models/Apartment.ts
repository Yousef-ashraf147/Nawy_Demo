export interface Apartment {
  id?: number;
  name: string;
  unitnumber: string;
  project: string;
  price: number;
  description: string;
  imageurl: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  date_posted?: string;
}
