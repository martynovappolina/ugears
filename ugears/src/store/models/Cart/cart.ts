import { getInitialProductModel, normalizeProduct, ProductApi, ProductModel } from "../Products"

export type CartApi = {
    Product: ProductApi;
    Quantity: number;
};

export type CartModel = {
    Product: ProductModel;
    Quantity: number;
};

export const normalizeCart = (
    from: CartApi
): CartModel => ({
    Product: normalizeProduct(from.Product),
    Quantity: from.Quantity,
});

export const getInitialCartModel = (): CartModel => ({
    Product: getInitialProductModel(),
    Quantity: 0,
});