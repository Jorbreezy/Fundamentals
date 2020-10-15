const { searchRedditPostsByTopicPromise } = require('../build/index');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

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

    it('should create a data.json file', async () => {
      const req = fs.readFileSync(path.resolve(__dirname, './testData.json'));
      const expectedData = JSON.parse(req);

      await searchRedditPostsByTopicPromise('Gaming');

      const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json')));

      expect(expectedData).toEqual(data);
    })


    // it('data.json should exist', () => {
    //   const directory = '../data.json';
    //   const exist = fs.existsSync(path.resolve(__dirname, directory));

    //   expect(exist).toBeTruthy();
    // });


  });

});