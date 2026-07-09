const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const skincare = [
  { name: 'Vitamin C Serum', description: 'Brightening serum with 20% Vitamin C for glowing skin', price: 599, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', category: 'Skincare', stock: 50, discount: 20 },
  { name: 'Hyaluronic Acid Moisturizer', description: 'Deep hydration moisturizer for all skin types', price: 799, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400', category: 'Skincare', stock: 40, discount: 15 },
  { name: 'Retinol Night Cream', description: 'Anti-aging night cream with retinol', price: 1299, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400', category: 'Skincare', stock: 30, discount: 10 },
  { name: 'SPF 50 Sunscreen', description: 'Lightweight sunscreen with broad spectrum protection', price: 449, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', category: 'Skincare', stock: 60, discount: 25 },
  { name: 'Rose Water Toner', description: 'Refreshing toner with pure rose water', price: 299, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', category: 'Skincare', stock: 70, discount: 10 },
  { name: 'Niacinamide Serum', description: 'Pore minimizing serum with 10% niacinamide', price: 699, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400', category: 'Skincare', stock: 45, discount: 20 },
  { name: 'Face Wash Gel', description: 'Deep cleansing gel face wash for oily skin', price: 249, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', category: 'Skincare', stock: 80, discount: 15 },
  { name: 'Under Eye Cream', description: 'Reduces dark circles and puffiness', price: 899, image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400', category: 'Skincare', stock: 35, discount: 30 },
  { name: 'Clay Face Mask', description: 'Detoxifying clay mask for deep cleansing', price: 399, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400', category: 'Skincare', stock: 50, discount: 10 },
  { name: 'Aloe Vera Gel', description: 'Pure aloe vera gel for soothing skin', price: 199, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', category: 'Skincare', stock: 100, discount: 5 },
  { name: 'Kojic Acid Cream', description: 'Skin lightening cream with kojic acid', price: 549, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400', category: 'Skincare', stock: 40, discount: 20 },
  { name: 'Collagen Booster Serum', description: 'Firms and plumps skin with collagen', price: 1499, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400', category: 'Skincare', stock: 25, discount: 15 },
  { name: 'Glycolic Acid Toner', description: 'Exfoliating toner for smooth skin', price: 749, image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400', category: 'Skincare', stock: 35, discount: 10 },
  { name: 'Micellar Water', description: 'Gentle makeup remover and cleanser', price: 349, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400', category: 'Skincare', stock: 60, discount: 15 },
  { name: 'Peptide Eye Serum', description: 'Firming eye serum with peptides', price: 999, image: 'https://images.unsplash.com/photo-1614937554194-c83c0fa1e61e?w=400', category: 'Skincare', stock: 30, discount: 20 },
];

const makeup = [
  { name: 'Matte Lipstick', description: 'Long lasting matte lipstick in 20 shades', price: 299, image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2fb7?w=400', category: 'Makeup', stock: 100, discount: 20 },
  { name: 'Foundation SPF 15', description: 'Full coverage foundation with sun protection', price: 799, image: 'https://images.unsplash.com/photo-1631214499182-6e9de0c78e48?w=400', category: 'Makeup', stock: 60, discount: 15 },
  { name: 'Kajal Eyeliner', description: 'Intense black kajal for bold eyes', price: 149, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', category: 'Makeup', stock: 120, discount: 10 },
  { name: 'Eyeshadow Palette', description: '12 shade eyeshadow palette', price: 599, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400', category: 'Makeup', stock: 50, discount: 25 },
  { name: 'Mascara', description: 'Volumizing and lengthening mascara', price: 449, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400', category: 'Makeup', stock: 80, discount: 15 },
  { name: 'Blush Palette', description: 'Natural flush blush in 4 shades', price: 499, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', category: 'Makeup', stock: 45, discount: 20 },
  { name: 'Highlighter', description: 'Glow enhancing highlighter', price: 399, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400', category: 'Makeup', stock: 55, discount: 10 },
  { name: 'BB Cream', description: 'All in one BB cream with coverage', price: 549, image: 'https://images.unsplash.com/photo-1583241475880-083f84372725?w=400', category: 'Makeup', stock: 65, discount: 20 },
  { name: 'Lip Gloss', description: 'Shiny and moisturizing lip gloss', price: 249, image: 'https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=400', category: 'Makeup', stock: 90, discount: 15 },
  { name: 'Contour Kit', description: 'Professional contour and highlight kit', price: 699, image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400', category: 'Makeup', stock: 40, discount: 25 },
  { name: 'Setting Powder', description: 'Translucent setting powder for long wear', price: 449, image: 'https://images.unsplash.com/photo-1631214524020-3c69888b8ced?w=400', category: 'Makeup', stock: 55, discount: 10 },
  { name: 'Primer', description: 'Pore minimizing makeup primer', price: 599, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400', category: 'Makeup', stock: 50, discount: 20 },
  { name: 'Nude Lipstick', description: 'Perfect nude shade for everyday wear', price: 349, image: 'https://images.unsplash.com/photo-1625093741397-29a8f7c3b5e3?w=400', category: 'Makeup', stock: 75, discount: 15 },
  { name: 'Waterproof Eyeliner', description: 'Smudge proof waterproof eyeliner', price: 299, image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400', category: 'Makeup', stock: 85, discount: 10 },
  { name: 'Bronzer', description: 'Sun kissed bronzer for natural glow', price: 549, image: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=400', category: 'Makeup', stock: 45, discount: 20 },
];

const mensFootwear = [
  { name: 'Nike Air Max', description: 'Iconic Nike Air Max running shoes', price: 7999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'Mens Footwear', stock: 30, discount: 20 },
  { name: 'Leather Oxford Shoes', description: 'Classic leather oxford shoes for formal wear', price: 3999, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400', category: 'Mens Footwear', stock: 25, discount: 15 },
  { name: 'Casual Sneakers', description: 'Comfortable everyday casual sneakers', price: 1999, image: 'https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=400', category: 'Mens Footwear', stock: 50, discount: 25 },
  { name: 'Sports Running Shoes', description: 'Lightweight running shoes for athletes', price: 4999, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', category: 'Mens Footwear', stock: 35, discount: 20 },
  { name: 'Loafers', description: 'Slip on loafers for smart casual look', price: 2499, image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=400', category: 'Mens Footwear', stock: 40, discount: 10 },
  { name: 'Hiking Boots', description: 'Rugged hiking boots for outdoor adventures', price: 5999, image: 'https://images.unsplash.com/photo-1520219306100-ec4afac6e4ca?w=400', category: 'Mens Footwear', stock: 20, discount: 15 },
  { name: 'Flip Flops', description: 'Comfortable beach flip flops', price: 499, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400', category: 'Mens Footwear', stock: 100, discount: 30 },
  { name: 'Chelsea Boots', description: 'Stylish chelsea boots for all occasions', price: 3499, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', category: 'Mens Footwear', stock: 30, discount: 20 },
  { name: 'Adidas Ultraboost', description: 'Premium running shoes with boost technology', price: 8999, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', category: 'Mens Footwear', stock: 25, discount: 10 },
  { name: 'Sandals', description: 'Comfortable leather sandals for summer', price: 999, image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400', category: 'Mens Footwear', stock: 60, discount: 20 },
];

const womensFootwear = [
  { name: 'Block Heel Sandals', description: 'Stylish block heel sandals for parties', price: 1999, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', category: 'Womens Footwear', stock: 40, discount: 20 },
  { name: 'Stiletto Heels', description: 'Elegant stiletto heels for formal occasions', price: 2999, image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400', category: 'Womens Footwear', stock: 30, discount: 15 },
  { name: 'Ballet Flats', description: 'Comfortable ballet flats for everyday wear', price: 1299, image: 'https://images.unsplash.com/photo-1573100925118-870b8efc799d?w=400', category: 'Womens Footwear', stock: 50, discount: 25 },
  { name: 'Sneakers', description: 'Trendy white sneakers for casual look', price: 2499, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', category: 'Womens Footwear', stock: 45, discount: 20 },
  { name: 'Ankle Boots', description: 'Chic ankle boots for winter fashion', price: 3499, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', category: 'Womens Footwear', stock: 35, discount: 10 },
  { name: 'Wedge Sandals', description: 'Comfortable wedge sandals for summer', price: 1799, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400', category: 'Womens Footwear', stock: 40, discount: 15 },
  { name: 'Kolhapuri Chappals', description: 'Traditional handcrafted kolhapuri chappals', price: 799, image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=400', category: 'Womens Footwear', stock: 60, discount: 10 },
  { name: 'Platform Shoes', description: 'Trendy platform shoes for extra height', price: 2299, image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400', category: 'Womens Footwear', stock: 35, discount: 20 },
  { name: 'Mules', description: 'Slip on mules for effortless style', price: 1499, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', category: 'Womens Footwear', stock: 45, discount: 15 },
  { name: 'Running Shoes', description: 'Lightweight running shoes for women', price: 3999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'Womens Footwear', stock: 30, discount: 20 },
];

const womensClothing = [
  { name: 'Floral Maxi Dress', description: 'Beautiful floral maxi dress for summer', price: 1299, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', category: 'Womens Clothing', stock: 50, discount: 20 },
  { name: 'Silk Saree', description: 'Pure silk saree with golden border', price: 4999, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', category: 'Womens Clothing', stock: 30, discount: 15 },
  { name: 'Denim Jacket', description: 'Classic denim jacket for casual look', price: 1999, image: 'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=400', category: 'Womens Clothing', stock: 40, discount: 25 },
  { name: 'Kurti', description: 'Printed cotton kurti for everyday wear', price: 699, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', category: 'Womens Clothing', stock: 80, discount: 30 },
  { name: 'Palazzo Pants', description: 'Comfortable palazzo pants for casual wear', price: 899, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400', category: 'Womens Clothing', stock: 60, discount: 20 },
  { name: 'Crop Top', description: 'Trendy crop top for casual outings', price: 499, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400', category: 'Womens Clothing', stock: 70, discount: 15 },
  { name: 'Salwar Kameez', description: 'Embroidered salwar kameez set', price: 2499, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', category: 'Womens Clothing', stock: 45, discount: 20 },
  { name: 'Lehenga', description: 'Designer lehenga for festive occasions', price: 6999, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', category: 'Womens Clothing', stock: 20, discount: 10 },
  { name: 'Formal Blazer', description: 'Professional blazer for office wear', price: 2999, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4087?w=400', category: 'Womens Clothing', stock: 35, discount: 15 },
  { name: 'Yoga Pants', description: 'Stretchable yoga pants for workout', price: 999, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400', category: 'Womens Clothing', stock: 65, discount: 25 },
  { name: 'Summer Shorts', description: 'Comfortable denim shorts for summer', price: 799, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400', category: 'Womens Clothing', stock: 55, discount: 20 },
  { name: 'Wrap Dress', description: 'Elegant wrap dress for all occasions', price: 1599, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', category: 'Womens Clothing', stock: 40, discount: 15 },
  { name: 'Sweater', description: 'Cozy knit sweater for winter', price: 1299, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', category: 'Womens Clothing', stock: 45, discount: 20 },
  { name: 'Jumpsuit', description: 'Stylish jumpsuit for casual parties', price: 1799, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', category: 'Womens Clothing', stock: 35, discount: 25 },
  { name: 'Tank Top', description: 'Basic tank top for layering', price: 349, image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400', category: 'Womens Clothing', stock: 90, discount: 10 },
];

const mensClothing = [
  { name: 'Formal Shirt', description: 'Classic formal shirt for office wear', price: 999, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', category: 'Mens Clothing', stock: 60, discount: 20 },
  { name: 'Slim Fit Jeans', description: 'Stylish slim fit denim jeans', price: 1499, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'Mens Clothing', stock: 50, discount: 25 },
  { name: 'Polo T-Shirt', description: 'Premium cotton polo t-shirt', price: 799, image: 'https://images.unsplash.com/photo-1625910513596-d1462e00b921?w=400', category: 'Mens Clothing', stock: 70, discount: 15 },
  { name: 'Kurta Pajama', description: 'Traditional kurta pajama set', price: 1299, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', category: 'Mens Clothing', stock: 40, discount: 20 },
  { name: 'Blazer', description: 'Smart casual blazer for all occasions', price: 3499, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4087?w=400', category: 'Mens Clothing', stock: 30, discount: 15 },
  { name: 'Chinos', description: 'Comfortable chino pants for casual wear', price: 1199, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', category: 'Mens Clothing', stock: 55, discount: 20 },
  { name: 'Graphic T-Shirt', description: 'Trendy graphic printed t-shirt', price: 499, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'Mens Clothing', stock: 80, discount: 30 },
  { name: 'Track Pants', description: 'Comfortable track pants for workout', price: 799, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400', category: 'Mens Clothing', stock: 65, discount: 25 },
  { name: 'Hoodie', description: 'Warm and cozy hoodie for winter', price: 1599, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400', category: 'Mens Clothing', stock: 45, discount: 20 },
  { name: 'Cargo Shorts', description: 'Multi pocket cargo shorts for summer', price: 999, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400', category: 'Mens Clothing', stock: 60, discount: 15 },
  { name: 'Denim Jacket', description: 'Classic denim jacket for casual look', price: 2499, image: 'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=400', category: 'Mens Clothing', stock: 35, discount: 20 },
  { name: 'Linen Shirt', description: 'Breathable linen shirt for summer', price: 1199, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', category: 'Mens Clothing', stock: 50, discount: 15 },
  { name: 'Suit Set', description: '2 piece formal suit set', price: 7999, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4087?w=400', category: 'Mens Clothing', stock: 20, discount: 10 },
  { name: 'Sweatshirt', description: 'Comfortable sweatshirt for casual wear', price: 999, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400', category: 'Mens Clothing', stock: 55, discount: 20 },
  { name: 'Nehru Jacket', description: 'Traditional nehru jacket for festive wear', price: 1999, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', category: 'Mens Clothing', stock: 30, discount: 15 },
];

const kidsClothing = [
  { name: 'Girls Frock', description: 'Cute printed frock for little girls', price: 599, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400', category: 'Kids', stock: 60, discount: 20 },
  { name: 'Boys T-Shirt Set', description: 'Colorful t-shirt set for boys', price: 499, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'Kids', stock: 70, discount: 25 },
  { name: 'Girls Lehenga', description: 'Festive lehenga for little girls', price: 1299, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400', category: 'Kids', stock: 40, discount: 15 },
  { name: 'Boys Kurta', description: 'Traditional kurta for boys', price: 699, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'Kids', stock: 50, discount: 20 },
  { name: 'School Uniform', description: 'Complete school uniform set', price: 999, image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400', category: 'Kids', stock: 80, discount: 10 },
  { name: 'Girls Dungaree', description: 'Cute denim dungaree for girls', price: 899, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400', category: 'Kids', stock: 55, discount: 20 },
  { name: 'Boys Jeans', description: 'Comfortable denim jeans for boys', price: 799, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'Kids', stock: 60, discount: 15 },
  { name: 'Baby Romper', description: 'Soft cotton romper for babies', price: 399, image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Kids', stock: 70, discount: 25 },
  { name: 'Girls Skirt', description: 'Floral skirt for little girls', price: 549, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400', category: 'Kids', stock: 65, discount: 20 },
  { name: 'Boys Shorts', description: 'Comfortable shorts for active boys', price: 449, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'Kids', stock: 75, discount: 15 },
  { name: 'Winter Jacket Kids', description: 'Warm winter jacket for kids', price: 1499, image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Kids', stock: 40, discount: 20 },
  { name: 'Girls Party Dress', description: 'Sparkly party dress for girls', price: 999, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400', category: 'Kids', stock: 45, discount: 15 },
  { name: 'Boys Tracksuit', description: 'Sports tracksuit for active boys', price: 899, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400', category: 'Kids', stock: 55, discount: 20 },
  { name: 'Kids Pajama Set', description: 'Soft cotton pajama set for kids', price: 599, image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Kids', stock: 70, discount: 25 },
  { name: 'Girls Hoodie', description: 'Cute printed hoodie for girls', price: 799, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf6?w=400', category: 'Kids', stock: 50, discount: 20 },
];

const homeProducts = [
  { name: 'Scented Candle Set', description: 'Luxury scented candles for home decor', price: 799, image: 'https://images.unsplash.com/photo-1603905954713-aa21d95a1e4d?w=400', category: 'Home', stock: 50, discount: 20 },
  { name: 'Cushion Cover Set', description: 'Set of 5 printed cushion covers', price: 599, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'Home', stock: 60, discount: 15 },
  { name: 'Wall Clock', description: 'Minimalist wall clock for modern homes', price: 1299, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', category: 'Home', stock: 35, discount: 25 },
  { name: 'Bedsheet Set', description: '3 piece cotton bedsheet set', price: 1499, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', category: 'Home', stock: 45, discount: 20 },
  { name: 'Table Lamp', description: 'Elegant table lamp for bedroom', price: 1999, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', category: 'Home', stock: 30, discount: 15 },
  { name: 'Photo Frame Set', description: 'Set of 6 decorative photo frames', price: 699, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400', category: 'Home', stock: 55, discount: 20 },
  { name: 'Indoor Plant Pot', description: 'Ceramic pot for indoor plants', price: 499, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', category: 'Home', stock: 70, discount: 10 },
  { name: 'Kitchen Organizer', description: 'Bamboo kitchen organizer set', price: 899, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', category: 'Home', stock: 40, discount: 25 },
  { name: 'Curtain Set', description: 'Blackout curtains for bedroom', price: 1799, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', category: 'Home', stock: 35, discount: 20 },
  { name: 'Bath Towel Set', description: 'Soft cotton bath towel set of 4', price: 999, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', category: 'Home', stock: 50, discount: 15 },
  { name: 'Storage Basket', description: 'Woven storage basket for home', price: 699, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400', category: 'Home', stock: 60, discount: 20 },
  { name: 'Mirror', description: 'Decorative wall mirror for living room', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'Home', stock: 25, discount: 15 },
  { name: 'Dinner Set', description: '12 piece ceramic dinner set', price: 2999, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', category: 'Home', stock: 30, discount: 25 },
  { name: 'Aroma Diffuser', description: 'Electric aroma diffuser with oils', price: 1499, image: 'https://images.unsplash.com/photo-1603905954713-aa21d95a1e4d?w=400', category: 'Home', stock: 40, discount: 20 },
  { name: 'Doormat', description: 'Anti slip doormat for entrance', price: 349, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', category: 'Home', stock: 80, discount: 10 },
];

const allProducts = [
  ...skincare,
  ...makeup,
  ...mensFootwear,
  ...womensFootwear,
  ...womensClothing,
  ...mensClothing,
  ...kidsClothing,
  ...homeProducts,
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected!');
    await Product.deleteMany();
    await Product.insertMany(allProducts);
    console.log(`✅ ${allProducts.length} Products added successfully!`);
    process.exit();
  })
  .catch(err => console.log(err));
  
