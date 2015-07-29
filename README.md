Kali Core
========

The Core layer for Kali, exposing models and the persistence layer, written in Node and Bookshelf.

## Setting up the project locally

First, `git clone` this repository to your machine, then `npm install` the dependencies. You'll need to set up a Postgres database either locally or remotely, along with a user with permission on that database.

## Setting up the database

Kali Core uses the Knex migration API to set up the Postgres database. This is exposed through Gulp tasks.

### Running the migrations

To run the migrations, ensure that you have your `.env` file set up, then run `gulp migrate:latest` in the root directory of the project. This will create the schemas and relations.

To roll back a migration, you can use `gulp migrate:rollback`.

### Seeding the db with test data

Use `gulp seed:run` to seed the database with test data.

## Running the tests

Tests are handled with mocha and gulp. Use `gulp test` to run the unit tests. Right now, these don't exist, because I haven't gotten to them. (Bad, I know.)