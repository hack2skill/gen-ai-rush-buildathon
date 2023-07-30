export interface PostModel {
  uuid: string;
  caption: string;
  imageUrl?: string;
  mode: "SCHEDULED" | "PUBLISHED" | "DRAFT";
  schedule?: string;
  apps: string[];
}
