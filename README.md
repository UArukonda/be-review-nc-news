# Northcoders News API Documentation

This API serves data for articles, topics, users, and comments. The following endpoints are available, each offering specific data and functionality.

## Setting up Environment Variables

This project requires environment variables to be set in order to run properly.

1. **Copy the `.env.example` file** to create your own environment files:

2. **Edit the copied `.env` files** (`.env.development` or `.env.test`) and replace the placeholder values with your own:

   - Set the environnmental variables (PGDATABASE) to dev or test databases respectively

3. Make sure to keep your `.env` files private. They should already be included in `.gitignore` to avoid pushing sensitive information to version control.

## Endpoints

## GET /api

`Description`: Returns a JSON representation of all available API endpoints.

<!-- Example Response: -->

json
{
"GET /api/topics": { "description": "serves an array of all topics" },
"GET /api/articles": { "description": "serves an array of all articles" },
}

## GET /api/topics

`Description`: Returns an array of all topics.
`Queries`: None

<!-- Example Response: -->

json
{
"topics": [
{ "slug": "football", "description": "Footie!" }
]
}

## GET /api/articles

`Description`: Returns an array of all articles.
`Queries`: None

author (optional) - filter articles by author
topic (optional) - filter articles by topic
sort_by (optional) - sort articles by a specific column (e.g., created_at, votes)
order (optional) - order results in ascending (asc) or descending (desc) order

<!-- Example Response: -->

json
{
"articles": [
{
"title": "Seafood substitutions are increasing",
"topic": "cooking",
"author": "weegembump",
"body": "Text from the article..",
"created_at": "2018-05-30T15:59:13.341Z",
"votes": 0,
"comment_count": 6
}
]
}

## GET /api/articles/

`Description`: Returns a specific article by article_id.

<!-- Example Response: -->

json
{
"article": {
"article_id": 3,
"title": "Eight pug gifs that remind me of mitch",
"topic": "mitch",
"author": "icellusedkars",
"body": "some gifs",
"created_at": 1604394720000,
"votes": 20,
"article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
}
}

## GET /api/articles/

/comments
`Description`: Returns comments associated with a specific article by article_id.

<!-- Example Response: -->

json
{
"comment": {
"article_id": 3,
"comment_id": 19,
"body": "good one",
"author": "icellusedkars",
"created_at": 1604394720000,
"votes": 20
}
}

## POST /api/articles/

/comments
`Description`: Adds a comment to a specific article by article_id.

<!-- Request Body: -->

json
{
"username": "commenter_name",
"body": "Your comment text here"
}

<!-- Example Response: -->

json
{
"comment": {
"article_id": 3,
"comment_id": 19,
"body": "good one",
"author": "icellusedkars",
"created_at": 1604394720000,
"votes": 20
}
}

## PATCH /api/articles/

`Description`: Updates one or multiple columns in an article by article_id.

<!-- Request Body: -->

json
{
"votes": 1 // (e.g., increment the vote count by 1)
}

<!-- Example Response: -->

json
{
"article": {
"article_id": 1,
"title": "title",
"topic": "topic",
"author": "author name",
"body": "comment",
"created_at": "date timestamp",
"votes": 100,
"article_img_url": "https://url-to-img"
}
}

## DELETE /api/comment/

`Description`: Deletes a comment from comments by comments_id.

<!-- Example Response: Empty response upon success. -->

## GET /api/users

`Description`: Returns an array of all users.

<!-- Example Response: -->

json
{
"comment": {
"username": "jsmith",
"name": "John Smith",
"avatar_url": "link to avatar"
}
}

## Additional Notes

All endpoints return JSON objects and adhere to RESTful API principles.
Error Handling: Each endpoint returns appropriate status codes and error messages for invalid requests.
Authorization: Some endpoints may require authorization in a production setting.
