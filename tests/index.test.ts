import nock from 'nock';

import fetchRedditPostsByTopic, { fetchJson, extractFields, getRedditUrl } from '../lib/index';

import { Post, SubredditPostData } from '../lib/interfaces/Posts';

describe('fetchRedditPostsByTopicPromise', () => {

  describe('Fetch json', () => {

    const mockResponse = { 
      data: { 
        children: [
          { data: { id: 1, title: 'RTX 3080 Crashes', thumbnail: 'self', subreddit: 'Nvidia', ups: 635, downs: 34 } },
          { data: { id: 2, title: 'Cyberpunk 2077 goes gold', thumbnail: 'self', subreddit: 'Nvidia', ups: 1124, downs: 450 } },
          { data: { id: 3, title: 'PS5 release data', thumbnail: 'self', subreddit: 'Nvidia', ups: 12903 , downs: 2415 } }
        ] 
      } 
    };

    const HOST = 'https://www.reddit.com';
    const PATH = '/r/pics/search.json?q=Gaming&sort=new';

    const REDDIT_URL = HOST + PATH;

    it('Should match returned data', async () => {
      const responseData = { data: { children: [{ title: 'RTX 3080 Crashes' }] } };

      nock(HOST)
        .get(PATH)
        .reply(200, responseData);

      const request = await fetchJson(REDDIT_URL);
        
      expect(request).toEqual(responseData);
    });

    it('Should return a certain response when only topic is passed', async () => {
      const { data: { children } } = mockResponse;

      nock(HOST)
        .get(PATH)
        .reply(200, mockResponse);

      const request = await fetchRedditPostsByTopic('Gaming');

      expect(request).toEqual(children);
    });

    it('Should return a certain response when topic and fields is passed', async () => {
      const fields = ['id', 'title'];

      nock(HOST)
        .get(PATH)
        .reply(200, mockResponse);

      const request = await fetchRedditPostsByTopic('Gaming', fields);

      const expectedResponse = [
            { id: 1, title: 'RTX 3080 Crashes' } ,
            { id: 2, title: 'Cyberpunk 2077 goes gold'  },
            { id: 3, title: 'PS5 release data' } 
          ];

      expect(request).toEqual(expectedResponse);
    });

  });

  describe('Get Reddit Url', () => {

    it('Should expect correct URL', () => {
      const redditUrl = getRedditUrl('Gaming');

      expect(redditUrl).toEqual('https://www.reddit.com/r/pics/search.json?q=Gaming&sort=new');
    });

    // it('invalid type given to topic', () => {
    //   expect(() => getRedditUrl(['Gaming'])).toThrowError();
    // });

  });

  describe('Extract fields', () => {
    it('should return correct value', () => {
      const mockPost: Post = {
        title: 'Software Engineer',
        author: 'Jordan Kelly',
        subreddit: 'Programming',
        thumbnail: '',
        ups: 0,
        downs: 0,
        created: 1021201,
        id: 'world',
        url: '',
        subreddit_subscribers: 0,
        subreddit_id: '',
        subreddit_type: '',
        domain: '',
        score: 0,
        subreddit_name_prefix: ''
      }

      const mockPosts: SubredditPostData[] = [{ data: mockPost }]

      const extractedFields = extractFields(mockPosts, ['title', 'author']);

      expect(extractedFields).toEqual([{ author: 'Jordan Kelly', title: 'Software Engineer' }]);
    });

    // it('should fail if data is not an array', () => {
    //   expect(() => extractFields('')).toThrowError();
    // });

    // it('should throw error of fields contains a type other than a ''', () => {
    //   const mockPost: Partial<Post> = {
    //     title: 'Software Engineer',
    //     author: 'Jordan Kelly',
    //     subreddit: 'Programming'
    //   }
      
    //   const mockPosts: Posts = {
    //     children: [{
    //       data: mockPost
    //     }]
    //   };

    //   expect(() => extractFields(mockPosts, [1, 2, 3])).toThrowError();
    // });

  });

});