import fetch from 'node-fetch';
import { promises as fs } from 'fs';

export default searchRedditPostsByTopic = (topic, sort = "new") => {
  if (!topic) return; 

  const redditUrl = `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;

  fetch(redditUrl)
    .then(res => res.json())
    .then(res => res?.data?.children || [])
    .then(posts => fs.writeFile('data.json', JSON.stringify(posts, null, '\t')))
    .catch(err => console.error(err));
}
