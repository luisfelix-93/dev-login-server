const request = require('supertest');
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Mock UserService
jest.mock('../src/service/UserService', () => {
    return {
        getUserByUserName: jest.fn()
    };
});




const UserService = require('../src/service/UserService');
const SessionController = require('../src/controllers/SessionController');

const app = express();
app.use(bodyParser.json());
app.post('/session', SessionController.create);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
}, 30000); 


// Test
describe('SessionService', () => {
    it('should create a session and return token', async () => {
        const user = {
            id: new mongoose.Types.ObjectId(),
            userName: 'testuser',
            password: bcrypt.hashSync('testpassword', 8)
        };

        UserService.getUserByUserName.mockResolvedValue(user);

        const response = await request(app)
            .post('/session')
            .send({ userName: 'testuser', password: 'testpassword' });

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('token');
        expect(response.body.data.token).toBeTruthy();
    });

    it('should return 401 for invalid user', async () => {
        // Mock para retornar null para simular usuário inválido
        UserService.getUserByUserName.mockResolvedValue(null);

        const response = await request(app)
            .post('/session')
            .send({ userName: 'invaliduser', password: 'invalidpassword' });

        console.log(response.body); // Log para verificar a estrutura da resposta

        expect(response.status).toBe(401);
    });

    it('should return 500 for server errors', async () => {
        UserService.getUserByUserName.mockImplementation(() => {
            throw new Error('Server error');
        });

        const response = await request(app)
            .post('/session')
            .send({ userName: 'testuser', password: 'testpassword' });

        expect(response.status).toBe(500);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}, 30000); // Aumentando o timeout para 30 segundos