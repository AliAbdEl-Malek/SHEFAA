export class Product {
    constructor() { }

    ID: String;
    pharmacyID: String;
    name: String;
    description: String;
    details: {
        title: String,
        body: String,
        sideEffects: String,
    };
    photoURL: String;
    price: Number;
    quantity: Number;
    category: String;
    language: String;

}