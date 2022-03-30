export type ReviewApi = {
    user_id: number;
    user_name: string;
    product_id: number;
    text: string; 
    rating: number;
    date: string;
}

export type ReviewModel = {
    userId: number;
    userName: string;
    productId: number;
    text: string; 
    rating: number;
    date: string;
}

export const normalizeReview = (
    from: ReviewApi
): ReviewModel => ({
    userId: from.user_id,
    userName: from.user_name,
    productId: from.product_id,
    text: from.text,
    rating: from.rating,
    date: from.date
})

export const getInitialReviewModel = (): ReviewModel => ({
    userId: 0,
    userName: "",
    productId: 0,
    text: "", 
    rating: 0,
    date: "",
})