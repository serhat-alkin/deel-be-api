const request = require('supertest');
const app = require('../src/app');
const { Job, Profile, Contract, } = require('../src/model');
const httpStatus = require('http-status');

describe('Contracts', () => {
  describe('/contracts/:id', () => {
    beforeEach(async () => {
      await Job.sync({ force: true });
      await Profile.sync({ force: true });
      await Contract.sync({ force: true });
      await Promise.all([
        Profile.create({
          id: 1,
          firstName: 'Harry',
          lastName: 'Potter',
          profession: 'Wizard',
          balance: 1150,
          type:'client'
        }),
        Profile.create({
          id: 2,
          firstName: 'Mr',
          lastName: 'Robot',
          profession: 'Hacker',
          balance: 231.11,
          type:'client'
        }),
        Profile.create({
          id: 3,
          firstName: 'John',
          lastName: 'Snow',
          profession: 'Knows nothing',
          balance: 451.3,
          type:'client'
        }),
        Profile.create({
          id: 4,
          firstName: 'Ash',
          lastName: 'Kethcum',
          profession: 'Pokemon master',
          balance: 1.3,
          type:'client'
        }),
        Profile.create({
          id: 5,
          firstName: 'John',
          lastName: 'Lenon',
          profession: 'Musician',
          balance: 64,
          type:'contractor'
        }),
        Profile.create({
          id: 6,
          firstName: 'Linus',
          lastName: 'Torvalds',
          profession: 'Programmer',
          balance: 1214,
          type:'contractor'
        }),
        Profile.create({
          id: 7,
          firstName: 'Alan',
          lastName: 'Turing',
          profession: 'Programmer',
          balance: 22,
          type:'contractor'
        }),
        Profile.create({
          id: 8,
          firstName: 'Aragorn',
          lastName: 'II Elessar Telcontarvalds',
          profession: 'Fighter',
          balance: 314,
          type:'contractor'
        }),
        Contract.create({
          id:1,
          terms: 'bla bla bla',
         status: 'terminated',
          ClientId: 1,
          ContractorId:5
        }),
        Contract.create({
          id:2,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 1,
          ContractorId: 6
        }),
        Contract.create({
          id:3,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 2,
          ContractorId: 6
        }),
        Contract.create({
          id: 4,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 2,
          ContractorId: 7
        }),
        Contract.create({
          id:5,
          terms: 'bla bla bla',
          status: 'new',
          ClientId: 3,
          ContractorId: 8
        }),
        Contract.create({
          id:6,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 3,
          ContractorId: 7
        }),
        Contract.create({
          id:7,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 4,
          ContractorId: 7
        }),
        Contract.create({
          id:8,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 4,
          ContractorId: 6
        }),
        Contract.create({
          id:9,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 4,
          ContractorId: 8
        }),
      ]);
    });

    it('should return OK and contract ', async () => {
      const { statusCode, body } = await request(app)
        .get('/contracts/7')
        .set('profile_id', '4');
      expect(statusCode).toEqual(httpStatus.OK);
      expect(body.id).toEqual(7);
    });

    it('should return not found error', async () => {
      await request(app)
        .get('/contracts/250')
        .set('profile_id', '1')
        .expect(httpStatus.NOT_FOUND);
    });

    it('should return unathorized error when profile_id is not a match', async () => {
      await request(app)
        .get('/contracts/1')
        .set('profile_id', '199')
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('/contracts', () => {
    beforeEach(async () => {
      await Job.sync({ force: true });
      await Profile.sync({ force: true });
      await Contract.sync({ force: true });
      await Promise.all([
        Profile.create({
          id: 1,
          firstName: 'Harry',
          lastName: 'Potter',
          profession: 'Wizard',
          balance: 1150,
          type: 'client',
        }),
        Profile.create({
          id: 2,
          firstName: 'Mr',
          lastName: 'Robot',
          profession: 'Hacker',
          balance: 231.11,
          type: 'client',
        }),
        Profile.create({
          id: 3,
          firstName: 'John',
          lastName: 'Snow',
          profession: 'Knows nothing',
          balance: 451.3,
          type: 'client',
        }),
        Profile.create({
          id: 4,
          firstName: 'Ash',
          lastName: 'Kethcum',
          profession: 'Pokemon master',
          balance: 1.3,
          type: 'client',
        }),
        Profile.create({
          id: 5,
          firstName: 'John',
          lastName: 'Lenon',
          profession: 'Musician',
          balance: 64,
          type: 'contractor',
        }),
        Profile.create({
          id: 6,
          firstName: 'Linus',
          lastName: 'Torvalds',
          profession: 'Programmer',
          balance: 1214,
          type: 'contractor',
        }),
        Profile.create({
          id: 7,
          firstName: 'Alan',
          lastName: 'Turing',
          profession: 'Programmer',
          balance: 22,
          type: 'contractor',
        }),
        Profile.create({
          id: 8,
          firstName: 'Aragorn',
          lastName: 'II Elessar Telcontarvalds',
          profession: 'Fighter',
          balance: 314,
          type: 'contractor',
        }),
        Contract.create({
          id: 1,
          terms: 'bla bla bla',
          status: 'terminated',
          ClientId: 1,
          ContractorId: 5,
        }),
        Contract.create({
          id: 2,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 1,
          ContractorId: 6,
        }),
        Contract.create({
          id: 3,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 2,
          ContractorId: 6,
        }),
        Contract.create({
          id: 4,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 2,
          ContractorId: 7,
        }),
        Contract.create({
          id: 5,
          terms: 'bla bla bla',
          status: 'new',
          ClientId: 3,
          ContractorId: 8,
        }),
        Contract.create({
          id: 6,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 3,
          ContractorId: 7,
        }),
        Contract.create({
          id: 7,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 4,
          ContractorId: 7,
        }),
        Contract.create({
          id: 8,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 4,
          ContractorId: 6,
        }),
        Contract.create({
          id: 9,
          terms: 'bla bla bla',
          status: 'in_progress',
          ClientId: 4,
          ContractorId: 8,
        }),
      ]);
    });
    
    it('should return non terminated contracts for client', async () => {
      const { statusCode, body } = await request(app)
        .get('/contracts')
        .set('profile_id', '2');
      expect(statusCode).toEqual(200);
      expect(body).toHaveLength(2);
      expect(body[0].id).toEqual(3);
      expect(body[0].ClientId).toEqual(2);
      expect(body[1].id).toEqual(4);
      expect(body[1].ClientId).toEqual(2);
    });

    it('should return unauthorized error when profile is not found', async () => {
      const { statusCode } = await request(app)
        .get('/contracts')
        .set('profile_id', '298');
      expect(statusCode).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should return not found error', async () => {
      const { statusCode } = await request(app)
        .get('/contracts')
        .set('profile_id', '5');
      expect(statusCode).toEqual(httpStatus.NOT_FOUND);
    });
  });
});