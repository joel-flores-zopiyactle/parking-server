const supertest = require('supertest')
const {app, server} = require('../app')

const api = supertest(app)
let parking = []

describe('GET /api/v1/parking', () => {
    
    it('responds with json', async () => {
        await api.get('/api/v1/parking')
        .send('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    });
});


describe('POST /api/v1/parking', function() {
    it('Should register new parking', async () => {
        const payload = {
            address     : "Address test",
            amenities   : ["Amenitie test 1", "Amenitie test 2"],
            score       : 3,
            price       : 2000,
            type        : "Private",
            image       : "",
            description : "Describe test 1"
        }

        const res = await api.post('/api/v1/parking').send(payload)
        .set('Accept', 'application/json').expect(201);
        
        expect(res.data?.id).not.toBeNull()
    })

    it('If there are missing fields in the data, it should return an error and status 403', async () => {
        const payload = {
            price       : 2000,
            type        : "Private",
            image       : "",
            description : "Describe test 1"
        }

        const response = await api.post('/api/v1/parking').send(payload)
        .set('Accept', 'application/json').expect(403);
        expect(response.errors).not.toBeNull()
    })
});

describe('Get /api/v1/parking/:id', function() {
    it('Should register new parking', async () => {
        const response = await api.get('/api/v1/parking/')
        .set('id', 'dhbskjfvsdkjv')
        .set('Accept', 'application/json').expect(200);

        expect(response.data?.id).not.toBeNull()
    })

    /* it('If there are missing fields in the data, it should return an error and status 403', async () => {
        const payload = {
            price       : 2000,
            type        : "Private",
            image       : "",
            description : "Describe test 1"
        }

        const response = await api.post('/api/v1/parking').send(payload)
        .set('Accept', 'application/json').expect(403);
        expect(response.errors).not.toBeNull()
    }) */
});

afterAll(() => {
    server.close()
})