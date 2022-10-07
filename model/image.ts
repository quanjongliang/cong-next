export enum IMAGE_URL {
  IMAGE = "/image",
}

export class Image {
  id: string;
  image: string;
  name: string;
  link?: string;
  isBanner?: boolean;
}
