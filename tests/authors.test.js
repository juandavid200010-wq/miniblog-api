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
});

afterAll(async () => {
    await pool.end();
});

describe('AUTHORS endpoints', () => {
    it('GET /authors - devuelve lista vacia', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
    });

    it('POST /authors - crea un autor correctamente', async () => {
    const res = await request(app).post('/authors').send({
        name: 'Test User',
        email: 'test@example.com',
        bio: 'Bio de prueba'
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test User');
    expect(res.body.email).toBe('test@example.com');
    });

    it('POST /authors - falla sin name', async () => {
        const res = await request(app).post('/authors').send({
        email: 'sin-nombre@example.com'
    });
    expect(res.status).toBe(400);
    });

    it('POST /authors - falla con email duplicado', async () => {
    const res = await request(app).post('/authors').send({
        name: 'Otro User',
        email: 'test@example.com'
    });
    expect(res.status).toBe(400);
    });

    it('GET /authors/:id - devuelve autor existente', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test User');
    });

    it('GET /authors/:id - devuelve 404 si no existe', async () => {
    const res = await request(app).get('/authors/999');
    expect(res.status).toBe(404);
    });

    it('DELETE /authors/:id - elimina autor existente', async () => {
    const res = await request(app).delete('/authors/1');
    expect(res.status).toBe(204);
    });

    it('DELETE /authors/:id - devuelve 404 si no existe', async () => {
    const res = await request(app).delete('/authors/999');
    expect(res.status).toBe(404);
    });
});