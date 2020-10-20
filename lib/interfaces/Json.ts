import Posts from './Posts';

export default interface Json {
    kind: string,
    data: Data
}

interface Data {
    children: Posts
}