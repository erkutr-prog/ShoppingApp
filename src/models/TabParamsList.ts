import { IAddress } from "./AddressType";
import { Categories, IProducts } from "./ProductType";

export type RootStackParamList = {
    Cart: undefined;
    Explore: undefined;
    Favourites: undefined;
    Products: { category: Categories };
}

export type AppStackParamList = {
    Main: undefined;
    AddAddress: { addCallback: Function };
    Purchase: { totalPrice: string };
    AddressList: { addressList: IAddress[], selectCallback?: Function };
    ProductDetails: { product: IProducts, imageId: number};
    FilteredProducts: { category: Categories };
}