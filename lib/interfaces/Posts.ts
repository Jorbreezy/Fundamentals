export default interface Posts {
    children?: SubredditPostData[] | []
}

interface SubredditPostData {
    data: Post
}
  
export interface Post {
    subreddit: string,
    author: string,
    thumbnail: string,
    title: string,
    ups: number,
    downs: number,
    created: number,
    id: string,
    url: string,
    subreddit_subscribers: number,
    subreddit_id: string,
    subreddit_type: string,
    domain: string,
    score: number,
    subreddit_name_prefix: string
}