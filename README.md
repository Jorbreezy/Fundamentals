# Reddit Posts Search
A project focused on learning the fundamentals of js and node.

This contains a Reddit posts search function

# Documentation

## Getting Started

### Clone Repository
```
git clone https://github.com/Jorbreezy/Project-1.git
``` 
### Install Dependencies
```
npm install
``` 
### Build project
```
npm run build
```

## Reddit Posts search function
This is a function that allows you to search for posts related to the topic given e.g 'Gaming, Programming, etc'. The output of it is a JSON file which saves the data from your search.

### How to use
Just import or require the file where you need it. It defaults to the function.

```
import redditTopicSearch from 'redditSearchTopics';
```

### Arguments
The function takes two arguments, topic and sort. When sort isn't given it defaults to 'new', sorting all posts from the newest to the oldest.
The types of sorts available are "New, Best, Relevance, Hot".

```
redditSearchTopics('Gaming')
```

### Fields
The function returns multiple fields such as  id, title, author, subreddit, thumbnail, url, ups, and downs.
```
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
```
