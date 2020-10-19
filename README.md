# Reddit Posts Search
A reddit post search function.

# Documentation

## Getting Started

### Install
```
npm install --save fetch-reddit-posts-by-topic
``` 
## Reddit Posts search function
This is a function that allows you to search for posts related to the topic given e.g 'Gaming, Programming, etc'. The output of it is a JSON file which saves the data from your search.

### How to use
Just import or require the package where you need it.

```
import fetchRedditPostsByTopic from 'fetch-reddit-posts-by-topic';

or

const fetchhRedditPostsByTopic = require('fetch-reddit-posts-by-topic');

searchRedditPostsByTopic('Gaming', ['thumbnail','id']);
```

### Arguments
The function takes three arguments, topic, fields, and sort. Field is an array of string that contain's any of the fields you want. When fields isn't given it defaults to an empty array returning everything from the request. When sort isn't given it defaults to 'new', sorting all posts from the newest to the oldest. 
The types of sorts available are "New, Best, Relevance, Hot and Comments".

```
searchRedditPostsByTopic('Gaming', ['thumbnail','id'], 'Best')
```
