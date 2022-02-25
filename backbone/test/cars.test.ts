import supertest from 'supertest';
import { app, stopServer } from '../index';
import { stop } from '../src/db/mongooseConnection';
import { setupDB } from './fixtures/db';

beforeAll(async () => {
  await setupDB();
});

afterAll(async () => {
  stop();
  stopServer();
});

let token: string;
const carsObjects: Map<string, any> = new Map<string, any>();

test('Login.', async () => {
  const response = await supertest(app)
    .post('/login')
    .send({
      username: 'Qover',
      password: 'Ninja'
    })
    .expect(200);

  // expect((response.body.accessToken).toBeDefined());
  token = response.body.accessToken;
  console.log('TOKEN FETCHED AFTER LOGIN', token);
});

test('Get cars from DB.', async () => {
  const response = await supertest(app)
    .get('/api/cars')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  for (let i = 0; i < response.body.length; i++) {
    carsObjects.set(response.body[i].manufacturer, response.body[i]);
  }
  console.log('Cars fetched from DB', carsObjects);
});

test('Should compute valid offer for Audi.', async () => {
  const response = await supertest(app)
    .get('/api/cars/offer')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 18,
      carId: carsObjects.get('AUDI')._id,
      price: 7000
    });
  expect(response.body.globalPrice).toBe(250);
  expect(response.body.universalPrice).toBe(460);
});

test('Should not compute offer for Audi due to age restriction', async () => {
  const response = await supertest(app)
    .get('/api/cars/offer')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 15,
      carId: carsObjects.get('AUDI')._id,
      price: 7000
    })
    .expect(400);
  expect(response.body.message).toBe('Sorry! The driver is too young');
});

test('Should not compute offer for Audi due to car value restriction', async () => {
  const response = await supertest(app)
    .get('/api/cars/offer')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 21,
      carId: carsObjects.get('AUDI')._id,
      price: 4000
    })
    .expect(400);

  expect(response.body.message).toBe('Sorry! The price of the car is too low');
});

test('Should not compute offer for Porsche if the client is younger than 25', async () => {
  const response = await supertest(app)
    .get('/api/cars/offer')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 21,
      carId: carsObjects.get('PORSCHE')._id,
      price: 10000
    })
    .expect(400);

  expect(response.body.message).toBe('Sorry! We can not accept this particular risk');
});

test('Should compute offer for Porsche when 25 years old', async () => {
  const response = await supertest(app)
    .get('/api/cars/offer')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 25,
      carId: carsObjects.get('PORSCHE')._id,
      price: 10000
    })
    .expect(200);

  expect(response.body.globalPrice).toBe(500);
  expect(response.body.universalPrice).toBe(1200);
});

test('Should compute offer for Porsche when older than 25', async () => {
  const response = await supertest(app)
    .get('/api/cars/offer')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 26,
      carId: carsObjects.get('PORSCHE')._id,
      price: 10000
    })
    .expect(200);

  expect(response.body.globalPrice).toBe(500);
  expect(response.body.universalPrice).toBe(1200);
});
