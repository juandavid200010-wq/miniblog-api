const express = require('express');
const app = express();

app.use(express.json());

const authorsRoutes = require('./routes/authors.routes.js');
const postsRoutes = require('./routes/posts.routes.js');

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a MiniBlog API' });
});

module.exports = app;