import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    todoList: []
  }

  handleSubmit = (event) => {

    var taskDesc = event.target.elements.todoTask.value;
    if (taskDesc.length > 0) {
      this.setState({
        todoList: [...this.state.todoList, taskDesc]
      })
      event.target.reset();
    }
    event.preventDefault();
  }

  handleDelete = (event, index) => {
    var todoList = [...this.state.todoList];
    todoList.splice(index,1);
    this.setState({
      todoList: todoList
    })
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid py-2">
          <div className="container">
            <h1 className="display-2">Todo App</h1>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="mb-3">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Please enter you task" autoComplete="off" name="todoTask" />
            <div className="input-group-append">
              <button className="btn btn-outline-success" type="submit">Add</button>
            </div>
          </div>
        </form>

        <ul className="list-group">
          {
            this.state.todoList.map(
              (item, index) => {
                return <li className="list-group-item" key="index">
                  {item}
                  <button className="btn btn-sm btn-outline-danger float-right" onClick={(event) => {this.handleDelete(event, index)}}>Delete</button>
                </li>
              }
            )
          }
        </ul>
      </div>
    );
  }
}

export default App;
