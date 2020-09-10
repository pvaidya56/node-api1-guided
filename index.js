//commonJS import syntax
const express = require('express');
const shortid = require('shortid');

//init an express application
const server = express();
server.use(express.json());

let hubs = [];

// --------------------------------------//
server.get('/', (req, res) => {
    res.json({ hello: "world" })
})

server.get('/hello', (req, res) => {
    res.json({ hello: "lambda school!" })
})
// --------------------------------------//

//CREATE(POST)

server.post('/api/hubs', (req, res) => {
    const hubInfo = req.body;

    //check for valid body
    //if valid, send 201 and obj
    //else, send 400, bad input data

    hubInfo.id = shortid.generate();

    hubs.push(hubInfo);
    res.status(201).json(hubInfo);
});

//READ
server.get('/api/hubs', (req, res) => {
    //validation
    res.status(200).json(hubs);
})

//DELETE
server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;

    const deleted = hubs.find(hub => hub.id === id);

    if (deleted) {
        hubs = hubs.filter(hub => hub.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({ message: "id not found"});
    }

});

//UPDATE
server.patch('/api/hubs/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    let found = hubs.find(hub => hub.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({message: "id not found"});
    }
});

server.put('/api/hubs/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    changes.id = id;

    let index = hubs.find(hub => hub.id === id);

    if (index !== -1) {
        hubs[index] = changes;
        res.status(200).json(hubs[index]);
    } else {
        res.status(404).json({message: "id not found"});
    }
});

const PORT = 5000;


//allow our web server to listen for requests
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...yay!!`);
})