const fs = require('fs');
const path = require('path');

const fetch = require('node-fetch');
const nock = require('nock');

const { 
  fetchRedditPostsByTopicPromise,
  getRedditUrl,
  extractFields,
  fetchJson
} = require('../build/index');

describe('fetchRedditPostsByTopicPromise', () => {

  describe('Fetch json', () => {

    // Parent function expects a certain response when url is requested

    // Should return a parsed json response
    it('Should match returned data', async () => {
      const redditUrl = 'https://reddit.com/r/pics/search.json?=Gaming&sort=new';

      const response = { data: { children: [{ title: 'RTX 3080 Crashes' }] } };

      nock('https://reddit.com')
        .get('/r/pics/search.json?=Gaming&sort=new')
        .reply(200, response);

      const request = await fetchJson(redditUrl)
        .then(res => res);

        expect(request).toEqual(response);
    });

  });

  describe('Get Reddit Url', () => {

    it('Should expect correct URL', () => {
      const redditUrl = getRedditUrl('Gaming');

      expect(redditUrl).toEqual('https://www.reddit.com/r/pics/search.json?q=Gaming&sort=new');
    });

    it('invalid type given to topic', () => {
      expect(() => getRedditUrl(['Gaming'])).toThrowError();
    });

  });

  describe('extract fields', () => {
    it('should return correct value', () => {
      const arrayOfObj = [{
        data: {
          name: 'Jordan Kelly',
          occupation: 'Software Engineer',
          company: 'Econify'
        }
      }];

      const extractedFields = extractFields(arrayOfObj, ['name', 'occupation']);

      expect(extractedFields).toEqual([{ name: 'Jordan Kelly', occupation: 'Software Engineer' }]);
    });

    it('should fail if data is not an array', () => {
      expect(() => extractFields('string')).toThrowError();
    });

    it('should throw error of fields contains a type other than a string', () => {
      const arrayOfObj = [{
        data: {
          name: 'Jordan Kelly',
          occupation: 'Software Engineer',
          company: 'Econify'
        }
      }];

      expect(() => extractFields(arrayOfObj, [1, 2, 3])).toThrowError();
    });
  });



});