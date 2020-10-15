import fetch from 'node-fetch';
import { promises as fs } from 'fs';

export const searchRedditPostsByTopicPromise = (topic, fields = [], sort = "new") => {
  fetch(getRedditUrl(topic, sort))
    .then(res => res.json())
    .then(res => {
      const posts = res?.data?.children || [];
      return specifyFields(posts, fields);
    })
    .then(posts => saveResults('data.json', posts))
    .catch(err => console.error(err));
}

export const searchRedditPostsByTopicAsync = async (topic, fields = [], sort = "new") => {
  try { 
    const res = await fetch(getRedditUrl(topic, sort));
    const results = await res.json();
    const data = results?.data?.children || [];

    const posts = specifyFields(data, fields);

    saveResults('data.json', posts);
  } catch(err) {
    console.error(err);
  }
}

const specifyFields = (posts, fields) => {
  if (!fields.length || !fields) return posts;

  return posts.map(post => {
    return fields.reduce((acc, field) => {
      if (post?.data[field] !== undefined) {
        acc[field] = post?.data[field];
      }

      return acc;
    }, {});
  });
}

const getRedditUrl = (topic, sort = "new") => {
  if (!topic && typeof topic !== 'string') return new Error('Topic not a string!');
  if (typeof sort !== 'string') return new Error('Sort is not a string!'); 

  return `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;
}

const saveResults = (filename, data) => {
  fs.writeFile(filename, JSON.stringify(data, null, '\t'));
  console.log('Saved Successfully!');
}

