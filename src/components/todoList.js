import React from 'react';

export const TodoList = ({ todos, setTodos, setTodoIndex, setEdit }) => {
	const handleDone = (e) => {
		todos[e.target.id].done = !todos[e.target.id].done;
		localStorage.setItem('todos', JSON.stringify(todos));
		setTodos([...todos]);
	};

	const handleDelete = (e) => {
		const todoIndex = e.target.id;
		todos.splice(todoIndex, 1);
		localStorage.setItem('todos', JSON.stringify(todos));
		setTodos([...todos]);
	};

	const handleEdit = (e) => {
		const todoIndex = e.target.id;
		setTodoIndex(todoIndex);
		setEdit(true);
	};

	return (
		<ul className="todoList">
			{todos.map((item, i) => (
				<li
					style={{
						backgroundColor: `${item.done ? 'grey' : ''}`,
						paddingBottom: `${item.done ? '18px' : ''}`,
					}}
					key={i}
				>
					<span
						style={{
							textDecoration: `${item.done ? 'line-through' : ''}`,
						}}
						data-testid={`todo${i}`}
					>
						{item.text}
					</span>
					<div>
						<label style={{ marginRight: '30px' }}>
							<input
								id={i}
								type="checkbox"
								checked={item.done}
								onChange={handleDone}
							/>
							Done
						</label>
						{!item.done && (
							<button onClick={handleEdit} id={i} className="edit-btn">
								Edit
							</button>
						)}
						<button
							id={i}
							onClick={handleDelete}
							style={{ float: 'right' }}
							className="delete-btn"
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};
