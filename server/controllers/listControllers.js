const controller = {};
const List = require('./../models/List');

controller.getLists = (req, res) => {
    try {
        List.find({}).populate('tasks')
        .then(doc => {
            return res.status(200).send(doc);
        })
    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

controller.createList = (req, res) => {
    try {
        let name = req.body.name;
        let position;
        let tasks = []
        List.countDocuments({})
        .then(count => {
            position = count+1;
            let doc = {name, position, tasks};
            doc = new List(doc)
            doc.save()
            .then(() => {
                res.status(201).send(doc)
            })
        })
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
}

controller.updateName = (req, res) => {
    try {
        let {id, name} = req.body;
        List.findByIdAndUpdate(id, {$set: {name}}, {new: true})
        .then(doc => {
            res.status(201).send(doc)
        }) 
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
}

// controller.updatePosition = (req, res) => {
//     try {
//         let {id, position} = req.body;
//         List.findByIdAndUpdate(id, {$set: {name}}, {new: true})
//         .then(doc => {
//             res.status(201).send(doc)
//         }) 
//     } catch (error) {
//         res.status(500).send({ message: 'Internal error'});
//     }
// }

module.exports = controller;