import React, { Component } from 'react';
import styles from './List.module.scss';
import Task from './../Task';
import { connect } from 'react-redux';
import { updateListHead, createTask } from './../../../../redux/actions';

class List extends Component {
    state = {
        headInput: React.createRef(),
        addTaskInput : React.createRef(),
        editHead: false,
        addTask: false,
        newTask: ''
    }
    editHead() {
        this.setState({editHead: true}, () => {
            this.state.headInput.current.focus();
            this.state.headInput.current.select();
        });
    }
    saveHead(e, id) {
        const cb = () => {this.setState({editHead: false})};
        this.props.updateHead(id, e.target.value, cb);
    }
    addTask() {
        this.setState({addTask: true}, () => {
            this.state.addTaskInput.current.focus();
        });
    }
    createTask() {
        const cb = () => this.setState({addTask: false});
        this.props.createTask(this.props.listItem._id, this.state.newTask, cb);
    }
    render() {
        let {_id, name, tasks} = this.props.listItem
        return (
            <section className={styles['container']}>
                <div className={styles['head']} onClick={() => this.editHead()}>
                    {this.state.editHead ? 
                    <input type='text' className={styles['head-input']} 
                    defaultValue={name} ref={this.state.headInput}
                    onBlur={(e) => this.saveHead(e, _id)}/>:
                    name}
                </div>
                <div>
                    {tasks ? tasks.map(task => {
                        return <Task task={task} key={task._id} listId={_id}/>
                    }): ''}
                </div>
                {this.state.addTask ?
                <div className={styles['add-task']}>
                    <input type='text' className={styles['head-input']} ref={this.state.addTaskInput}
                    onChange={(e) => this.setState({newTask: e.target.value})}/>
                    <button type='button' className={styles['save-btn']}
                    onClick={() => this.createTask()}>Add task</button>
                    <button type='button' className={styles['close-btn']}
                    onClick={() => this.setState({addTask: false})}>✖</button>
                </div>
                :<div className={styles['add-btn']} onClick={() => this.addTask()}>+ Add task</div>}
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateHead: (id, updatedHead, cb) => dispatch(updateListHead(id, updatedHead, cb)),
        createTask: (listId, name, cb) => dispatch(createTask(listId,name,cb))
    }
}
export default connect(null, mapDispatchToProps)(List);