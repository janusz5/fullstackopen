CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('testauthor', 'testurl', 'testtitle', 5);
INSERT INTO blogs (url, title) VALUES ('sparseBlogURL', 'sparseBlogTitle');
