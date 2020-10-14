# Project 1
A project focused on learning the fundamentals of js and node.

# Documentation

## Getting Started

### Install Dependencies
```
npm install
``` 
### Run dev server
```
npm run dev
``` 
### build project
```
npm run build
```
### Run build server
```
npm start
```

## Reddit Posts search function
This is a function that allows you to search for posts related to the topic given e.g 'Gaming, Programming, etc'.

### Initiate
In order to use the function all you have to do is import/require it into your file.

### Arguments
The function takes two arguements, topic and sort. When sort isn't given it defaults to 'new', sorting all posts from the newest to the oldest.
The types of sorts available are "New, Best, Relevance, Hot"

### Fields
The function returns multiple fields such as  id, title, author, subreddit, thumbnail, url, ups, downs

