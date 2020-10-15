import fetch from 'node-fetch';
import { promises as fs } from 'fs';

export const searchRedditPostsByTopicPromise = (topic, fields = [], sort = "new") => {
  if (!topic) return; 

  const redditUrl = `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;

  fetch(redditUrl)
    .then(res => res.json())
    .then(res => {
      const posts = res?.data?.children || [];
      return specifyFields(posts, fields);
    })
    .then(posts => fs.writeFile('data.json', JSON.stringify(posts, null, '\t')))
    .then(() => console.log('Saved Successfully!'))
    .catch(err => console.error(err));
}

export const searchRedditPostsByTopicAsync = async (topic, fields = [], sort = "new") => {
  if (!topic) return; 

  const redditUrl = `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;

  try { 
    const res = await fetch(redditUrl);
    const results = await res.json();
    const data = results?.data?.children || [];

    const posts = specifyFields(data, fields);

    fs.writeFile('data.json', JSON.stringify(posts, null, '\t'));

    console.log('Saved Sucessfully');
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
