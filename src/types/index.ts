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

// Usanto types utilites 
// export type GuitarID = Pick<Guitar, 'id'> 

// Usando loockup 
// export type GuitarID = Guitar['id'];