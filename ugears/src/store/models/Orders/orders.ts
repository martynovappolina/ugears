import dayjs from "dayjs";
import { CartApi, CartModel, normalizeCart } from "../Cart"


export type OrderApi = {
    id: number,
    items: CartApi[],
    created_at: string,
    total_price: number,
    pick_up: boolean,
    delivery_address: string,
    payment_method: "card" | "cash",
    call_needed: boolean,
    status: "Created" | "Finished"
}

export type OrderModel = {
    id: number,
    items: CartModel[],
    createdAt: string,
    totalPrice: number,
    pickUp: boolean,
    deliveryAddress: string,
    paymentMethod: "card" | "cash",
    callNeeded: boolean,
    status: "Created" | "Finished"
}

export const normalizeOrder = (
    from: OrderApi
): OrderModel => ({
    id: from.id,
    items: from.items.map((el) => normalizeCart(el)),
    createdAt: dayjs(from.created_at).format("DD MMM"),
    totalPrice: from.total_price,
    pickUp: from.pick_up,
    deliveryAddress: from.delivery_address,
    paymentMethod: from.payment_method,
    callNeeded: from.call_needed,
    status: from.status,
})

export const getInitialOrderModel = (): OrderModel => ({
    id: 0,
    items: [],
    createdAt: '',
    totalPrice: 0,
    pickUp: false,
    deliveryAddress: '',
    paymentMethod: 'card',
    callNeeded: false,
    status: 'Created',
})