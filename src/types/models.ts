export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  sizes: (string | number)[];
  images: {
    main: string[];
    thumbs: string[];
  };
}

export interface CartItem extends Product {
  size: string | number;
  quantity: number;
  finalPrice: number;
  image: string;
}

export interface UserData {
  id?: string | number;
  name: string;
  email: string;
  avatar?: string;
}

export type NotificationAction = "add" | "remove" | "error";

export interface NotificationData {
  message: string;
  action: NotificationAction;
}

export interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface PaymentErrors {
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
}

export interface ShippingData {
  name: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

export interface ShippingErrors {
  name?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  zip?: string;
}

export interface Store {
  id: number;
  city: string;
  name: string;
  coords: [number, number]; 
  address: string;
}