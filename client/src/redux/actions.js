import axios from 'axios';
const actions = {}

actions.setLists = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URI}/lists`)
        .then(response => {
            dispatch({type: 'SET_LISTS', payload: response.data});
        })
    }
}

actions.updateListHead = (id,updatedHead, cb) => {
    return (dispatch) => {
        axios.patch(`${process.env.REACT_APP_API_URI}/updateListName`, {id,name: updatedHead})
        .then(response => {
            dispatch({type: 'UPDATE_LIST_HEAD', payload: response.data});
            cb();
        })
    }
}

actions.updateTaskName = (listid, id, updatedName) => {
    return (dispatch) => {
        axios.patch(`${process.env.REACT_APP_API_URI}/updateTaskName`, {id,name: updatedName})
        .then(response => {
            dispatch({type: 'UPDATE_TASK_NAME', payload: {listid, task: response.data}});
        })
    }
}

actions.updateTaskStatus = (listid, id, updatedStatus) => {
    return (dispatch) => {
        axios.patch(`${process.env.REACT_APP_API_URI}/updateTaskStatus`, {id,status: updatedStatus})
        .then(response => {
            dispatch({type: 'UPDATE_TASK_STATUS', payload: {listid, task: response.data}});
        })
    }
}

actions.createTask = (listId, name, cb) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/createTask`, {listId,name})
        .then(response => {
            dispatch({type: 'CREATE_TASK', payload: {listId, task: response.data}});
            cb();
        })
    }
}

actions.createList = (name, cb) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_URI}/createList`, {name})
        .then(response => {
            dispatch({type: 'CREATE_LIST', payload: response.data});
            cb();
        })
    }
}

export const {
    setLists, updateListHead, updateTaskName, updateTaskStatus, createTask, createList
} = actions;