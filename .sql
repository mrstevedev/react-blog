CREATE DATABASE made_blog_posts_test;

CREATE TABLE comments (
id integer,
post_id integer,
comment character varying,
name character varying,
createdAt date,
updatedAt date
);

CREATE TABLE posts (
id integer,
title character varying,
body character varying,
createdAt date,
updatedAt date
);