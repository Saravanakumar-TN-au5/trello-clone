import React, { Component } from 'react';
import styles from './Task.module.scss';
import { updateTaskName, updateTaskStatus} from './../../../../redux/actions';
import { connect } from 'react-redux';

class Task extends Component {
    state = {
        editicon : React.createRef(),
        edit: false,
        status: ['pending', 'inprogress', 'completed', 'rejected'],
        updatedStatus : '',
        updatedName: ''
    }
    componentDidMount() {
        this.setState({updatedStatus: this.props.task.status})
    }
    componentDidUpdate(prevsProps,prevsState) {
        if (prevsProps !== this.props) {
            this.setState({edit: false});
        }
    }
    onSave() {
        let {_id, name, status} = this.props.task;
        let listId = this.props.listId;
        if (this.state.updatedName.length && name !== this.state.updatedName) {
            this.props.updateName(listId, _id, this.state.updatedName);
        }
        if (this.state.updatedStatus && status !== this.state.updatedStatus) {
            this.props.updateStatus(listId, _id, this.state.updatedStatus);
        }
    }
    render() {
        let {name, status} = this.props.task
        return (
            <div className={styles['container']} 
            onMouseOver={!this.state.edit ? () => this.state.editicon.current.style.display = 'block' : () => ''}
            onMouseOut={!this.state.edit ? () => this.state.editicon.current.style.display = 'none': () => ''}>
                {this.state.edit ? '' : 
                <div className={styles['edit-icon']} ref={this.state.editicon}
                onClick={() => this.setState({edit: true})}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>}
                <div className={styles['status']}>
                    {this.state.edit ? 
                    <section className={styles['statuses']}>
                        {this.state.status.map(stat => {
                            return stat === this.state.updatedStatus ?
                            <div className={styles[stat]} key={stat}
                            onClick={(e) => this.setState({updatedStatus: e.target.textContent})}
                            >{stat}<span className={styles['tick']}>✔</span></div>:
                            <div className={styles[stat]} key={stat}
                            onClick={(e) => this.setState({updatedStatus: e.target.textContent})}
                            >{stat}</div>
                        })}
                    </section>: 
                    <div className={styles[status]}>{status}</div>}
                    
                </div>
                <div className={styles['head']}>
                    {this.state.edit ? 
                    <textarea cols='30' onChange={(e)=>this.setState({updatedName: e.target.value})}
                    >{name}</textarea>:
                    <span>{name}</span>}
                </div>
                {this.state.edit ? 
                <div>
                <button type='button' className={styles['save-btn']}
                onClick={() => this.onSave()}>Save</button>
                <button type='button' className={styles['close-btn']}
                onClick={() => this.setState({edit: false})}>✖</button>
                </div>: ''}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (listid, id, updatedName) => dispatch(updateTaskName(listid, id, updatedName)),
        updateStatus: (listid, id, updatedStatus) => dispatch(updateTaskStatus(listid, id, updatedStatus))
    }
}

export default connect(null, mapDispatchToProps)(Task);