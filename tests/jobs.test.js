const request = require('supertest');
const app = require('../src/app');
const { Profile, Contract, Job } = require('../src/model');
const httpStatus = require('http-status');

describe('Jobs', () => {
  describe('/jobs/unpaid', () => {
    beforeEach(async () => {
      await Profile.sync({ force: true });
      await Contract.sync({ force: true });
      await Job.sync({ force: true });
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
        Job.create({
          description: 'work',
          price: 200,
          ContractId: 1,
        }),
        Job.create({
          description: 'work',
          price: 201,
          ContractId: 2,
        }),
        Job.create({
          description: 'work',
          price: 202,
          ContractId: 3,
        }),
        Job.create({
          description: 'work',
          price: 200,
          ContractId: 4,
        }),
        Job.create({
          description: 'work',
          price: 200,
          ContractId: 7,
        }),
        Job.create({
          description: 'work',
          price: 2020,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 7,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 2,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-16T19:11:26.737Z',
          ContractId: 3,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-17T19:11:26.737Z',
          ContractId: 1,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-17T19:11:26.737Z',
          ContractId: 5,
        }),
        Job.create({
          description: 'work',
          price: 21,
          paid: true,
          paymentDate: '2020-08-10T19:11:26.737Z',
          ContractId: 1,
        }),
        Job.create({
          description: 'work',
          price: 21,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 2,
        }),
        Job.create({
          description: 'work',
          price: 121,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 3,
        }),
        Job.create({
          description: 'work',
          price: 121,
          paid: true,
          paymentDate: '2020-08-14T23:11:26.737Z',
          ContractId: 3,
        }),
        Job.create({
          description: 'unpaid work',
          price: 222,
          paid: false,
          ContractId: 3,
        }),
      ]);
    });

    it('should return OK', async () => {
      const { statusCode, body } = await request(app)
        .get('/jobs/unpaid')
        .set('profile_id', '2');
      expect(statusCode).toEqual(httpStatus.OK);
      expect(body).toHaveLength(1);
      expect(body[0].id).toEqual(15);
    });

    it('should return not found if profile id does not match with any job', async () => {
      const { statusCode, body } = await request(app)
        .get('/jobs/unpaid')
        .set('profile_id', '1');
      expect(statusCode).toEqual(httpStatus.NOT_FOUND);
    });


    it('should return 401 if profile id does not match with any user', async () => {
      const { statusCode } = await request(app)
        .get('/jobs/unpaid')
        .set('profile_id', '244');
      expect(statusCode).toEqual(httpStatus.UNAUTHORIZED);
    });
  });

   describe('/jobs/:id/pay', () => {
    beforeEach(async () => {
      await Profile.sync({ force: true });
      await Contract.sync({ force: true });
      await Job.sync({ force: true });

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
        Job.create({
          description: 'work',
          price: 200,
          ContractId: 1,
        }),
        Job.create({
          description: 'work',
          price: 201,
          ContractId: 2,
        }),
        Job.create({
          description: 'work',
          price: 202,
          ContractId: 3,
        }),
        Job.create({
          description: 'work',
          price: 200,
          ContractId: 4,
        }),
        Job.create({
          description: 'work',
          price: 200,
          ContractId: 7,
        }),
        Job.create({
          description: 'work',
          price: 2020,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 7,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 2,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-16T19:11:26.737Z',
          ContractId: 3,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-17T19:11:26.737Z',
          ContractId: 1,
        }),
        Job.create({
          description: 'work',
          price: 200,
          paid: true,
          paymentDate: '2020-08-17T19:11:26.737Z',
          ContractId: 5,
        }),
        Job.create({
          description: 'work',
          price: 21,
          paid: true,
          paymentDate: '2020-08-10T19:11:26.737Z',
          ContractId: 1,
        }),
        Job.create({
          description: 'work',
          price: 21,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 2,
        }),
        Job.create({
          description: 'work',
          price: 121,
          paid: true,
          paymentDate: '2020-08-15T19:11:26.737Z',
          ContractId: 3,
        }),
        Job.create({
          id:24,
          description: 'work',
          price: 121,
          paid: true,
          paymentDate: '2020-08-14T23:11:26.737Z',
          ContractId: 3,
        }),
        Job.create({
          id:25,
          description: 'unpaid work',
          price: 222,
          paid: false,
          ContractId: 8,
        }),
      ]);
    });
  
    it('should pay money from client to contractor', async () => {
      const { statusCode, body } = await request(app)
        .post('/jobs/2/pay')
        .set('profile_id', '1');
      expect(statusCode).toEqual(httpStatus.OK);
      expect(body.job.paid).toEqual(true);

      const [client, contractor] = await Promise.all([
        Profile.findByPk(1),
        Profile.findByPk(6),
      ]);
      expect(client.balance).toEqual(949)
      expect(contractor.balance).toEqual(1415)
    });

    it('should return 404 when job is not found', async () => {
      const { statusCode } = await request(app)
        .post('/jobs/33/pay')
        .set('profile_id', '1');
      expect(statusCode).toEqual(httpStatus.NOT_FOUND);
    });

    it('should return 400 when client has insufficient funds', async () => {
      const { statusCode } = await request(app)
        .post('/jobs/25/pay')
        .set('profile_id', '4');
      expect(statusCode).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should return 400 when job is paid', async () => {
      const { statusCode } = await request(app)
        .post('/jobs/24/pay')
        .set('profile_id', '2');
      expect(statusCode).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should return unauthorized if profile is not match', async () => {
      const { statusCode } = await request(app)
        .post('/jobs/2/pay')
        .set('profile_id', '1222');
      expect(statusCode).toEqual(httpStatus.UNAUTHORIZED);
    });
  });
});