-- Migration: color variants support
-- Run this in Supabase SQL editor

alter table products add column if not exists color text;
alter table products add column if not exists model_slug text;

-- Футболки с необработанными краями
update products set color = 'красный',     model_slug = 'futbolka-s-neobrabotannymi-krayami' where id = 'f1000000-0000-0000-0000-000000000001';
update products set color = 'коричневый',  model_slug = 'futbolka-s-neobrabotannymi-krayami' where id = 'f1000000-0000-0000-0000-000000000002';
update products set color = 'серый',       model_slug = 'futbolka-s-neobrabotannymi-krayami' where id = 'f1000000-0000-0000-0000-000000000003';
update products set color = 'молочный',    model_slug = 'futbolka-s-neobrabotannymi-krayami' where id = 'f1000000-0000-0000-0000-000000000004';
update products set color = 'черный',      model_slug = 'futbolka-s-neobrabotannymi-krayami' where id = 'f1000000-0000-0000-0000-000000000005';

-- Анораки
update products set color = 'черный',      model_slug = 'anorak' where id = 'f1000000-0000-0000-0000-000000000006';
update products set color = 'молочный',    model_slug = 'anorak' where id = 'f1000000-0000-0000-0000-000000000007';
update products set color = 'красный',     model_slug = 'anorak' where id = 'f1000000-0000-0000-0000-000000000008';
update products set color = 'темно-серый', model_slug = 'anorak' where id = 'f1000000-0000-0000-0000-000000000009';
update products set color = 'коричневый',  model_slug = 'anorak' where id = 'f1000000-0000-0000-0000-000000000010';

-- Зип-Худи
update products set color = 'черный',       model_slug = 'zip-hudi' where id = 'f1000000-0000-0000-0000-000000000011';
update products set color = 'бежевый',      model_slug = 'zip-hudi' where id = 'f1000000-0000-0000-0000-000000000012';
update products set color = 'серый меланж', model_slug = 'zip-hudi' where id = 'f1000000-0000-0000-0000-000000000013';
update products set color = 'коричневый',   model_slug = 'zip-hudi' where id = 'f1000000-0000-0000-0000-000000000014';

-- Свитшот
update products set color = 'черный', model_slug = 'svitshot' where id = 'f1000000-0000-0000-0000-000000000015';

-- Костюмы спортивные из жатой ткани — модель I
update products set color = 'черный',  model_slug = 'kostyum-sportivnyy-iz-zhatoy-tkani-1' where id = 'f2000000-0000-0000-0000-000000000001';
update products set color = 'хаки',    model_slug = 'kostyum-sportivnyy-iz-zhatoy-tkani-1' where id = 'f2000000-0000-0000-0000-000000000003';
update products set color = 'графит',  model_slug = 'kostyum-sportivnyy-iz-zhatoy-tkani-1' where id = 'f2000000-0000-0000-0000-000000000004';

-- Костюмы спортивные из жатой ткани — модель II
update products set color = 'черный',  model_slug = 'kostyum-sportivnyy-iz-zhatoy-tkani-2' where id = 'f2000000-0000-0000-0000-000000000002';
update products set color = 'хаки',    model_slug = 'kostyum-sportivnyy-iz-zhatoy-tkani-2' where id = 'f2000000-0000-0000-0000-000000000006';
update products set color = 'графит',  model_slug = 'kostyum-sportivnyy-iz-zhatoy-tkani-2' where id = 'f2000000-0000-0000-0000-000000000005';

-- Index for fast lookup by model_slug
create index if not exists idx_products_model_slug on products(model_slug);
