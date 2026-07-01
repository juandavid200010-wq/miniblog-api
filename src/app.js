const express = require('express');
const app = express();

const authorsRoutes = require('./routes/authors.routes.js');
const postsRoutes = require('./routes/posts.routes.js');
const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a MiniBlog API' });
});

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;