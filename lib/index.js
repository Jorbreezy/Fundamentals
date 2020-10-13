import fetch from 'node-fetch';
import fs from 'fs';

fetch('https://www.reddit.com/r/pics/search.json?q=programming&sort=new')
  .then(res => res.json())
  .then(res => {
    const data = JSON.stringify(res);

    fs.writeFile('data.json', data, (err) => {
      if (err) throw err;

      console.log('Created Successfully');
    });
  })
  .catch(err => console.error(err));


