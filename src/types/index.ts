export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

// Heredando types
export type CarItem = Guitar & {
    quantity: number;
}