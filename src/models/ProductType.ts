
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

export type Categories = "electronics" | "jewelery" | "men's clothing" | "women's clothing" | "all"