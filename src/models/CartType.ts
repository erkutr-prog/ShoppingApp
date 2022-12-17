export interface ICart {
    id: Number,
    userId: Number,
    date: string,
    products: Array<CartProduct>,
    __v: Number,
}

export type CartProduct = {
    productId: Number,
    quantity: Number,
}