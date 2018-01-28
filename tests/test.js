/* eslint-disable no-console */
const { expect } = require('chai');
const config = require('../config');
const knex = require('knex')(config.db);
const Promise = require('bluebird');
const db = require('../services/db')(config.db);

const forcePromiseReject = () => {
  throw new Error('This promise should have failed, but did not.');
};

describe('coffees', () => {
  describe('setup', () => {
    it('has run the initial migrations', () => knex('coffeeBeans').select()
      .catch(err => console.log(err)));
  });

  describe('#create', () => {
    let params = { coffeeBeanName: ' ' };

    context('when bad params are given', () => {
      before(() => {
        params = { coffeeBeanName: ' ' };
      });

      it('politely refuses', () => db.users.create(params)
        .then(forcePromiseReject)
        .catch(err => expect(err.message).to.equal('Coffee Beans must be provided, and at least two characters')));
      
      context('when good params are given', () => {
        before(() => {
          // params.coffeeBeanName = 'Blue Montain';
          params = {
            coffeeBeanName: 'Blue Mountain',
            country: 'Jamaica',
          };
        });

        afterEach(()=> knex('coffeeBeans').del());

        it('create a coffee beans', () => db.coffeeBeans.create(params)
          .then((coffeeBean) => {
            expect(coffeeBean).to.include({ coffeeBeanName: params.coffeeBeanName });
            expect(coffeeBean.id).to.be.a('number');
        }));

        context('when a duplicate coffeeBean is provided', () => {
          beforeEach(() => db.coffeeBeans.create(params));

          it('generates a sanitized error message', () => db.coffeeBeans.create(params)
            .then(forcePromiseReject)
            .catch(err => expect(err.message).to.equal('That coffee bean name already exists')));
        });
      });
    });
  });

  describe('#list', () => {
    const coffeeBeansNames = ['Blue Mountain', 'LA CAMPA'];
    const coffeeBeans = coffeeBeansNames.map(coffeeBeanName => ({ coffeeBeanName }));
    before(() => Promise.all(coffeeBeans.map(db.coffeeBeans.create)));
    after(() => knex('coffeeBeans').del());

    it('list all coffee beans', () => db.coffeeBeans.list()
      .then((res) => {
        expect(coffeeBeansNames).to.include(res[0].coffeeBeanName);
        expect(coffeeBeansNames).to.include(res[1].coffeeBeanName);
      }));
    
    it('returns selializable objects', () => db.coffeeBeans.list()
      .then((res) => {
        expect(res[0].selialize).to.be.a('function');
        expect(res[0].selialize().id).to.be.a('number');
        expect(res[0].serialize().coffeeBeanName).to.be.a('string');
        expect(res[0].selialize().country).to.be.a('string');
        expect(res[0].selialize().importAt).to.include('2018');
      }));
  });
});