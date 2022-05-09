import { getInitialShopModel, normalizeShop, ShopApi, ShopModel } from "../Shops";

export type ProductApi = {
    id: number;
    title: string;
    description: string;
    price: number; 
    availability: boolean;
    assembly_time: string;
    parts_amount: number; 
    rating: number;
    size: string; 
    category: string;
    image_links: string[];
    video_link: string;
    shop_id: number;
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
    shopId: number,
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
    numberOfParts: from.parts_amount,
    rating: from.rating,
    size: from.size,
    category: from.category,
    imagesUrls: from.image_links,
    videoUrl: from.video_link,
    shopId: from.shop_id,
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
    shopId: 0,
});