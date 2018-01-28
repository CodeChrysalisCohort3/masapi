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
    it('has run the initial migrations', () => knex('coffee_beans').select()
      .catch(err => console.log(err)));
  });

  describe('#create', () => {
    let params = { coffeeBeanName: ' ' };

    context('when bad params are given', () => {
      before(() => {
        params = { coffeeBeanName: ' ' };
      });

      it('politely refuses', () => db.coffeeBeans.create(params)
        .then(forcePromiseReject)
        .catch(err => expect(err.message).to.equal('A name of coffee bean must be provided, and be at least two characters')));
    });
      
    context('when good params are given', () => {
      before(() => {
        // params.coffeeBeanName = 'Blue Montain';
        params = {
          coffeeBeanName: 'blue mountain',
          country: 'Jamaica',
        };
      });

      afterEach(()=> knex('coffee_beans').del());
      
      it('create a coffee beans', () => db.coffeeBeans.create(params)
      .then((coffeeBean) => {
        expect(coffeeBean).to.include({ coffeeBeanName: params.coffeeBeanName.toLowerCase() });
        expect(coffeeBean.id).to.be.a('number');
      }));
    });
    
    context('when a duplicate coffeeBean is provided', () => {
      beforeEach(() => db.coffeeBeans.create(params));
      afterEach(()=> knex('coffee_beans').del());
      
      it('generates a sanitized error message', () => db.coffeeBeans.create(params)
        .then(forcePromiseReject)
        .catch(err => expect(err.message).to.equal('That coffee bean has already existed')));
    });
  });

  describe('#list', () => {
    const coffeeBeansNames = ['blue mountain', 'la campa'];
    const countries = ['jamaica', 'hondurus'];
    const coffeeBeans = coffeeBeansNames.map((coffeeBeanName, index) => ({
      coffeeBeanName,
      country: countries[index],
    }));

    before(() => Promise.all(coffeeBeans.map(db.coffeeBeans.create)));
    after(() => knex('coffee_beans').del());

    it('list all coffee beans', () => db.coffeeBeans.list()
      .then((res) => {
        expect(coffeeBeansNames).to.include(res[0].coffeeBeanName);
        expect(coffeeBeansNames).to.include(res[1].coffeeBeanName);
      }));
    
    it('returns selializable objects', () => db.coffeeBeans.list()
      .then((res) => {
        expect(res[0].serialize).to.be.a('function');
        expect(res[0].serialize().id).to.be.a('number');
        expect(res[0].serialize().coffeeBeanName).to.be.a('string');
        expect(res[0].serialize().country).to.be.a('string');
        expect(res[0].serialize().importAt).to.include('2018');
      }));
  });
});