const mongodb = require('mongodb');

const client = new mongodb.MongoClient('mongodb://localhost:27017');

const connectClient = async () => {
    await client.connect();
    console.log('Client Connected!');
};

const getUserCollection = () => {
    const db = client.db('and-db');
    const col = db.collection('users');

    return col;
}

const insertUser = async() => {
    const col = getUserCollection();
    await col.insertOne({
        first: 'Ashley',
        last: 'Dennis',
        job: 'code',
    })
    console.log('User Inserted!');
}

const getUsers = async () => {
    const col = getUserCollection();
    const users = await col.find({}).toArray();

    return users;
};
//.
const getProductsCollection = () => {
    const db = client.db('and-db');
    const col = db.collection('products');

    return col;
}

const insertProducts = async() => {
    const col = getProductsCollection();
    await col.insertOne({
        car: "Lexus Nx"
    })
    console.log('Product Inserted!');
}

const getProducts= async () => {
    const col = getProductsCollection();
    const products = await col.find({}).toArray();

    return products;
};


connectClient() //opens connection to database
.then(() => insertUser())//runs and inputs insertUser into database
.then(()=> getUsers())
.then((users)=> console.log(users))
.then(() => insertProducts())
.then(()=> getProducts())
.then((products)=> console.log(products))
.then(() => client.close()); //closes connection to database, so I dont have to use ^C
