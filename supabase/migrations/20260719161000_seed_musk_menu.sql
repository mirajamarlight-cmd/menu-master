-- Seed Musk menu categories + items from static menu-data
DO $$
DECLARE
  musk_id uuid;
  cat_id uuid;
BEGIN
  SELECT id INTO musk_id FROM public.cafes WHERE slug = 'musk';
  IF musk_id IS NULL THEN RETURN; END IF;
  IF EXISTS (SELECT 1 FROM public.menu_categories WHERE cafe_id = musk_id) THEN RETURN; END IF;
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'breakfast', 'Breakfast', 0)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Fried tomato', NULL, '330', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Fried Tomato with Meat', NULL, '1,320', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Hummus with Meat', NULL, '1,320', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Falafel', NULL, '38.5', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Falafel with Cheese', NULL, '82.5', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Scrambled Croissant', NULL, '462', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Tuna Sandwich', NULL, '616', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Egg Omelet', NULL, '627', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Vegetable Omlete', NULL, '302.5', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mushroom Omlete', NULL, '302.5', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cheese Omlete', NULL, '385', NULL, true, false, false, 10);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Poached Egg', NULL, '297', NULL, true, false, false, 11);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Boiled Egg', NULL, '297', NULL, true, false, false, 12);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'French Toast', NULL, '582', NULL, true, false, false, 13);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'soup', 'Soup', 1)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lintel Soup', NULL, '440', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cream Mushroom Soup', NULL, '737', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Vegetable Soup', NULL, '440', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Cream Soup', NULL, '748', NULL, true, false, false, 3);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'cold-starter', 'Cold Starter', 2)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Baba Ghanoj', NULL, '440', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Arugula Salad', NULL, '440', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Musk Salad (Season Fruit)', NULL, '1,265', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Halloumi Salad', NULL, '1,012', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Turkish Salad', NULL, '682', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Greece Salad', NULL, '825', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Coleslaw Salad', NULL, '517', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Big Mix Salad', NULL, '1,980', NULL, true, false, false, 7);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'pastries-breakfast', 'Pastries Breakfast', 3)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Stuffed Potatos', NULL, '363', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Stuffed Cheese', NULL, '385', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Stuffed Spinach', NULL, '363', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Hot Dog Pastries', NULL, '396', NULL, true, false, false, 3);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'sweet-breakfast', 'Sweet Breakfast', 4)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Fluffy pancakes', NULL, '715', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Krep', NULL, '715', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Waffle', NULL, '715', NULL, true, false, false, 2);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'hot-starter', 'Hot Starter', 5)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Grilled Halloumi / Fried', NULL, '990', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lemon Garlic Wings', NULL, '1,078', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Beef Shawarma with Rice', NULL, '1,507', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Shawarma with Rice', NULL, '1,056', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Fried Liver', NULL, '1,375', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lamb Sajia', NULL, '1,595', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Buffalo Wings', NULL, '1,078', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mad Fries', NULL, '660', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Buffalo Chicken Finger', NULL, '1,408', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Broasted chicken 8 pcs', NULL, '3,950', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Broasted chicken 16 pcs (Family)', NULL, '6,250', NULL, true, false, false, 10);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'sandwich', 'Sandwich', 6)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Beef Shawarma', NULL, '825', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Beef Shawarma(Super)', NULL, '1,265', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lamb Kebab Sandwich', NULL, '1,320', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Kebab Sandwich', NULL, '1,078', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Beef Fajita Sandwich', NULL, '1,320', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Fajita Sandwich', NULL, '1,078', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Falafel Sandwich Small', NULL, '165', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Falafel Sandwich Big', NULL, '385', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Arayes Meat', NULL, '990', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Special Chicken Burger', NULL, '1,250', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Special Beef Burger', NULL, '1,250', NULL, true, false, false, 10);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Zinger', NULL, '850', NULL, true, false, false, 11);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Special Chicken Zinger', NULL, '1,150', NULL, true, false, false, 12);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'main-course', 'Main Course', 7)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Kofta with Tomato', NULL, '1,650', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Vegetable Tray with Meat', NULL, '1,650', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken with Potato', NULL, '2,035', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken with Mix Vegetable', NULL, '2,310', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Breast / Mushroom Cream', NULL, '2,310', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Grilled Fish', NULL, '2,200', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Meat Kebab Plate', NULL, '2,695', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Kebab Plate', NULL, '2,420', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Shish Tawook Plate', NULL, '2,860', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Awsal Plate', NULL, '3,190', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lamb Cutlets', NULL, '3,795', NULL, true, false, false, 10);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mix BBQ Plate', NULL, '3,190', NULL, true, false, false, 11);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lamb Awsal', NULL, '4,290', NULL, true, false, true, 12);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lamb kebab', NULL, '3,960', NULL, true, false, true, 13);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Shish Tawook', NULL, '3,850', NULL, true, false, true, 14);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lamp Chops', NULL, '4,620', NULL, true, false, true, 15);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mixed Grill', NULL, '3,960', NULL, true, false, true, 16);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Mandi (Full)', NULL, '3,850', NULL, true, false, false, 17);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Kabsa', NULL, '2,035', NULL, true, false, false, 18);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Meat Kabsa', NULL, '2,420', NULL, true, false, false, 19);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Salmon Fish', NULL, '3,190', NULL, true, false, false, 20);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'King Fish', NULL, '2,200', NULL, true, false, false, 21);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'indian-corner', 'Indian Corner', 8)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chicken Tikka Masala', NULL, '2,090', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Butter Chicken', NULL, '2,090', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lamb Korma Curry', NULL, '2,420', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Indian Samosa (veg)', NULL, '522.5', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lentil Samosa', NULL, '506', NULL, true, false, false, 4);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'sweets-pastry', 'Sweets & Pastry', 9)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cheese Cake Blueberry', NULL, '825', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cheese Cake Cherry', NULL, '825', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Oriantal Osmaliah', NULL, '412.5', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chocolate Cake', NULL, '462', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cookies Chocolate Chip Dark', NULL, '319', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cookies Chocolate Chip Wihte', NULL, '319', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Apple Pie', NULL, '495', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Tiramisu Strowberry', NULL, '544.5', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Honey Cake', NULL, '418', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Saffron Cake', NULL, '429', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Turkish Cake', NULL, '462', NULL, true, false, false, 10);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Kunafa Cream', NULL, '412.5', NULL, true, false, false, 11);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Kunafa Nutella', NULL, '616', NULL, true, false, false, 12);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Kunafa Cheese', NULL, '489.5', NULL, true, false, false, 13);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Strowberry Tart', NULL, '473', NULL, true, false, false, 14);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Basbousa Oriantal', NULL, '506', NULL, true, false, false, 15);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Browni Chocolate', NULL, '715', NULL, true, false, false, 16);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Pounty Cake', NULL, '693', NULL, true, false, false, 17);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'hot-drinks', 'Hot Drinks', 10)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Espresso', NULL, '121', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Café Latte', NULL, '209', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Americano', NULL, '143', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Coffee', NULL, '143', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Tea with Coffee', NULL, '132', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cappuccino', NULL, '220', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Hot Chocolate', NULL, '258.5', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Moca Coffee', NULL, '258.5', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Frappuccino', NULL, '275', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Caramel Coffee', NULL, '258.5', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Fasting Macchiato', NULL, '154', NULL, true, false, false, 10);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Black and White Coffee', NULL, '275', NULL, true, false, false, 11);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Black Tea', NULL, '104.5', NULL, true, false, false, 12);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Green Tea', NULL, '110', NULL, true, false, false, 13);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Tea with Ginger', NULL, '93.5', NULL, true, false, false, 14);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lemon with Ginger', NULL, '115.5', NULL, true, false, false, 15);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Tea with Sage', NULL, '110', NULL, true, false, false, 16);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ginger', NULL, '93.5', NULL, true, false, false, 17);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Special Tea', NULL, '220', NULL, true, false, false, 18);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cinnamon Tea', NULL, '115.5', NULL, true, false, false, 19);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Orange Tea', NULL, '148.5', NULL, true, false, false, 20);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Lemon Tea', NULL, '104.5', NULL, true, false, false, 21);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Hot Matcha', NULL, '473', NULL, true, false, false, 22);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Macchiato', NULL, '187', NULL, true, false, false, 23);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ginger with Honey', NULL, '115.5', NULL, true, false, false, 24);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Single Macchiato', NULL, '143', NULL, true, false, false, 25);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Duble Marcciato', NULL, '220', NULL, true, false, false, 26);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Tea Karak', NULL, '209', NULL, true, false, false, 27);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'cold-drinks', 'Cold Drinks', 11)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ice Coffee', NULL, '203.5', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ice Latte', NULL, '225.5', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ice Caramel', NULL, '264', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ice Chocolate', NULL, '264', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ice Strawberry', NULL, '258.5', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Frappuccino', NULL, '280.5', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ice Matcha', NULL, '462', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Black and White', NULL, '280.5', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Ice Tea', NULL, '159.5', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Slash', NULL, '181.5', NULL, true, false, false, 9);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'soft-drinks', 'Soft Drinks', 12)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Pepsi', NULL, '110', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, '7 up', NULL, '110', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mirinda', NULL, '110', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Miranda Tonic', NULL, '110', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Plastic Pepsi', NULL, '143', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Plastic 7 up', NULL, '143', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Plastic Mirinda', NULL, '143', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Soda Water (cool)', NULL, '143', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mineral Water', NULL, '66', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Water (1 Liter)', NULL, '99', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Water (2 Liter)', NULL, '137.5', NULL, true, false, false, 10);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'seasonal-juice', 'Seasonal Juice', 13)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Avocado Juice', NULL, '330', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Avocado Juice with Milk', NULL, '385', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mango Juice', NULL, '385', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Watermelon Juice', NULL, '330', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Orange Juice', NULL, '385', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Papaya Juice', NULL, '418', NULL, true, false, false, 5);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Pineapple Juice', NULL, '330', NULL, true, false, false, 6);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Strawberry Juice', NULL, '385', NULL, true, false, false, 7);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Strawberry Juice with Milk', NULL, '385', NULL, true, false, false, 8);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Apple Juice', NULL, '583', NULL, true, false, false, 9);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Cocktail Juice', NULL, '385', NULL, true, false, false, 10);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Banana Juice with Milk', NULL, '385', NULL, true, false, false, 11);
  INSERT INTO public.menu_categories (cafe_id, slug, name_en, sort_order)
  VALUES (musk_id, 'shakes', 'Shakes', 14)
  RETURNING id INTO cat_id;
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Coffee Shake', NULL, '412.5', NULL, true, false, false, 0);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Banana Shake', NULL, '385', NULL, true, false, false, 1);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Strawberry Shake', NULL, '385', NULL, true, false, false, 2);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Milk Shake', NULL, '385', NULL, true, false, false, 3);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Mango Shake', NULL, '330', NULL, true, false, false, 4);
  INSERT INTO public.menu_items (cafe_id, category_id, name_en, description_en, price, image_url, is_available, is_featured, starting_from, sort_order)
  VALUES (musk_id, cat_id, 'Chocolate Shake', NULL, '429', NULL, true, false, false, 5);
END $$;
