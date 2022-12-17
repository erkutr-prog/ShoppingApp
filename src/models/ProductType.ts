
export interface IProducts {
    id: Number,
    title: string,
    price: Number,
    description: string,
    category: string,
    image: string,
    rating: rating
}


export type rating = {
    rate: number,
    count: Number,
}