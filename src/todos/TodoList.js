import React, { Component } from 'react';
import { Segment, Header, Card, Dimmer, Loader, Portal, Icon, Button, Form} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTodos, createTodo, deleteTodo, saveTodo} from '../actions/todolistActions';
import Todo from './Todo';

class TodoList extends Component {

  componentWillMount() {
    if(!this.props.todos) {
      this.props.dispatch(getTodos());
    }
  }


  onTaskChange = (e) =>  {
    this.newTask = e.target.value;
  }

  onPriorityChange = (e) => {
    this.newPriority = e.target.value;
  }

  onCreateNewTask = (e) => {
    const data  = {
        task: this.newTask,
        order: parseInt(this.newPriority)
      };

    this.props.dispatch(createTodo(data));
  }

  onTodoDelete = (id) =>  {
    this.props.dispatch(deleteTodo(id));
  }

  onTodoSave = (data) =>  {
    this.props.dispatch(saveTodo(data));
  }

  render() {

    let todos = [];
    if(this.props.todosState.todos) {
      todos = this.props.todosState.todos.map((todo, i) => {
        return (
          <Todo created_at={todo.created_at}
                updated_at={todo.updated_at}
                task={todo.task}
                id={todo._id}
                order={todo.order}
                delete={this.onTodoDelete}
                save={this.onTodoSave}
                key={i}
                />
        );
      });
    }

    return (

      <Segment>
          <Header>
            Todo List
          </Header>
        <Dimmer active={this.props.todosState.loading}>
          <Loader>Loading</Loader>
        </Dimmer>

        <Portal
            closeOnTriggerClick
            openOnTriggerClick
            trigger={(
                <Icon name="plus circle" size="large"/>
            )}
          >
            <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
              <Form>
                <Form.Field>
                  <label>Task</label>
                  <input placeholder="Task..." onChange={this.onTaskChange}/>
                </Form.Field>
                <Form.Field>
                  <label>Priority</label>
                  <input placeholder="Priority..." onChange={this.onPriorityChange}/>
                </Form.Field>
                <Button fluid type="submit" onClick={this.onCreateNewTask}>Create</Button>

              </Form>
            </Segment>
          </Portal>
        <Card.Group>
          { todos }
        </Card.Group>
      </Segment>

    );
  }

}

function mapToProps(state) {
    return {
      todosState : state.todosState
    };
}

export default connect(mapToProps)(TodoList) ;
