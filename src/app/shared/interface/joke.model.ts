export interface JokesResponse {
    type: string;
    value: Joke[];
}

export interface Joke {
    id: number;
    joke: string;
    category: string[];
}
