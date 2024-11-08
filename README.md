# UA News API Documentation

This API (`https://be-review-nc-news.onrender.com/api`) provides a range of endpoints to interact with and retrieve data related to articles, topics, users, and comments. It supports core functionalities essential for building a news or review-based application. Each endpoint is optimized to handle specific data requirements, enabling efficient interactions and streamlined access.

### Setup Instructions

Follow these steps to clone the repository, install dependencies, seed a local database, and run tests.

#### 1. Clone the Repository

`git clone https://github.com/your-username/your-repository.git`
`cd your-repository`

Replace `your-username/your-repository` with the actual GitHub repository path.

#### 2. Install Dependencies

In the project root directory, install the required dependencies by running:

`npm install`

This command installs all dependencies listed in `package.json` required to run and test the application.

#### 3. Set Up the Local Database

1. **Create Environment Files**

This project requires environment variables to be set in order to run properly.

<!-- 1. **Copy the `.env.**example` file** **to create your own environment files: -->

2. **Edit the copied `.env` files** (`.env.development` or `.env.test`) and replace the placeholder values with your own:

   - Set the environnmental variables (PGDATABASE) to dev or test databases respectively

3. Make sure to keep your `.env` files private. They should already be included in `.gitignore` to avoid pushing sensitive information to version control.

4. **Create and Seed the Database**

   Run the following scripts to create and seed your local databases:

   `npm run setup-dbs ` # Creates both development and test databases
   `npm run seed ` # Seeds the development database

   - `setup-dbs` will initialize the databases specified in the `.env` files.
   - `seed` will populate your development database (`nc_news`) with initial data.

#### 4. Run Tests

After setting up your local databases, you can run tests to ensure everything is working as expected:

npm test

This command will execute the test suite, which runs against the `test` database defined in `.env.test`. Make sure to seed your test database before running tests if any specific data is required.

### Additional Scripts

- **Resetting Databases**: To drop and recreate databases, use `npm run setup-dbs`.
- **Linting and Code Formatting**: Some projects may include `lint` and `format` scripts to keep code quality consistent. Run these if available.

With these steps completed, you should be set up to develop and test the application locally.

## Requirements

Before you install and run the project, make sure you have the following requirements met:

Node.js: v22.6.0 or higher
npm: v10.8.3 or higher
psql: psql (PostgreSQL) 14.13

## Endpoints

## GET /api

**Description**: Returns a JSON representation of all available API endpoints.

**Example Response**:

json
{
"GET /api/topics": { "description": "serves an array of all topics" },
"GET /api/articles": { "description": "serves an array of all articles" },
}

## GET /api/topics

**Description**: Returns an array of all topics.
`Queries`: None

**Example Response**:

json
{
"topics": [
{ "slug": "football", "description": "Footie!" }
]
}

## GET /api/articles

**Description**: Returns an array of all articles.
`Queries`: None

author (optional) - filter articles by author
topic (optional) - filter articles by topic
sort_by (optional) - sort articles by a specific column (e.g., created_at, votes)
order (optional) - order results in ascending (asc) or descending (desc) order

**Example Response**:

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

**Description**: Returns a specific article by article_id.

**Example Response**:

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

## GET /api/articles/:article_id/comments

**Description**: Returns comments associated with a specific article by article_id.

**Example Response**:

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

## POST /api/articles/:article_id/comments

**Description**: Adds a comment to a specific article by article_id.

<!-- Request Body: -->

json
{
"username": "commenter_name",
"body": "Your comment text here"
}

**Example Response**:

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

**Description**: Updates one or multiple columns in an article by article_id.

<!-- Request Body: -->

json
{
"votes": 1 // (e.g., increment the vote count by 1)
}

**Example Response**:

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

**Description**: Deletes a comment from comments by comments_id.

**Example Response**: Empty response upon success.

## GET /api/users

**Description**: Returns an array of all users.

**Example Response**:

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

##

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
