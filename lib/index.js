import fetch from 'node-fetch';

export const fetchRedditPostsByTopicPromise = (topic, fields = [], sort = "new") => {
  if (!Array.isArray(fields)) throw new Error('Field has to be an array!');

  const url = getRedditUrl(topic, sort);

  return fetchJson(url)
    .then(res => processData(res, fields))
    .catch(err => console.error('Error: ', err));
}

export const fetchRedditPostsByTopicAsync = async (topic, fields = [], sort = "new") => {

  const url = getRedditUrl(topic, sort);
  
  try { 
    const data = await fetchJson(url);
    const posts = processData(data, fields);

    return posts;
  } catch(err) {
    console.error(err);
  }
}

export const fetchJson = async (url) => {
  return await fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const processData = (res, fields) => {
  const data = res?.data?.children || [];

  return extractFields(data, fields);
}

export const extractFields = (data, fields = []) => {
  if (!Array.isArray(data)) throw new Error('Data is not an array')
  if (!fields.length) return data;

  return data.map(obj => {
    if (typeof obj === 'object') {

      return fields.reduce((acc, field) => {
        if (typeof field !== 'string') throw new Error(`${field} is not a string`);

        if (obj?.data[field] !== undefined) {
          acc[field] = obj?.data[field];
        }
  
        return acc;
      }, {});
    }
  });

}

export const getRedditUrl = (topic, sort = 'new') => {
  if (!topic || typeof topic !== 'string') throw new Error('Topic not a string!');
  if (typeof sort !== 'string') throw new Error('Sort is not a string!'); 

  return `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;
}