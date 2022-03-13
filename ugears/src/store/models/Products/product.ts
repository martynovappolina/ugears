import { getInitialShopModel, normalizeShop, ShopApi, ShopModel } from "../Shops";

export type ProductApi = {
    id: number;
    title: string;
    description: string;
    price: number;
    availability: boolean;
    assembly_time: string;
    number_of_parts: number; 
    rating: number;
    size: string; 
    category: string;
    images_urls: string[];
    video_url: string;
    shop: ShopApi;
}

export type ProductModel = {
    id: number;
    title: string;
    description: string;
    price: number;
    availability: boolean;
    assemblyTime: string;
    numberOfParts: number; 
    rating: number;
    size: string; 
    category: string;
    imagesUrls: string[];
    videoUrl: string,
    shop: ShopModel;
}

export const normalizeProduct = (
    from: ProductApi
): ProductModel => ({
    id: from.id,
    title: from.title,
    description: from.description,
    price: from.price,
    availability: from.availability,
    assemblyTime: from.assembly_time,
    numberOfParts: from.number_of_parts,
    rating: from.rating,
    size: from.size,
    category: from.category,
    imagesUrls: from.images_urls,
    videoUrl: from.video_url,
    shop: normalizeShop(from.shop)
});


export const getInitialProductModel = (): ProductModel => ({
    id: 0,
    title: '',
    description: '',
    price: 0,
    availability: false,
    assemblyTime: '',
    numberOfParts: 0,
    rating: 0,
    size: '',
    category: '',
    imagesUrls: [],
    videoUrl: '',
    shop: getInitialShopModel()
});