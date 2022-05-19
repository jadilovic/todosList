import React, { useState, useEffect } from 'react';
import { TodoList } from './components/todoList';

import './styles.scss';

export default function App() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');

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

	const handleAddTodo = (e) => {
		e.preventDefault();
		todos.unshift({ text: todo, done: false });
		localStorage.setItem('todos', JSON.stringify(todos));
		setTodos([...todos]);
		setTodo('');
	};

	return (
		<div className="todoListApp">
			<div className="forsta-logo" />
			<div className="addTodo">
				<input value={todo} onChange={(e) => setTodo(e.target.value)} />
			</div>
			<button onClick={handleAddTodo}>Add New Todo</button>
			<TodoList todos={todos} />
		</div>
	);
}
