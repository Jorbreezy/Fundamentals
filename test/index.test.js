const fs = require('fs');
const path = require('path');

const fetch = require('node-fetch');

const { 
  fetchRedditPostsByTopicPromise,
  getRedditUrl,
  extractFields
} = require('../build/index');


jest.mock('node-fetch');

fetch.mockImplementation(async (url) => {

  const req = fs.readFileSync(path.resolve(__dirname, './testData.json'));
  const data = JSON.parse(req);

  return new Promise((resolve) => {
    resolve({ json: () => Promise.resolve({ data: { children: data } }) });
  })
})

describe('fetchRedditPostsByTopicPromise', () => {

  describe('Json file', () => {

    beforeEach(() => {
      const directory = fs.readFileSync(path.resolve(__dirname, '../data.json'));

      if (fs.existsSync(directory)) {
        fs.unlinkSync(directory);
      }
      
    });

    it('should create a data.json file', async () => {
      await fetchRedditPostsByTopicPromise('Gaming');

      const req = fs.readFileSync(path.resolve(__dirname, './testData.json'));
      const expectedData = JSON.parse(req);

      const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json')));

      expect.assertions(1);
      expect(expectedData).toEqual(data);
    });

    it('Should match the filtered data', async () => {
      await fetchRedditPostsByTopicPromise('Gaming', ['id', 'title', 'thumbnail']);

      const req = fs.readFileSync(path.resolve(__dirname, './testFilteredData.json'));
      const expectedData = JSON.parse(req);

      const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json')));

      expect.assertions(1);
      expect(expectedData).toEqual(data);
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
      const arrayOfObj = [{data: {
        name: 'Jordan Kelly',
        occupation: 'Software Engineer',
        company: 'Econify'
      }}];

      const extractedFields = extractFields(arrayOfObj, ['name', 'occupation']);

      expect(extractedFields).toEqual([{ name: 'Jordan Kelly', occupation: 'Software Engineer' }]);
    });

    it('should fail if data is not an array', () => {
      expect(() => extractFields('string')).toThrowError();
    });

    it('should throw error of fields contains a type other than a string', () => {
      const arrayOfObj = [{data: {
        name: 'Jordan Kelly',
        occupation: 'Software Engineer',
        company: 'Econify'
      }}];

      expect(() => extractFields(arrayOfObj, [1, 2, 3])).toThrowError();
    });
  });

});