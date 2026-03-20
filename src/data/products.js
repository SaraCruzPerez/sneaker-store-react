/* ------ I M P O R T S - I M A G E S ------ */

// Product 1
import p1_1 from '../assets/images/products/product1/p1_1.webp';
import p1_1_th from '../assets/images/products/product1/p1_1_th.webp';
import p1_2 from '../assets/images/products/product1/p1_2.webp';
import p1_2_th from '../assets/images/products/product1/p1_2_th.webp';
import p1_3 from '../assets/images/products/product1/p1_3.webp';
import p1_3_th from '../assets/images/products/product1/p1_3_th.webp';
import p1_4 from '../assets/images/products/product1/p1_4.webp';
import p1_4_th from '../assets/images/products/product1/p1_4_th.webp';

// Product 2 
import p2_1 from '../assets/images/products/product2/p2_1.webp';
import p2_1_th from '../assets/images/products/product2/p2_1_th.webp';
import p2_2 from '../assets/images/products/product2/p2_2.webp';
import p2_2_th from '../assets/images/products/product2/p2_2_th.webp';
import p2_3 from '../assets/images/products/product2/p2_3.webp';
import p2_3_th from '../assets/images/products/product2/p2_3_th.webp';
import p2_4 from '../assets/images/products/product2/p2_4.webp';
import p2_4_th from '../assets/images/products/product2/p2_4_th.webp';

// Product 3
import p3_1 from '../assets/images/products/product3/p3_1.webp';
import p3_1_th from '../assets/images/products/product3/p3_1_th.webp';
import p3_2 from '../assets/images/products/product3/p3_2.webp';
import p3_2_th from '../assets/images/products/product3/p3_2_th.webp';
import p3_3 from '../assets/images/products/product3/p3_3.webp';
import p3_3_th from '../assets/images/products/product3/p3_3_th.webp';
import p3_4 from '../assets/images/products/product3/p3_4.webp';
import p3_4_th from '../assets/images/products/product3/p3_4_th.webp';

// Product 4
import p4_1 from '../assets/images/products/product4/p4_1.webp';
import p4_1_th from '../assets/images/products/product4/p4_1_th.webp';
import p4_2 from '../assets/images/products/product4/p4_2.webp';
import p4_2_th from '../assets/images/products/product4/p4_2_th.webp';
import p4_3 from '../assets/images/products/product4/p4_3.webp';
import p4_3_th from '../assets/images/products/product4/p4_3_th.webp';
import p4_4 from '../assets/images/products/product4/p4_4.webp';
import p4_4_th from '../assets/images/products/product4/p4_4_th.webp';

// Product 5
import p5_1 from '../assets/images/products/product5/p5_1.webp';
import p5_1_th from '../assets/images/products/product5/p5_1_th.webp';
import p5_2 from '../assets/images/products/product5/p5_2.webp';
import p5_2_th from '../assets/images/products/product5/p5_2_th.webp';
import p5_3 from '../assets/images/products/product5/p5_3.webp';
import p5_3_th from '../assets/images/products/product5/p5_3_th.webp';
import p5_4 from '../assets/images/products/product5/p5_4.webp';
import p5_4_th from '../assets/images/products/product5/p5_4_th.webp';

// Product 6
import p6_1 from '../assets/images/products/product6/p6_1.webp';
import p6_1_th from '../assets/images/products/product6/p6_1_th.webp';
import p6_2 from '../assets/images/products/product6/p6_2.webp';
import p6_2_th from '../assets/images/products/product6/p6_2_th.webp';
import p6_3 from '../assets/images/products/product6/p6_3.webp';
import p6_3_th from '../assets/images/products/product6/p6_3_th.webp';
import p6_4 from '../assets/images/products/product6/p6_4.webp';
import p6_4_th from '../assets/images/products/product6/p6_4_th.webp';

// Product 7
import p7_1 from '../assets/images/products/product7/p7_1.webp';
import p7_1_th from '../assets/images/products/product7/p7_1_th.webp';
import p7_2 from '../assets/images/products/product7/p7_2.webp';
import p7_2_th from '../assets/images/products/product7/p7_2_th.webp';
import p7_3 from '../assets/images/products/product7/p7_3.webp';
import p7_3_th from '../assets/images/products/product7/p7_3_th.webp';
import p7_4 from '../assets/images/products/product7/p7_4.webp';
import p7_4_th from '../assets/images/products/product7/p7_4_th.webp';

// Product 8
import p8_1 from '../assets/images/products/product8/p8_1.webp';
import p8_1_th from '../assets/images/products/product8/p8_1_th.webp';
import p8_2 from '../assets/images/products/product8/p8_2.webp';
import p8_2_th from '../assets/images/products/product8/p8_2_th.webp';
import p8_3 from '../assets/images/products/product8/p8_3.webp';
import p8_3_th from '../assets/images/products/product8/p8_3_th.webp';
import p8_4 from '../assets/images/products/product8/p8_4.webp';
import p8_4_th from '../assets/images/products/product8/p8_4_th.webp';

export const products = [
  {
    id: 1,
    brand: "TERRA",
    name: "Fall Limited Edition Sneakers",
    description: "Your perfect casual companion. Featuring a durable rubber sole to withstand everything the weather offers.",
    price: 250.00,
    discount: 0, 
    stock: 10,
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p1_1, p1_2, p1_3, p1_4],
      thumbs: [p1_1_th, p1_1_th, p1_3_th, p1_4_th]
    }
  },
  {
    id: 2,
    brand: "URBAN",
    name: "Midnight Stealth Runner",
    description: "Engineered for the night. Features reflective materials and breathable mesh for maximum city comfort.",
    price: 180.00,
    discount: 0,
    stock: 2, 
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p2_1, p2_2, p2_3, p2_4],
      thumbs: [p2_1_th, p2_2_th, p2_3_th, p2_4_th]
    }
  },
  {
    id: 3,
    brand: "SKY",
    name: "Aero-Glide Basket 720",
    description: "Inspired by the courts. Our signature air-cushion tech provides a cloud-like experience with every step.",
    price: 210.00,
    discount: 0,
    stock: 15,
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p3_1, p3_2, p3_3, p3_4],
      thumbs: [p3_1_th, p3_2_th, p3_3_th, p3_4_th]
    }
  },
  {
    id: 4,
    brand: "EXPLORER",
    name: "Outdoor Nomad Trail",
    description: "Ready for any terrain. Combines the grip of a hiking boot with the lightness of a high-end trainer.",
    price: 165.00,
    discount: 15,
    stock: 0, 
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p4_1, p4_2, p4_3, p4_4],
      thumbs: [p4_1_th, p4_2_th, p4_3_th, p4_4_th]
    }
  },
  {
    id: 5,
    brand: "VELOCITY",
    name: "Nitro Boost Prime",
    description: "Designed for performance. Offers unparalleled energy return and a lockdown fit that feels like a second skin.",
    price: 230.00,
    discount: 0,
    stock: 8,
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p5_1, p5_2, p5_3, p5_4],
      thumbs: [p5_1_th, p5_2_th, p5_3_th, p5_4_th]
    }
  },
  {
    id: 6,
    brand: "ELEMENT",
    name: "Arctic Frost Hi-Top",
    description: "Beat the cold in style. Insulated hi-tops with thermal lining and waterproof leather for harsh winters.",
    price: 195.00,
    discount: 10,
    stock: 5,
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p6_1, p6_2, p6_3, p6_4],
      thumbs: [p6_1_th, p6_2_th, p6_3_th, p6_4_th]
    }
  },
  {
    id: 7,
    brand: "LEGACY",
    name: "Classic Heritage Leather",
    description: "A timeless silhouette reborn. Handcrafted with premium Italian leather for your everyday luxury rotation.",
    price: 275.00,
    discount: 0,
    stock: 3,
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p7_1, p7_2, p7_3, p7_4],
      thumbs: [p7_1_th, p7_2_th, p7_3_th, p7_4_th]
    }
  },
  {
    id: 8,
    brand: "ZENITH",
    name: "Cloud-Walk Knit",
    description: "The ultimate in comfort. An engineered knit upper provides flexibility, making it our lightest sneaker yet.",
    price: 150.00,
    discount: 20,
    stock: 12,
    sizes: [36, 37, 38, 39, 40, 41],
    images: {
      main: [p8_1, p8_2, p8_3, p8_4],
      thumbs: [p8_1_th, p8_2_th, p8_3_th, p8_4_th]
    }
  }
];