import fetch from 'node-fetch';
import fs from 'fs';

// Set the fetch -> json into a helper function instead of repeating them

export const searchRedditPostsByTopicPromise = (topic, fields = [], sort = "new") => {

  const url = getRedditUrl(topic, sort);

  fetchJsonData(url)
    .then(res => processData(res, fields))
    .then(posts => writeJsonFile('data.json', posts))
    .catch(err => console.error('Error: ', err));
}

export const searchRedditPostsByTopicAsync = async (topic, fields = [], sort = "new") => {

  const url = getRedditUrl(topic, sort);
  
  try { 
    const data = await fetchJsonData(url);
    const posts = processData(data, fields);

    writeJsonFile('data.json', posts);
  } catch(err) {
    console.error(err);
  }
}

// Pass all the data into specify fields
   // Extract Fields
   // Allow it to be specific to an array of objects
   // Could add a function Process data and use specify/extract fields in it

export const fetchJsonData = (url) => {
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const processData = (res, fields) => {
  const data = res?.data?.children || [];
  
  return extractFields(data, fields);
}

export const extractFields = (data, fields) => {
  if (!fields.length || !fields) return data;

  return data.map(obj => {
    if (typeof obj === 'object') {
      return fields.reduce((acc, field) => {
        if (obj?.data[field] !== undefined) {
          acc[field] = obj?.data[field];
        }
  
        return acc;
      }, {});
    }
  });

}

export const getRedditUrl = (topic, sort = "new") => {
  if (!topic && typeof topic !== 'string') return new Error('Topic not a string!');
  if (typeof sort !== 'string') return new Error('Sort is not a string!'); 

  return `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;
}

export const writeJsonFile = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, '\t'));
  console.log('Saved Successfully!');
}