const controller = {};
const Task = require('./../models/Task');
const List = require('./../models/List');

controller.createTask = (req, res) => {
    try {
        let {listId, name} = req.body;
        let position;
        List.findById(listId)
        .then(doc => {
            position = doc.tasks.length+1;
            let task = {name, position, listId};
            task = new Task(task);
            task.save()
            .then(() => {
                List.findByIdAndUpdate(listId, {$push: {tasks: task._id}})
                .then(() => {
                    res.status(201).send(task)
                })
            })
        })
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
}

controller.updateName = (req, res) => {
    try {
        let {id, name} = req.body;
        Task.findByIdAndUpdate(id, {$set: {name}}, {new: true})
        .then(doc => {
            res.status(201).send(doc)
        })
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
}

controller.updateStatus = (req, res) => {
    try {
        let {id, status} = req.body;
        Task.findByIdAndUpdate(id, {$set: {status}}, {new: true})
        .then(doc => {
            res.status(201).send(doc)
        })
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
}

module.exports = controller;