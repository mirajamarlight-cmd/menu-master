export type MenuItemSize = {
  label: string;
  price: string;
};

export type MenuItem = {
  id?: string;
  name: string;
  name_am?: string;
  name_ar?: string;
  price: string;
  image?: string;
  note?: string;
  description?: string;
  description_am?: string;
  description_ar?: string;
  startingFrom?: boolean;
  isAvailable?: boolean;
  isFeatured?: boolean;
  sizes?: MenuItemSize[];
};

export type Category = {
  id?: string;
  slug: string;
  name: string;
  name_am?: string;
  name_ar?: string;
  items: MenuItem[];
};

/** Localized display name for chrome locale. */
export function localizedName(
  item: { name: string; name_am?: string; name_ar?: string },
  locale: string,
): string {
  if (locale === "am" && item.name_am) return item.name_am;
  if (locale === "ar" && item.name_ar) return item.name_ar;
  return item.name;
}

export function localizedDescription(
  item: { description?: string; description_am?: string; description_ar?: string; note?: string },
  locale: string,
): string | undefined {
  if (locale === "am" && item.description_am) return item.description_am;
  if (locale === "ar" && item.description_ar) return item.description_ar;
  return item.description || item.note;
}

export function displayPrice(item: MenuItem): { price: string; startingFrom: boolean } {
  if (item.sizes && item.sizes.length > 0) {
    const nums = item.sizes.map((s) => Number(String(s.price).replace(/,/g, ""))).filter((n) => !Number.isNaN(n));
    const min = Math.min(...nums);
    return {
      price: Number.isFinite(min) ? min.toLocaleString() : item.sizes[0].price,
      startingFrom: true,
    };
  }
  return { price: item.price, startingFrom: !!item.startingFrom };
}

const CDN = "https://digitalmenu.muskplc.com/api/files/menu-items";

export const popular: MenuItem[] = [
  { name: "Hummus", price: "550", image: `${CDN}/69f5c3a0aa923.webp` },
  { name: "Chicken Shawarma (Super)", price: "1,056", image: `${CDN}/69f848a497bfe.webp` },
  { name: "Mosakhan Chicken", price: "2,035", image: `${CDN}/69f8488b43344.webp` },
  { name: "Musk Plates", price: "7,150", image: `${CDN}/69f84e7b6eb37.webp` },
  { name: "Chicken Mansaf", price: "2,420", image: `${CDN}/69f8486f86238.webp` },
  { name: "Meat Mansaf", price: "3,190", image: `${CDN}/69f84ca7c6797.webp` },
  { name: "Biryani Chicken", price: "2,035", image: `${CDN}/69f8482ebd16e.webp` },
];

export const categories: Category[] = [
  {
    slug: "breakfast",
    name: "Breakfast",
    items: [
      { name: "Shakshuka", price: "374", image: `${CDN}/69e7ffedd8310.webp` },
      { name: "Potato Mufaraka", price: "385", image: `${CDN}/69e80039337a5.webp` },
      { name: "Fried tomato", price: "330" },
      { name: "Fried Tomato with Meat", price: "1,320" },
      { name: "Mossabaha", price: "550", image: `${CDN}/69e8005d621c8.webp` },
      { name: "Hummus", price: "550", image: `${CDN}/69f5c3a0aa923.webp` },
      { name: "Hummus with Meat", price: "1,320" },
      { name: "Foul Mudammas", price: "495", image: `${CDN}/69f848f850a0e.webp` },
      { name: "Falafel", price: "38.5" },
      { name: "Falafel with Cheese", price: "82.5" },
      { name: "Staffed falafel", price: "82.5", image: `${CDN}/6a01c12758678.webp` },
      { name: "Grilled Haloumi", price: "924", image: `${CDN}/69f84c4de5743.webp` },
      { name: "Scrambled Croissant", price: "462" },
      { name: "Tuna Sandwich", price: "616" },
      { name: "Egg Omelet", price: "627" },
      { name: "Vegetable Omlete", price: "302.5" },
      { name: "Mushroom Omlete", price: "302.5" },
      { name: "Cheese Omlete", price: "385" },
      { name: "Poached Egg", price: "297" },
      { name: "Boiled Egg", price: "297" },
      { name: "French Toast", price: "582" },
    ],
  },
  {
    slug: "soup",
    name: "Soup",
    items: [
      { name: "Lintel Soup", price: "440" },
      { name: "Cream Mushroom Soup", price: "737" },
      { name: "Vegetable Soup", price: "440" },
      { name: "Chicken Cream Soup", price: "748" },
    ],
  },
  {
    slug: "cold-starter",
    name: "Cold Starter",
    items: [
      { name: "Quinoa Tabbouleh", price: "522.5", image: `${CDN}/69f84ee0e8d54.webp` },
      { name: "Fattoush", price: "572", image: `${CDN}/69f848e8f0a96.webp` },
      { name: "Eggplant dip", price: "462", image: `${CDN}/69f848c718977.webp` },
      { name: "Baba Ghanoj", price: "440" },
      { name: "Hummus", price: "550", image: `${CDN}/69f5c3b317135.webp` },
      { name: "Arugula Salad", price: "440" },
      { name: "Caesar Salad", price: "825", image: `${CDN}/69f841e7dda9d.webp` },
      { name: "Musk Salad (Season Fruit)", price: "1,265" },
      { name: "Halloumi Salad", price: "1,012" },
      { name: "Turkish Salad", price: "682" },
      { name: "Greece Salad", price: "825" },
      { name: "Coleslaw Salad", price: "517" },
      { name: "Small Mix salad", price: "1,320", image: `${CDN}/69f84ebf0fcf2.webp` },
      { name: "Big Mix Salad", price: "1,980" },
    ],
  },
  {
    slug: "pastries-breakfast",
    name: "Pastries Breakfast",
    items: [
      { name: "Thyme Pastries", price: "325.2", image: `${CDN}/6a01c25b54322.webp` },
      { name: "Cheese Pastries", price: "385", image: `${CDN}/6a10256177813.webp` },
      { name: "Egg Pastries", price: "352", image: `${CDN}/6a1024fa6babe.webp` },
      { name: "Stuffed Potatos", price: "363" },
      { name: "Stuffed Cheese", price: "385" },
      { name: "Stuffed Spinach", price: "363" },
      { name: "Hot Dog Pastries", price: "396" },
    ],
  },
  {
    slug: "sweet-breakfast",
    name: "Sweet Breakfast",
    items: [
      { name: "Fluffy pancakes", price: "715" },
      { name: "Krep", price: "715" },
      { name: "Waffle", price: "715" },
    ],
  },
  {
    slug: "hot-starter",
    name: "Hot Starter",
    items: [
      { name: "Grilled Halloumi / Fried", price: "990" },
      { name: "Lemon Garlic Wings", price: "1,078" },
      { name: "Beef Shawarma with Rice", price: "1,507" },
      { name: "Chicken Shawarma with Rice", price: "1,056" },
      { name: "Fried Liver", price: "1,375" },
      { name: "Lamb Sajia", price: "1,595" },
      { name: "Crispy Chicken Fingers", price: "1,408", image: `${CDN}/69f48eae84a31.webp` },
      { name: "Buffalo Wings", price: "1,078" },
      { name: "Mad Fries", price: "660" },
      { name: "Buffalo Chicken Finger", price: "1,408" },
      { name: "Broasted chicken 4 pcs", price: "2,120", image: `${CDN}/69ff8627c8d37.webp` },
      { name: "Broasted chicken 8 pcs", price: "3,950" },
      { name: "Broasted chicken 16 pcs (Family)", price: "6,250" },
    ],
  },
  {
    slug: "sandwich",
    name: "Sandwich",
    items: [
      { name: "Beef Burger", price: "950", image: `${CDN}/69ff86524168c.webp` },
      { name: "Chicken Burger", price: "950", image: `${CDN}/69ff863e76b70.webp` },
      { name: "Chicken Shawarma", price: "616", image: `${CDN}/69f84ea985341.webp` },
      { name: "Chicken Shawarma (Super)", price: "1,056", image: `${CDN}/69f848a497bfe.webp` },
      { name: "Beef Shawarma", price: "825" },
      { name: "Beef Shawarma(Super)", price: "1,265" },
      { name: "Lamb Kebab Sandwich", price: "1,320" },
      { name: "Chicken Kebab Sandwich", price: "1,078" },
      { name: "Beef Fajita Sandwich", price: "1,320" },
      { name: "Chicken Fajita Sandwich", price: "1,078" },
      { name: "Falafel Sandwich Small", price: "165" },
      { name: "Falafel Sandwich Big", price: "385" },
      { name: "Arayes Meat", price: "990" },
      { name: "Special Chicken Burger", price: "1,250" },
      { name: "Special Beef Burger", price: "1,250" },
      { name: "Chicken Zinger", price: "850" },
      { name: "Special Chicken Zinger", price: "1,150" },
    ],
  },
  {
    slug: "main-course",
    name: "Main Course",
    items: [
      { name: "Chicken Roller with Rice (Half)", price: "2,035", image: `${CDN}/69f851a7a155d.webp` },
      { name: "Chicken Roller with Rice (Full)", price: "3,850", image: `${CDN}/69f851b547e79.webp` },
      { name: "Kofta with Tomato", price: "1,650" },
      { name: "Kofta with Tihini", price: "1,870", image: `${CDN}/69f84c69e6985.webp` },
      { name: "Vegetable Tray with Meat", price: "1,650" },
      { name: "Chicken with Potato", price: "2,035" },
      { name: "Mosakhan Chicken", price: "2,035", image: `${CDN}/69f8488b43344.webp` },
      { name: "Chicken with Mix Vegetable", price: "2,310" },
      { name: "Chicken Breast / Mushroom Cream", price: "2,310" },
      { name: "Grilled Fish", price: "2,200" },
      { name: "Meat Kebab Plate", price: "2,695" },
      { name: "Chicken Kebab Plate", price: "2,420" },
      { name: "Shish Tawook Plate", price: "2,860" },
      { name: "Awsal Plate", price: "3,190" },
      { name: "Lamb Cutlets", price: "3,795" },
      { name: "Mix BBQ Plate", price: "3,190" },
      { name: "Lamb Awsal", price: "4,290", startingFrom: true },
      { name: "Lamb kebab", price: "3,960", startingFrom: true },
      { name: "Chicken Kebab", price: "3,740", startingFrom: true, image: `${CDN}/69f8484c19d08.webp` },
      { name: "Shish Tawook", price: "3,850", startingFrom: true },
      { name: "Lamp Chops", price: "4,620", startingFrom: true },
      { name: "Mixed Grill", price: "3,960", startingFrom: true },
      {
        name: "Musk Plates",
        price: "7,150",
        image: `${CDN}/69f84e7b6eb37.webp`,
        note: "Half Chicken, Mixed BBQ, Meat, Shawarma Meat or Chicken",
      },
      { name: "Meat Mandi", price: "2,420", image: `${CDN}/69f84c9badd14.webp` },
      { name: "Chicken Mandi (Half)", price: "1,815", image: `${CDN}/69f8490b078c4.webp` },
      { name: "Chicken Mandi (Full)", price: "3,850" },
      { name: "Chicken Mansaf", price: "2,420", image: `${CDN}/69f8486f86238.webp` },
      { name: "Meat Mansaf", price: "3,190", image: `${CDN}/69f84ca7c6797.webp` },
      { name: "Chicken Kabsa", price: "2,035" },
      { name: "Meat Kabsa", price: "2,420" },
      { name: "Salmon Fish", price: "3,190" },
      { name: "King Fish", price: "2,200" },
    ],
  },
  {
    slug: "indian-corner",
    name: "Indian Corner",
    items: [
      { name: "Chicken Tikka Masala", price: "2,090" },
      { name: "Butter Chicken", price: "2,090" },
      { name: "Lamb Korma Curry", price: "2,420" },
      { name: "Biryani Chicken", price: "2,035", image: `${CDN}/69f8482ebd16e.webp` },
      { name: "Indian Samosa (veg)", price: "522.5" },
      { name: "Lentil Samosa", price: "506" },
    ],
  },
  {
    slug: "sweets-pastry",
    name: "Sweets & Pastry",
    items: [
      { name: "Cheese Cake Blueberry", price: "825" },
      { name: "Cheese Cake Cherry", price: "825" },
      { name: "Cheese Cake Strawberry", price: "803", image: `${CDN}/69f8427a6d49b.webp` },
      { name: "Cheese Cake Nutella", price: "869", image: `${CDN}/69f8425d8e7e4.webp` },
      { name: "Red Velvet", price: "462", image: `${CDN}/69f842a10cd78.webp` },
      { name: "Oriantal Osmaliah", price: "412.5" },
      { name: "Chocolate Cake", price: "462" },
      { name: "Cookies Chocolate Chip Dark", price: "319" },
      { name: "Cookies Chocolate Chip Wihte", price: "319" },
      { name: "Apple Pie", price: "495" },
      { name: "Tomato Cake", price: "385", image: `${CDN}/69f8458e73a4e.webp` },
      { name: "Tiramisu Coffee", price: "572", image: `${CDN}/69f845765d38a.webp` },
      { name: "Tiramisu Strowberry", price: "544.5" },
      { name: "Honey Cake", price: "418" },
      { name: "Saffron Cake", price: "429" },
      { name: "Turkish Cake", price: "462" },
      { name: "Kunafa Cream", price: "412.5" },
      { name: "Kunafa Nutella", price: "616" },
      { name: "Kunafa Cheese", price: "489.5" },
      { name: "Opera Chocolate", price: "583", image: `${CDN}/69f8455962e6d.webp` },
      { name: "Date Cake", price: "528", image: `${CDN}/69f845a6e3f0f.webp` },
      { name: "Strowberry Tart", price: "473" },
      { name: "Basbousa Oriantal", price: "506" },
      { name: "Browni Chocolate", price: "715" },
      { name: "Profiterole", price: "572", image: `${CDN}/69f8454218353.webp` },
      { name: "Pounty Cake", price: "693" },
    ],
  },
  {
    slug: "hot-drinks",
    name: "Hot Drinks",
    items: [
      { name: "Espresso", price: "121" },
      { name: "Café Latte", price: "209" },
      { name: "Americano", price: "143" },
      { name: "Coffee", price: "143" },
      { name: "Tea with Coffee", price: "132" },
      { name: "Cappuccino", price: "220" },
      { name: "Hot Chocolate", price: "258.5" },
      { name: "Moca Coffee", price: "258.5" },
      { name: "Frappuccino", price: "275" },
      { name: "Caramel Coffee", price: "258.5" },
      { name: "Fasting Macchiato", price: "154" },
      { name: "Black and White Coffee", price: "275" },
      { name: "Black Tea", price: "104.5" },
      { name: "Green Tea", price: "110" },
      { name: "Tea with Ginger", price: "93.5" },
      { name: "Lemon with Ginger", price: "115.5" },
      { name: "Tea with Sage", price: "110" },
      { name: "Ginger", price: "93.5" },
      { name: "Special Tea", price: "220" },
      { name: "Cinnamon Tea", price: "115.5" },
      { name: "Orange Tea", price: "148.5" },
      { name: "Lemon Tea", price: "104.5" },
      { name: "Hot Matcha", price: "473" },
      { name: "Macchiato", price: "187" },
      { name: "Ginger with Honey", price: "115.5" },
      { name: "Single Macchiato", price: "143" },
      { name: "Duble Marcciato", price: "220" },
      { name: "Tea Karak", price: "209" },
    ],
  },
  {
    slug: "cold-drinks",
    name: "Cold Drinks",
    items: [
      { name: "Ice Coffee", price: "203.5" },
      { name: "Ice Latte", price: "225.5" },
      { name: "Ice Caramel", price: "264" },
      { name: "Ice Chocolate", price: "264" },
      { name: "Ice Strawberry", price: "258.5" },
      { name: "Frappuccino", price: "280.5" },
      { name: "Ice Matcha", price: "462" },
      { name: "Black and White", price: "280.5" },
      { name: "Ice Tea", price: "159.5" },
      { name: "Slash", price: "181.5" },
    ],
  },
  {
    slug: "soft-drinks",
    name: "Soft Drinks",
    items: [
      { name: "Pepsi", price: "110" },
      { name: "7 up", price: "110" },
      { name: "Mirinda", price: "110" },
      { name: "Miranda Tonic", price: "110" },
      { name: "Plastic Pepsi", price: "143" },
      { name: "Plastic 7 up", price: "143" },
      { name: "Plastic Mirinda", price: "143" },
      { name: "Soda Water (cool)", price: "143" },
      { name: "Mineral Water", price: "66" },
      { name: "Water (1 Liter)", price: "99" },
      { name: "Water (2 Liter)", price: "137.5" },
    ],
  },
  {
    slug: "seasonal-juice",
    name: "Seasonal Juice",
    items: [
      { name: "Avocado Juice", price: "330" },
      { name: "Avocado Juice with Milk", price: "385" },
      { name: "Mango Juice", price: "385" },
      { name: "Watermelon Juice", price: "330" },
      { name: "Orange Juice", price: "385" },
      { name: "Papaya Juice", price: "418" },
      { name: "Pineapple Juice", price: "330" },
      { name: "Strawberry Juice", price: "385" },
      { name: "Strawberry Juice with Milk", price: "385" },
      { name: "Apple Juice", price: "583" },
      { name: "Cocktail Juice", price: "385" },
      { name: "Banana Juice with Milk", price: "385" },
    ],
  },
  {
    slug: "shakes",
    name: "Shakes",
    items: [
      { name: "Coffee Shake", price: "412.5" },
      { name: "Banana Shake", price: "385" },
      { name: "Strawberry Shake", price: "385" },
      { name: "Milk Shake", price: "385" },
      { name: "Mango Shake", price: "330" },
      { name: "Chocolate Shake", price: "429" },
    ],
  },
];

export const LOGO_ANIMAL = "https://assets.muskplc.com/images/logo_animal.png";
export const LOGO_TEXT = "https://assets.muskplc.com/images/musk_text_logo.png";
