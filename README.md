# Custom Blog

Custom Blog application built with React.js, Material UI, Express.js, & MongoDB.

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install dependencies.

## Inside /client

```bash
npm install
```

## Inside /

```bash
npm install
```

## Inside .env
Create a .env file in the root of the project.
```bash
DB_HOST=localhost
DB_USER=<username>
DB_PASS=<password>
DB_NAME=made_blog_posts
REACT_APP_API_URL=http://localhost:3001/api
```

## Postgresql Database
```bash
made_blog_posts
```

## Postgresql Tables
```bash
## posts

id pk integer
title character varying
body character varying
createdAt date
updatedAt date
```
```bash
## comments

id pk integer
post_id integer
comment character varying
name character varying
createdAt date
updatedAt date

```


## Inside the root directory run:

To run the client and the server.

```bash
npm run dev
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)