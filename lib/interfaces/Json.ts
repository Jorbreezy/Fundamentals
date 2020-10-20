import Children from './Children';

export default interface Json {
    kind: string,
    data: Data
}

interface Data {
    children: Children
}