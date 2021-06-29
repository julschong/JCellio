const { PrismaClient } = require('@prisma/client');
const { MockProxy, mockDeep } = require('jest-mock-extended');

exports.createMockContext = () => {
    return {
        prisma: mockDeep()
    };
};
