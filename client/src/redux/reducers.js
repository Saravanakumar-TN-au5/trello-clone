let initialState = {
    lists: []
}

const reducer = (state = initialState, action) => {
    let stateCopy = { ...state }
    switch (action.type) {
        case 'SET_LISTS':
            stateCopy.lists = action.payload;
            return stateCopy;
        case 'UPDATE_LIST_HEAD':
            let { _id, name } = action.payload;
            let index = stateCopy.lists.findIndex(list => list._id === _id);
            stateCopy.lists = [
                ...stateCopy.lists.slice(0, index),
                { ...stateCopy.lists[index], name },
                ...stateCopy.lists.slice(index + 1)
            ]
            return stateCopy;
        case 'UPDATE_TASK_NAME':
            let { listid, task } = action.payload;
            //let {_id, name} = task;
            let listindex = stateCopy.lists.findIndex(list => list._id === listid);
            let taskindex = stateCopy.lists[listindex].tasks.findIndex(tsk => tsk._id === task._id);
            stateCopy.lists[listindex] = {...stateCopy.lists[listindex],  
                tasks : [
                    ...stateCopy.lists[listindex].tasks.slice(0, taskindex),
                    { ...stateCopy.lists[listindex].tasks[taskindex], name: task.name },
                    ...stateCopy.lists[listindex].tasks.slice(taskindex + 1),
                ]}
            stateCopy.lists = [...stateCopy.lists]
            return stateCopy;
        case 'UPDATE_TASK_STATUS':
            let lisid = action.payload.listid;
            let taske = action.payload.task;
            let lisindex = stateCopy.lists.findIndex(list => list._id === lisid);
            let tasindex = stateCopy.lists[lisindex].tasks.findIndex(tsk => tsk._id === taske._id);
            stateCopy.lists[lisindex] = {...stateCopy.lists[lisindex],
                tasks : [
                    ...stateCopy.lists[lisindex].tasks.slice(0, tasindex),
                    { ...stateCopy.lists[lisindex].tasks[tasindex], status: taske.status },
                    ...stateCopy.lists[lisindex].tasks.slice(tasindex + 1),
                ]
            }
            stateCopy.lists = [...stateCopy.lists]
            return stateCopy;
        case 'CREATE_TASK':
            let i = stateCopy.lists.findIndex(list => list._id === action.payload.listId);
            stateCopy.lists = [
                ...stateCopy.lists.slice(0, i),
                { ...stateCopy.lists[i], tasks: [...stateCopy.lists[i].tasks, action.payload.task] },
                ...stateCopy.lists.slice(i + 1)
            ]
            return stateCopy;
        case 'CREATE_LIST':
            stateCopy.lists = [...stateCopy.lists, action.payload];
            return stateCopy;
        default:
            return stateCopy;
    }
}

export default reducer;