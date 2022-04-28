const supertest = require('supertest')
const {app, server} = require('../app')

const api = supertest(app)
let parkingId = '' 

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

        parkingId = res.body.response.data.id
        
        expect(res.body.response.data.id).toBeDefined()
    })

    it('If there are missing fields in the data, it should return an error and status 403', async () => {
        const payload = {
            price       : 700,
            type        : "Private",
            image       : "",
            description : "Describe test 1"
        }

        const response = await api.post('/api/v1/parking').send(payload)
        .set('Accept', 'application/json').expect(403);
        expect(response.body.errors).toBeDefined()
    })
});

describe('GET /api/v1/parking/:id', function() {
    it('Should return a status 200 if there is data that is being searched for by ID', async () => {
        const response = await api.get(`/api/v1/parking/${parkingId}`)
        .set('Accept', 'application/json').expect(200);

        expect(response.body.response.code).toEqual(200)
    })

    it('Should return a status 404 if data does not exist', async () => {
        const response = await api.get(`/api/v1/parking/Lalalala`)
        .set('Accept', 'application/json').expect(404);

        expect(response.body.response.code).toEqual(404)
    })
});


describe('DELETE /api/v1/parking/:id', () => {
    it('Should delete a car park by ID', async () => {
        const response = await api.delete(`/api/v1/parking/${parkingId}`)
        .set('Accept', 'application/json').expect(200);

        expect(response.body.response.code).toEqual(200)
    })
    
    it('Should return a 404 status if an ID that doesn\'t exist is deleted', async () => {
        const response = await api.delete(`/api/v1/parking/12385lalalal`)
        .set('Accept', 'application/json').expect(404);

        expect(response.body.response.code).toEqual(404)
    })
})

afterAll(() => {
    server.close()
})