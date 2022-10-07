export enum IMAGE_URL {
  IMAGE = "/image",
  IMAGE_ID = "/image/:id",
}

export class Image {
  id: string;
  image: string;
  name: string;
  link?: string;
  isBanner?: boolean;
}
