const app = require('../app');
const supertest = require('supertest');

test('GET /api/v1/auth/test', async () => {
    await supertest(app).get('/api/v1/auth/test').expect(200);
});

const { MockContext, Context, createMockContext } = require('../../context');

let mockCtx;
let ctx;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx;
});
