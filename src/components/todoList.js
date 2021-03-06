import React, { memo } from 'react';

const TodoList = ({ todos, setTodos, setTodoIndex, setEdit }) => {
	const handleDone = (e) => {
		const index = e.target.id;
		todos[index].done = !todos[index].done;
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
					className={`${item.done && 'done-todo'}`}
					data-testid={`todo`}
					key={i}
				>
					<span
						className={`${item.done && 'done-span'}`}
						data-testid={`todo${i}`}
					>
						{item.text}
					</span>
					<div>
						<label className="checkbox">
							<input
								data-testid={`checked${i}`}
								id={i}
								type="checkbox"
								checked={item.done}
								onChange={handleDone}
							/>
							Done
						</label>
						{!item.done && (
							<button
								data-testid={`edit-button${i}`}
								onClick={handleEdit}
								id={i}
								className="edit-btn"
							>
								Edit
							</button>
						)}
						<button
							data-testid={`delete-button${i}`}
							onClick={handleDelete}
							id={i}
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

export const MemoizedTodoList = memo(TodoList);
