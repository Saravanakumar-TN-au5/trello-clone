const express = require('express');
const router = express.Router();
const {getLists,createList,updateName} = require('./../controllers/listControllers');

router.get('/lists', getLists);
router.post('/createList', createList);
router.patch('/updateListName', updateName);
//router.patch('/updatePosition', );

module.exports = router;