const fs = require('fs');
const path = require('path');

const fetch = require('node-fetch');

const { 
  searchRedditPostsByTopicPromise,
  getRedditUrl 
} = require('../build/index');


jest.mock('node-fetch');

fetch.mockImplementation(async (url) => {

  const req = fs.readFileSync(path.resolve(__dirname, './testData.json'));
  const data = JSON.parse(req);

  return new Promise((resolve) => {
    resolve({ json: () => Promise.resolve({ data: { children: data } }) })
  })
})

describe('searchRedditPostsByTopicPromise', () => {

  describe('Data file', () => {

    beforeEach(() => {
      const directory = fs.readFileSync(path.resolve(__dirname, '../data.json'));

      if (fs.existsSync(directory)) {
        fs.unlinkSync(directory);
      }
      
    });

    it('should create a data.json file', async () => {
      await searchRedditPostsByTopicPromise('Gaming');

      const req = fs.readFileSync(path.resolve(__dirname, './testData.json'));
      const expectedData = JSON.parse(req);

      const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json')));

      expect.assertions(1);
      expect(expectedData).toEqual(data);
    })

  });

  describe('Get Reddit Url', () => {

    it('Should expect correct URL', () => {
      const redditUrl = getRedditUrl('Gaming');

      expect(redditUrl).toEqual('https://www.reddit.com/r/pics/search.json?q=Gaming&sort=new');
    });

  });

});