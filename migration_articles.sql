-- Добавляем колонку article в таблицу products
ALTER TABLE products ADD COLUMN IF NOT EXISTS article TEXT;

-- =====================
-- АНОРАКИ (точное совпадение по цветам с AP-ANRK серией)
-- =====================
UPDATE products SET article = 'AP-ANRK-F01' WHERE slug = 'anorak-chernyy';
UPDATE products SET article = 'AP-ANRK-F02' WHERE slug = 'anorak-molochnyy';
UPDATE products SET article = 'AP-ANRK-F03' WHERE slug = 'anorak-krasnyy';
UPDATE products SET article = 'AP-ANRK-F04' WHERE slug = 'anorak-temno-seryy';
UPDATE products SET article = 'AP-ANRK-F05' WHERE slug = 'anorak-korichnevyy';

-- =====================
-- ФУТБОЛКИ (AP-FUT серия — PATCHI коллекция)
-- BLACK  → черный
-- BROWN  → коричневый
-- WHITE  → молочный (ближайший)
-- (ORANGE и BLUE в базе отсутствуют — вместо них красный и серый)
-- =====================
UPDATE products SET article = 'AP-FUT001F' WHERE slug = 'futbolka-s-neobrabotannymi-krayami-chernyy';
UPDATE products SET article = 'AP-FUT004F' WHERE slug = 'futbolka-s-neobrabotannymi-krayami-korichnevyy';
UPDATE products SET article = 'AP-FUT002F' WHERE slug = 'futbolka-s-neobrabotannymi-krayami-molochnyy';
-- Красный и серый — артикулы уточни, пока временные:
UPDATE products SET article = 'AP-FUT003F' WHERE slug = 'futbolka-s-neobrabotannymi-krayami-krasnyy';
UPDATE products SET article = 'AP-FUT005F' WHERE slug = 'futbolka-s-neobrabotannymi-krayami-seryy';

-- =====================
-- ЗИП-ХУДИ (HOODY001F серия — по одному артикулу на цвет)
-- =====================
UPDATE products SET article = 'HOODY001F-BLK' WHERE slug = 'zip-hudi-chernyy';
UPDATE products SET article = 'HOODY001F-BEJ' WHERE slug = 'zip-hudi-bezhevyy';
UPDATE products SET article = 'HOODY001F-GRY' WHERE slug = 'zip-hudi-seryy-melanzh';
UPDATE products SET article = 'HOODY001F-BRN' WHERE slug = 'zip-hudi-korichnevyy';

-- =====================
-- СВИТШОТ
-- =====================
UPDATE products SET article = 'SWEAT-F001-BLK' WHERE slug = 'svitshot-chernyy';
