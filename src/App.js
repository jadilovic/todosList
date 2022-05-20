import React, { useState, useEffect } from 'react';
import { TodoList } from './components/todoList';
import TodoEdit from './components/TodoEdit';

import './styles.scss';

export default function App() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');
	const [edit, setEdit] = useState(false);
	const [todoIndex, setTodoIndex] = useState(-1);
	const [invalidInput, setInvalidInput] = useState(false);

	const addDefaultTodos = () => {
		todos.push({ text: 'Buy milk', done: true });
		todos.push({ text: 'Buy bread', done: false });
		setTodos([...todos]);
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const getLocalStorageTodos = () => {
		const localStorageTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		if (localStorageTodos.length > 0) {
			setTodos([...todos, ...localStorageTodos]);
		} else {
			addDefaultTodos();
		}
	};

	useEffect(() => {
		getLocalStorageTodos();
	}, []);

	useEffect(() => {
		setInvalidInput(false);
	}, [todo]);

	const handleAddTodo = (e) => {
		e.preventDefault();
		if (todo === '') {
			setInvalidInput(true);
		} else {
			todos.unshift({ text: todo, done: false });
			localStorage.setItem('todos', JSON.stringify(todos));
			setTodos([...todos]);
			setTodo('');
		}
	};

	return (
		<div className="todoListApp">
			<div className="forsta-logo" />
			{edit ? (
				<TodoEdit
					setEdit={setEdit}
					setTodo={setTodo}
					todos={todos}
					setTodos={setTodos}
					todoIndex={todoIndex}
				/>
			) : (
				<>
					<div className="addTodo">
						<input
							autoFocus
							placeholder="Enter Todo"
							value={todo}
							onChange={(e) => setTodo(e.target.value)}
						/>
					</div>
					{invalidInput && (
						<div>
							<label style={{ color: 'red' }}>You must enter Todo name</label>
						</div>
					)}
					<button onClick={handleAddTodo}>Add New Todo</button>
					<TodoList
						todos={todos}
						setTodos={setTodos}
						setTodoIndex={setTodoIndex}
						setEdit={setEdit}
					/>
				</>
			)}
		</div>
	);
}
