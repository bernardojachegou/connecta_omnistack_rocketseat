import express from 'express';

const app = express();

app.use(express.json());

app.post("/users", (request, response) => {

    const users = [
        { name: "Diego", age: 25 },
        { name: "Fernando", age: 35 },
    ]

    return response.json(users);
});

app.listen(3333);

