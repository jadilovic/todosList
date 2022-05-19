import React from 'react';

// type TodoListProps = {
//   todos: any[];
// };
// export const TodoList = ({ todos }: TodoListProps) => {
export const TodoList = ({ todos }) => {
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked(!checked);
	};
	return (
		<ul className="todoList">
			{todos.map((item, i) => (
				<li style={{ backgroundColor: `${item.done ? 'grey' : ''}` }} key={i}>
					<span
						style={{ textDecoration: 'line-through' }}
						data-testid={`todo${i}`}
					>
						{item.text}
					</span>
					<div>
						<label style={{ marginRight: '30px' }}>
							<input
								type="checkbox"
								checked={checked}
								onChange={handleChange}
							/>
							Done
						</label>
						{/* <button id="status-btn">{`${
							item.done ? 'Done' : 'Pending'
						}`}</button> */}
						<button id="edit-btn">Edit</button>
						<button id="delete-btn">Delete</button>
					</div>
				</li>
			))}
		</ul>
	);
};
