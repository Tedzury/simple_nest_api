# Simple nest.js api

# 🚀 Getting Started

To run the project locally, you would have to download zip file with the repository or clone it to your computer.

## Setup and Running

Requirements:

- Use node 20 LTS
- Installed git on your computer.
- Code Editor of your choice.
- Installed postgresql database.

## Installation And Preparation

Clone repository on the computer:

```
git clone https://github.com/Tedzury/simple_nest_api.git
```

or download zip file manually with the repository.

Navigate into project folder and run:

```
npm install
```

Create `.env` file in the root of the project and add all the necessary variables.

You can find `.env.example` as an example file in the project root or follow the lines below:

Run a prisma ORM migration and generation:

```
npx prisma generate and npx prisma migrate dev
```

Finally, run a server:

```
npm run start:dev
```

## Available Endpoints:

- ### signup

endpoint: 'auth/signup'

method: POST

body: {
"email": "name",
"password": "1234"
}

result: returns jwt token for newly created user

- ### login

endpoint: 'auth/login'

method: POST

body: {
"email": "name",
"password": "1234"
}

result: returns jwt token for previosly created user

- ### all products

endpoint: 'products'

method: GET

result: returns list of all available products

- ### single product

endpoint: 'products/:id'

method: GET

result: returns signle product

- ### get cart

endpoint: 'cart'

method: GET

result: returns cart with list of products added to cart for the current user

- ### add product to cart

endpoint: 'cart/addToCart'

method: PATCH

body: {
"productId": "4"
}

result: adds specified product to the cart, recalculates cart total price, returns updated cart;

- ### remove product from the cart

endpoint: 'cart/removeFromCart'

method: PATCH

body: {
"productId": "4"
}

result: removes specified product from the cart, recalculates cart total price, returns updated cart;

# TODO:

- containerize server and db into docker
- add initial seeding to the database
- add self documentation with swagger
- add logic and endpoint to orders
- write tests
