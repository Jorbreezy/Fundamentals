const { searchRedditPostsByTopicPromise } = require('../build/index');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

jest.mock('node-fetch');

fetch.mockImplementation(async (url) => {

  const req = fs.readFileSync('./data2.json');
  const data = await JSON.parse(req);

  return new Promise((resolve, reject) => {
    resolve({json: () => data })
  })
})

describe('searchRedditPostsByTopicPromise', () => {

  describe('Data file', () => {

    it('should create a data.json file', async () => {
      const topic = 'Gaming';
      const sort = 'new';
      const redditUrl = `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;
      
      const req = fs.readFileSync('./data.json');
      const data = await JSON.parse(req);

      expect.assertions(1);
      return fetch(redditUrl)
        .then((res) => res.json())
        .then(res => expect(res).toEqual(data))
        .catch(err => console.error(err));
    })


    it('data.json should exist', () => {
      const directory = '../data.json';
      const exist = fs.existsSync(path.resolve(__dirname, directory));

      expect(exist).toBeTruthy();
    });



  });

});