import fetch from 'node-fetch';
import { promises as fs } from 'fs';

export default searchTopics = (topic, sort = "new") => {
  if (!topic) return; 

  fetch(`https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`)
  .then(res => res.json())
  .then(res => res.data.children)
  .then(posts => posts.map(mutateData))
  .then(posts => fs.writeFile('data.json', JSON.stringify(posts, null, '\t')))
  .catch(err => console.error(err));
}

const mutateData = ({ data: 
  { 
    id,
    title,
    author,
    subreddit,
    thumbnail,
    url,
    ups,
    downs,
  }
}) => ({ 
  id,
  title,
  author,
  subreddit,
  thumbnail,
  url,
  ups,
  downs,
});