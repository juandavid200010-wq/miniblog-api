const express = require('express');
const router = express.Router();
const postsService = require('../services/posts.service.js');

// GET /posts
router.get('/', async (req, res) => {
    try {
    const posts = await postsService.getAllPosts();
    res.json(posts);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener posts' });
    }
});

// GET /posts/author/:authorId
router.get('/author/:authorId', async (req, res) => {
    try {
    const posts = await postsService.getPostsByAuthorId(req.params.authorId);
    if (!posts.length) return res.status(404).json({ error: 'No se encontraron posts para este autor' });
    res.json(posts);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener posts del autor' });
    }
});

// GET /posts/:id
router.get('/:id', async (req, res) => {
    try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener post' });
    }
});

// POST /posts
router.post('/', async (req, res) => {
    try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
        return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
    }
    const post = await postsService.createPost({ title, content, author_id, published });
    res.status(201).json(post);
    } catch (error) {
    if (error.code === '23503') return res.status(400).json({ error: 'El author_id no existe' });
    res.status(500).json({ error: 'Error al crear post' });
    }
});

// PUT /posts/:id
router.put('/:id', async (req, res) => {
    try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
        return res.status(400).json({ error: 'title, content y author_id son obligatorios' });
    }
    const post = await postsService.updatePost(req.params.id, { title, content, author_id, published });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
    } catch (error) {
    if (error.code === '23503') return res.status(400).json({ error: 'El author_id no existe' });
    res.status(500).json({ error: 'Error al actualizar post' });
    } 
});

// DELETE /posts/:id
router.delete('/:id', async (req, res) => {
    try {
    const post = await postsService.deletePost(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
    } catch (error) {
    res.status(500).json({ error: 'Error al eliminar post' });
    }
});

module.exports = router;