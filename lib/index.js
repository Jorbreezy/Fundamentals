import fetch from 'node-fetch';
import fs from 'fs';

fetch('https://www.reddit.com/r/pics/search.json?q=programming&sort=new')
  .then(res => res.json())
  .then((res) => {
    const data = JSON.stringify(res);

    fs.promises.writeFile('data.json', data)
      .then(() => console.log('Saved Successfully'))
      .catch(err => { throw err; });
  })
  .catch(err => console.error(err));