export interface Posts {
    children?: SubredditPostData[];
}

export interface SubredditPostData {
    data: Post
}
  
interface PostKeys {
    [key: string]: any
}

export interface Post extends PostKeys {
    subreddit?: string,
    author?: string,
    title?: string,
    thumbnail?: string,
    ups?: number,
    downs?: number,
    created?: number,
    id?: string,
    url?: string,
    subreddit_subscribers?: number,
    subreddit_id?: string,
    subreddit_type?: string,
    domain?: string,
    score?: number,
    subreddit_name_prefix?: string
}