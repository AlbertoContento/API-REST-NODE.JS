import request from 'supertest'; // Importamos 'supertest' para realizar pruebas HTTP
import mongoose from 'mongoose'; // Importamos 'mongoose' para manejar la base de datos MongoDB
import app from '../app.js'; // Importamos la instancia de la aplicación Express desde 'app.js'
import server from '../server.js'; // Asegúrate de que 'server' está correctamente exportado desde 'server.js'
import User from '../models/user.js';
describe('Users API', () => {
    beforeAll(async () => {
        await User.deleteMany();
    });
    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

    test('create a new user', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                name: 'Test User',
                email: 'test@email.com',
                password: '12345678',
                role: 'user',
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');

    });

    test('login user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@email.com',
                password: '12345678',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});