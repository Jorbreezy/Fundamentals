import { Posts } from './Posts';

export interface RedditResponse {
    kind: string,
    data: Posts
}