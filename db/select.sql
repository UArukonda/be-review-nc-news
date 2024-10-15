\c be_review_nc_news_test

\dt

-- select * from articles
-- SELECT * FROM articles ORDER BY created_at DESC;
SELECT article_id FROM articles;

SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes, articles.article_img_url,COUNT(comments.body) AS comment_count FROM articles LEFT JOIN comments on articles.article_id = comments.article_id GROUP BY articles.article_id;

--