const express = require('express');
const router = express.Router();
const {createTask, updateName, updateStatus} = require('./../controllers/taskController');

router.post('/createTask', createTask);
router.patch('/updateTaskName', updateName);
router.patch('/updateTaskStatus', updateStatus);

module.exports = router;