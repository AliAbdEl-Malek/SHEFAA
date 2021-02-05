export class Product {
    constructor() { }

    ID: string ;
    pharmacyID: string;
    name: string;
    description: string;
    details: {
        title: string,
        body: string,
        sideEffects: string,
    };
    photoURL: string;
    price: number;
    quantity: number;
    category: string;
    language: string;

}