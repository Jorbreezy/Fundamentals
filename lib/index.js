import fetch from 'node-fetch';
import { promises as fs } from 'fs';

fetch('https://www.reddit.com/r/pics/search.json?q=programming&sort=new')
  .then(res => res.json())
  .then(res => fs.writeFile('data.json', JSON.stringify(res)))
  .then(() => console.log('Saved Successfully'))
  .catch(err => console.error(err));