# Project 1
A project focused on learning the fundamentals of js and node.

This contains a Reddit posts search function

# Documentation

## Getting Started

### Install Dependencies
```
npm install
``` 
### Build project
```
npm run build
```
### Run build
```
npm start
```

## Reddit Posts search function
This is a function that allows you to search for posts related to the topic given e.g 'Gaming, Programming, etc'.

### How to use
Just import or require the file where you need it. It defaults to the function.

### Arguments
The function takes two arguments, topic and sort. When sort isn't given it defaults to 'new', sorting all posts from the newest to the oldest.
The types of sorts available are "New, Best, Relevance, Hot".

### Fields
The function returns multiple fields such as  id, title, author, subreddit, thumbnail, url, ups, and downs.

