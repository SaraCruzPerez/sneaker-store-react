declare module "*.css";

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";