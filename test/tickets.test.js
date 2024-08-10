const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Ajusta la ruta según la ubicación de app.js

let server;

describe("Tickets API", () => {
    // Inicia el servidor antes de todas las pruebas
    beforeAll((done) => {
        server = app.listen(4000, () => {
            console.log("Test server running on port 4000");
            done(); // Indica que el servidor está listo
        });
    });

    // Cierra el servidor y la conexión de MongoDB después de todas las pruebas
    afterAll((done) => {
        mongoose.connection.close().then(() => {
            server.close(done); // Cierra el servidor y llama a done() cuando esté cerrado
        }).catch(err => {
            console.error("Error closing MongoDB connection", err);
            done(); // Asegúrate de llamar a done() en caso de error
        });
    });

    test("should create a new ticket", async () => {
        const token = "testToken"; // Asegúrate de que este token sea válido para tu API

        const response = await request(app)
            .post('/api/tickets') // Asegúrate de que esta URL sea correcta
            .set("Authorization", `Bearer ${token}`) // Configura la cabecera de autorización
            .send({
                title: "Test Ticket", // Envía un título para el ticket
                description: "This is a test ticket", // Envía una descripción para el ticket
                price: 100, // Envía un precio para el ticket
            });

        expect(response.status).toBe(201); // Espera que el estado de la respuesta sea 201 (creado)
        expect(response.body).toHaveProperty('title', 'Test Ticket'); // Verifica que el título del ticket sea el esperado
        expect(response.body).toHaveProperty('description', 'This is a test ticket'); // Verifica la descripción
        expect(response.body).toHaveProperty('price', 100); // Verifica el precio
    });
});
