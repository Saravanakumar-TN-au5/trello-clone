import React, { Component } from 'react';
import styles from './Home.module.scss';
import List from './components/List';
import { connect } from 'react-redux';
import { createList } from './../../redux/actions';

class Home extends Component {
    state = {
        addListInput: React.createRef(),
        addList: false,
        newList: ''
    }
    onAddList() {
        this.setState({addList: true}, () => {
            this.state.addListInput.current.focus();
        });
    }
    createList() {
        const cb = () => this.setState({addList: false});
        this.props.createList(this.state.newList, cb);
    }
    render() {
        return (
            <section className={styles['container']}>
                {this.props.lists.map(listItem => {
                    return <List listItem={listItem} key={listItem._id}/>
                })}
                <section className={styles['new-list']}>
                {this.state.addList ? 
                <div className={styles['add-list']}>
                    <input type='text' className={styles['head-input']} ref={this.state.addListInput}
                    onChange={(e) => this.setState({newList: e.target.value})}/>
                    <button type='button' className={styles['save-btn']}
                    onClick={() => this.createList()}>Add list</button>
                    <button type='button' className={styles['close-btn']}
                    onClick={() => this.setState({addList: false})}>✖</button>
                </div>
                : <div onClick={() => this.onAddList()}
                className={styles['add-list-btn']}>+ Add list</div>}
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createList : (name, cb) => dispatch(createList(name, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);