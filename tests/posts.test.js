import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../src/app');
const pool = require('../src/db/index.js');

beforeAll(async () => {
    await pool.query('DELETE FROM posts');
    await pool.query('DELETE FROM authors');
    await pool.query('ALTER SEQUENCE authors_id_seq RESTART WITH 1');
    await pool.query('ALTER SEQUENCE posts_id_seq RESTART WITH 1');
    await pool.query(`
    INSERT INTO authors (name, email, bio) VALUES
    ('Test Author', 'testauthor@example.com', 'Bio de prueba')
    `);
});

afterAll(async () => {
    await pool.end();
});

describe('POSTS endpoints', () => {
    it('GET /posts - devuelve lista vacia', async () => {
        const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
    });

    it('POST /posts - crea un post correctamente', async () => {
    const res = await request(app).post('/posts').send({
        title: 'Post de prueba',
        content: 'Contenido de prueba',
        author_id: 1,
        published: true
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Post de prueba');
    expect(res.body.author_id).toBe(1);
    });

    it('POST /posts - falla sin title', async () => {
    const res = await request(app).post('/posts').send({
        content: 'Contenido sin titulo',
        author_id: 1
    });
    expect(res.status).toBe(400);
    });

    it('POST /posts - falla sin author_id', async () => {
    const res = await request(app).post('/posts').send({
        title: 'Post sin autor',
        content: 'Contenido de prueba'
    });
    expect(res.status).toBe(400);
    });

    it('GET /posts/:id - devuelve post existente', async () => {
    const res = await request(app).get('/posts/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Post de prueba');
    });

    it('GET /posts/:id - devuelve 404 si no existe', async () => {
    const res = await request(app).get('/posts/999');
    expect(res.status).toBe(404);
    });

    it('DELETE /posts/:id - elimina post existente', async () => {
    const res = await request(app).delete('/posts/1');
    expect(res.status).toBe(204);
    });

    it('DELETE /posts/:id - devuelve 404 si no existe', async () => {
    const res = await request(app).delete('/posts/999');
    expect(res.status).toBe(404);
    });
});