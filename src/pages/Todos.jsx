import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import './Todos.css';

function Todos({ appState, showToast, showDialog }) {
    const [filter, setFilter] = useState('all');
    const [newTodoText, setNewTodoText] = useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();
        const text = newTodoText.trim();
        
        if (!text) {
            showToast('Please enter a todo item');
            return;
        }

        appState.addTodo(text);
        setNewTodoText('');
        showToast('Todo added!');
    };

    const handleDeleteTodo = async (todoId) => {
        const todo = appState.todos.find(t => t.id === todoId);
        if (!todo) return;

        const confirmed = await showDialog(`Delete todo "${todo.text}"?`);
        if (confirmed) {
            appState.deleteTodo(todoId);
            showToast('Todo deleted');
        }
    };

    const filteredTodos = filter === 'all' 
        ? appState.todos 
        : appState.todos.filter(t => t.status === filter);

    const todosByStatus = {
        todo: appState.todos.filter(t => t.status === 'todo'),
        'in-progress': appState.todos.filter(t => t.status === 'in-progress'),
        done: appState.todos.filter(t => t.status === 'done')
    };

    const handleDragStart = (e, todoId) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('todo-id', todoId);
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.todo-column').forEach(col => {
            col.classList.remove('drag-over');
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.currentTarget.closest('.todo-column')?.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        const column = e.currentTarget.closest('.todo-column');
        if (column && !column.contains(e.relatedTarget)) {
            column.classList.remove('drag-over');
        }
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        e.currentTarget.closest('.todo-column')?.classList.remove('drag-over');
        
        const todoId = e.dataTransfer.getData('todo-id');
        if (todoId) {
            appState.updateTodoStatus(todoId, status);
        }
    };

    if (!appState.isInitialized) {
        return <LoadingSpinner message="Loading todos..." />;
    }

    return (
        <div className="page active">
            <section className="todos-section">
                <h2 className="page-header">Todo List</h2>
                
                <div className="add-todo-wrapper">
                    <form className="add-todo-form" onSubmit={handleAddTodo}>
                        <input 
                            id="new-todo-input"
                            type="text" 
                            placeholder="Add a new todo..." 
                            aria-label="New todo text" 
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            required 
                            maxLength="200"
                        />
                        <button type="submit" className="add-todo-button" aria-label="Add todo">
                            <span className="material-icons">add</span>
                        </button>
                    </form>
                </div>

                <div className="todo-filters">
                    {['all', 'todo', 'in-progress', 'done'].map(f => (
                        <button
                            key={f}
                            className={`todo-filter-button ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                            aria-label={`Show ${f} todos`}
                        >
                            {f === 'all' ? 'All' : f === 'todo' ? 'Todo' : f === 'in-progress' ? 'In Progress' : 'Done'}
                        </button>
                    ))}
                </div>

                <div className="todos-container">
                    {['todo', 'in-progress', 'done'].map(status => (
                        <div
                            key={status}
                            className="todo-column"
                            data-status={status}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, status)}
                        >
                            <h3 className="todo-column-title">
                                <span className="material-icons">
                                    {status === 'todo' ? 'radio_button_unchecked' : status === 'in-progress' ? 'hourglass_empty' : 'check_circle'}
                                </span>
                                {status === 'todo' ? 'Todo' : status === 'in-progress' ? 'In Progress' : 'Done'}
                                <span className="todo-count">{todosByStatus[status].length}</span>
                            </h3>
                            <div className="todo-list">
                                {filteredTodos
                                    .filter(t => t.status === status)
                                    .map(todo => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            onStatusChange={(newStatus) => appState.updateTodoStatus(todo.id, newStatus)}
                                            onDelete={() => handleDeleteTodo(todo.id)}
                                            onDragStart={(e) => handleDragStart(e, todo.id)}
                                            onDragEnd={handleDragEnd}
                                        />
                                    ))}
                                {filteredTodos.filter(t => t.status === status).length === 0 && (
                                    <div className="todo-empty">
                                        {status === 'todo' ? 'No todo items yet' : status === 'in-progress' ? 'No items in progress' : 'No completed items'}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function TodoItem({ todo, onStatusChange, onDelete, onDragStart, onDragEnd }) {
    return (
        <div
            className={`todo-item todo-item-${todo.status}`}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <div className="todo-text">{todo.text}</div>
            <div className="todo-actions">
                {todo.status === 'todo' && (
                    <>
                        <button
                            className="todo-action-button todo-action-in-progress"
                            onClick={() => onStatusChange('in-progress')}
                            aria-label="Mark as in progress"
                            title="Mark as in progress"
                        >
                            <span className="material-icons">hourglass_empty</span>
                        </button>
                        <button
                            className="todo-action-button todo-action-done"
                            onClick={() => onStatusChange('done')}
                            aria-label="Mark as done"
                            title="Mark as done"
                        >
                            <span className="material-icons">check_circle</span>
                        </button>
                    </>
                )}
                {todo.status === 'in-progress' && (
                    <>
                        <button
                            className="todo-action-button todo-action-todo"
                            onClick={() => onStatusChange('todo')}
                            aria-label="Mark as todo"
                            title="Mark as todo"
                        >
                            <span className="material-icons">radio_button_unchecked</span>
                        </button>
                        <button
                            className="todo-action-button todo-action-done"
                            onClick={() => onStatusChange('done')}
                            aria-label="Mark as done"
                            title="Mark as done"
                        >
                            <span className="material-icons">check_circle</span>
                        </button>
                    </>
                )}
                {todo.status === 'done' && (
                    <>
                        <button
                            className="todo-action-button todo-action-todo"
                            onClick={() => onStatusChange('todo')}
                            aria-label="Mark as todo"
                            title="Mark as todo"
                        >
                            <span className="material-icons">radio_button_unchecked</span>
                        </button>
                        <button
                            className="todo-action-button todo-action-in-progress"
                            onClick={() => onStatusChange('in-progress')}
                            aria-label="Mark as in progress"
                            title="Mark as in progress"
                        >
                            <span className="material-icons">hourglass_empty</span>
                        </button>
                    </>
                )}
                <button
                    className="todo-action-button todo-action-delete"
                    onClick={onDelete}
                    aria-label="Delete todo"
                    title="Delete"
                >
                    <span className="material-icons">delete</span>
                </button>
            </div>
        </div>
    );
}

export default Todos;

