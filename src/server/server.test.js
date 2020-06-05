
const request = require('supertest')
const express = require('express')
const app = express()
describe('Get Endpoints', () => {
  it('create a get on /', async () => {
    request(app)
    .get('/')
    .expect(function (res) {
      var code = 200;
      expect(res.status).toBe(code);
      done();
    })
  })
})