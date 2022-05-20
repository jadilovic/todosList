import React, { useState, useEffect } from 'react';

const TodoEdit = ({ setEdit, setTodo, setTodos, todoIndex, todos }) => {
	const todoObject = todos.at(todoIndex);
	const [editedTodo, setEditedTodo] = useState(todoObject.text);
	const [invalidInput, setInvalidInput] = useState(false);

	useEffect(() => {
		setInvalidInput(false);
	}, [editedTodo]);

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

	return (
		<>
			<div className="addTodo">
				<input
					autoFocus
					value={editedTodo}
					onChange={(e) => setEditedTodo(e.target.value)}
				/>
				{invalidInput && (
					<div>
						<label style={{ color: 'red' }}>You must enter Todo name</label>
					</div>
				)}
			</div>
			<button onClick={handleEditTodo} className="edit-btn">
				Edit Todo
			</button>
			<button style={{ float: 'right' }} onClick={() => setEdit(false)}>
				Back Todo List
			</button>
		</>
	);
};

export default TodoEdit;
