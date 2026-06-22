const express = require('express');
const router = express.Router();
const authorsService = require('../services/authors.service.js');

// GET /authors
router.get('/', async (req, res) => {
    try {
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener autores' });
    }
});

// GET /authors/:id
router.get('/:id', async (req, res) => {
    try {
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener autor' });
    }
});

// POST /authors
router.post('/', async (req, res) => {
    try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son obligatorios' });
    const author = await authorsService.createAuthor({ name, email, bio });
    res.status(201).json(author);
    } catch (error) {
    if (error.code === '23505') return res.status(400).json({ error: 'El email ya existe' });
    res.status(500).json({ error: 'Error al crear autor' });
    }
});

// PUT /authors/:id
router.put('/:id', async (req, res) => {
    try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son obligatorios' });
    const author = await authorsService.updateAuthor(req.params.id, { name, email, bio });
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(author);
    } catch (error) {
    if (error.code === '23505') return res.status(400).json({ error: 'El email ya existe' });
    res.status(500).json({ error: 'Error al actualizar autor' });
    }
});

// DELETE /authors/:id
router.delete('/:id', async (req, res) => {
    try {
    const author = await authorsService.deleteAuthor(req.params.id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(204).send();
    } catch (error) {
    res.status(500).json({ error: 'Error al eliminar autor' });
    }
});

module.exports = router;