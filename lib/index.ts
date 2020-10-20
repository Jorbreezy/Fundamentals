import fetch from 'node-fetch';

import { Json } from './interfaces/Json';
import {Posts, Post, SubredditPostData } from './interfaces/Posts';

export default async (topic: string, fields: string[] = [], sort: string = "new") => {
  if (!Array.isArray(fields)) throw new Error('Field has to be an array!');

  const url = getRedditUrl(topic, sort);

  try {
    const res = await fetchJson(url);
    return processData(res, fields);
  } catch (err) {
    return console.error('Error: ', err);
  }
}

export const fetchJson = async (url: string) => {
  return await fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const processData = (res: Json, fields: string[]) => {
  const data: SubredditPostData[] = res?.data?.children || [];

  return extractFields(data, fields);
}

export const extractFields = (data: SubredditPostData[], fields: string[] = []) => {
  if (!Array.isArray(data)) throw new Error('Data is not an array')
  if (!fields.length) return data;

  return data.map(obj => {
    if (typeof obj === 'object') {

      return fields.reduce((acc, field) => {
        if (typeof field !== 'string') throw new Error(`${field} is not a string`);

        let newObject: Post = { ...acc };

        if (obj?.data[field] !== undefined) {
          newObject = { 
            ...acc,
            [field]: obj?.data[field]
          };
        }
  
        return newObject;
      }, {} as Post);
    }
  });

}

export const getRedditUrl = (topic: string, sort: string = 'new') => {
  if (!topic || typeof topic !== 'string') throw new Error('Topic not a string!');
  if (typeof sort !== 'string') throw new Error('Sort is not a string!'); 

  return `https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`;
}