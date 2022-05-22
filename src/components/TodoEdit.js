import React, { useState } from 'react';

const TodoEdit = ({ setEdit, setTodo, setTodos, todoIndex, todos }) => {
	const todoObject = todos[todoIndex];
	const [editedTodo, setEditedTodo] = useState(todoObject.text);
	const [invalidInput, setInvalidInput] = useState(false);

	const handleEditTodo = (e) => {
		setInvalidInput(false);
		e.preventDefault();
		if (editedTodo === '') {
			setInvalidInput(true);
		} else {
			todos[todoIndex].text = editedTodo;
			localStorage.setItem('todos', JSON.stringify(todos));
			setTodos([...todos]);
			setTodo('');
			setEdit(false);
		}
	};

	const handleChange = (e) => {
		e.preventDefault();
		setInvalidInput(false);
		setEditedTodo(e.target.value);
	};

	return (
		<>
			<div className="addTodo">
				<input
					data-testid="edit-input"
					autoFocus
					value={editedTodo}
					onChange={handleChange}
				/>
				{invalidInput && (
					<div>
						<label style={{ color: 'red' }}>You must enter Todo name</label>
					</div>
				)}
			</div>
			<button
				data-testid="edit-todo-button"
				onClick={handleEditTodo}
				className="edit-btn"
			>
				Edit Todo
			</button>
			<button style={{ float: 'right' }} onClick={() => setEdit(false)}>
				Back Todo List
			</button>
		</>
	);
};

export default TodoEdit;
