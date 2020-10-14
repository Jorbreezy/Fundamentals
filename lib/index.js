import fetch from 'node-fetch';
import { promises as fs } from 'fs';

const searchData = (topic, sort = "new") => {
  fetch(`https://www.reddit.com/r/pics/search.json?q=${topic}&sort=${sort}`)
  .then(res => res.json())
  .then((res) => {
    console.log(res.data);

    // fs.writeFile('data.json', JSON.stringify(res))
  })
  .then(() => console.log('Saved Successfully'))
  .catch(err => console.error(err));
}


searchData('Gaming');