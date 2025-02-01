const productDetails = [
  {
    id: 1,
    name: "TUF Gaming Laptop",
    originalPrice: 120,
    discount: 5, // Assuming a 5% discount
    modifiedPrice: 120 - (120 * 5) / 100, // Calculating the discounted price
    images: [
      "https://images-cdn.ubuy.co.in/63e1969758f86f14d178e6ed-2019-asus-tuf-gaming-laptop-computer.jpg",
      "https://images-cdn.ubuy.qa/633aa7521c2da2331a748c67-asus-tuf-gaming-f17-gaming-laptop.jpg",
      "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/6/1/61sfvkyvvml._ac_sl1102__rnpqfihvrpqvdtdi.jpg?format=jpeg&width=368",
    ], // Array of images

    description: "TUF Gaming Laptop description",
    category: "Flesh Deals",
  },
  {
    id: 2,
    name: "ASUS ROG Gaming Mouse",
    originalPrice: 180,
    discount: 10, // Assuming a 10% discount
    modifiedPrice: 180 - (180 * 10) / 100, // Calculating the discounted price
    images: [
      "/images/product2_1.jpg",
      "/images/product2_2.jpg",
      "/images/product2_3.jpg",
    ], // Array of images

    description: "ASUS ROG Gaming Mouse description",
    category: "Flesh Deals",
  },
  {
    id: 3,
    name: "HP Pavilion Gaming Keyboard",
    originalPrice: 200,
    discount: 15, // Assuming a 15% discount
    modifiedPrice: 200 - (200 * 15) / 100, // Calculating the discounted price
    images: [
      "/images/product3_1.jpg",
      "/images/product3_2.jpg",
      "/images/product3_3.jpg",
    ], // Array of images

    description: "HP Pavilion Gaming Keyboard description",
    category: "Flesh Deals",
  },
  {
    id: 4,
    name: "Dell Alienware Monitor",
    originalPrice: 250,
    discount: 20, // Assuming a 20% discount
    modifiedPrice: 250 - (250 * 20) / 100, // Calculating the discounted price
    images: [
      "/images/product4_1.jpg",
      "/images/product4_2.jpg",
      "/images/product4_3.jpg",
    ], // Array of images

    description: "Dell Alienware Monitor description",
    category: "Flesh Deals",
  },
  {
    id: 5,
    name: "Logitech G-Series Gaming Headset",
    originalPrice: 300,
    discount: 25, // Assuming a 25% discount
    modifiedPrice: 300 - (300 * 25) / 100, // Calculating the discounted price
    images: [
      "/images/product5_1.jpg",
      "/images/product5_2.jpg",
      "/images/product5_3.jpg",
    ], // Array of images

    description: "Logitech G-Series Gaming Headset description",
    category: "Flesh Deals",
  },
  {
    id: 6,
    name: "Acer Nitro Gaming Chair",
    originalPrice: 350,
    discount: 30, // Assuming a 30% discount
    modifiedPrice: 350 - (350 * 30) / 100, // Calculating the discounted price
    images: [
      "/images/product6_1.jpg",
      "/images/product6_2.jpg",
      "/images/product6_3.jpg",
    ], // Array of images

    description: "Acer Nitro Gaming Chair description",
    category: "Flesh Deals",
  },
];

export default productDetails;
