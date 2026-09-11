-- MNB College dynamic website database schema (PostgreSQL / Neon)
CREATE TABLE IF NOT EXISTS website_media (
  id SERIAL PRIMARY KEY,
  section VARCHAR(30) NOT NULL CHECK (section IN ('home','gallery','photos','videos')),
  slot_key VARCHAR(80),
  media_type VARCHAR(20) NOT NULL DEFAULT 'image' CHECK (media_type IN ('image','video')),
  title VARCHAR(200),
  description TEXT,
  file_url TEXT NOT NULL,
  poster_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_website_media_section ON website_media(section,is_active,display_order);

CREATE TABLE IF NOT EXISTS news_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  slug VARCHAR(250) NOT NULL UNIQUE,
  summary TEXT,
  content TEXT,
  image_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'published',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  venue VARCHAR(250),
  image_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'published',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fee_structures (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  term_label VARCHAR(100),
  year INTEGER NOT NULL,
  description TEXT,
  pdf_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fee_items (
  id SERIAL PRIMARY KEY,
  fee_structure_id INTEGER NOT NULL REFERENCES fee_structures(id) ON DELETE CASCADE,
  class_name VARCHAR(150) NOT NULL,
  item_name VARCHAR(200) NOT NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Initial media records point to files already in /public.
INSERT INTO website_media(section,media_type,title,description,file_url,display_order)
SELECT * FROM (VALUES
 ('home','image','Your Passion, Your Profession','Raising disciplined, God-fearing and academically excellent learners.','/image1.png',1),
 ('home','image','Christian-Based Day & Boarding School','A caring learning environment built on faith and discipline.','/image2.png',2),
 ('home','image','Student Life','Learners growing in character, confidence and leadership.','/image3.png',3),
 ('gallery','image','School Assembly','MNB College life and learning.','/image1.png',1),
 ('gallery','image','Student Event','MNB College life and learning.','/image2.png',2),
 ('photos','image','Science and Innovation','Practical learning in modern laboratories.','/IMG_20230630_151418.jpg',1),
 ('photos','image','Practical Learning','Equipped for the future.','/IMG_20230630_171411.jpg',2),
 ('videos','video','MNB College Video 1','School life and activities.','/VID-20260618-WA0033.mp4',1),
 ('videos','video','MNB College Video 2','Learning and student development.','/VID-20260618-WA0034.mp4',2)
) AS seed(section,media_type,title,description,file_url,display_order)
WHERE NOT EXISTS (SELECT 1 FROM website_media);
