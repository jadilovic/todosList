import App from '../App';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('TodoApp', () => {
	it('renders app', () => {
		const app = render(<App />);
		expect(app).not.toBeUndefined();
	});

	it('renders initial items', () => {
		render(<App />);

		// input field is empty
		expect(screen.getByTestId('input').getAttribute('value')).toBe('');

		// add button contains 'Add New Todo' text
		expect(screen.getByTestId('add-button')).toHaveTextContent('Add New Todo');

		// default status 'Buy milk' todo is checked
		expect(screen.getByText('Buy milk')).toBeDefined();
		const buyMilkTodoCheckbox = screen.getByTestId('checked0');
		expect(buyMilkTodoCheckbox).toBeChecked();

		// default status 'Buy bread' todo is not checked
		expect(screen.getByText('Buy bread')).toBeDefined();
		const buyBreadTodoCheckbox = screen.getByTestId('checked1');
		expect(buyBreadTodoCheckbox).not.toBeChecked();

		// number of default todos
		const todos = screen.queryAllByTestId('todo');
		expect(todos.length).toBe(2);
	});

	it('new todo is added', () => {
		render(<App />);

		// adding new todo
		const input = screen.getByTestId('input');
		const addButton = screen.getByTestId('add-button');
		fireEvent.change(input, { target: { value: 'Buy eggs' } });
		userEvent.click(addButton);

		// new todo exists
		const todo = screen.getByTestId('todo0');
		const todoText = todo.firstChild;
		expect(todoText.textContent).toBe('Buy eggs');
		expect(todo).toBeInTheDocument();

		// number of added todos
		const todos = screen.getAllByTestId('todo');
		expect(todos.length).toBe(3);

		// input field is cleared
		expect(input.value).toBe('');
	});

	it('todo is deleted', () => {
		render(<App />);

		// adding new todo
		const input = screen.getByTestId('input');
		const addButton = screen.getByTestId('add-button');
		fireEvent.change(input, { target: { value: 'Buy apple' } });
		userEvent.click(addButton);

		// new todo exists
		let todo = screen.getByTestId('todo0');
		let todoText = todo.firstChild;
		expect(todoText.textContent).toBe('Buy apple');
		expect(todo).toBeInTheDocument();

		// there should be 4 todos found including the one created in the previous test
		let todos = screen.queryAllByTestId('todo');
		expect(todos.length).toBe(4);

		// deleting todo
		const deleteButton = screen.getByTestId('delete-button0');
		fireEvent.click(deleteButton);

		// todo does not exist anymore
		todo = screen.queryByTestId('todo0');
		todoText = todo.firstChild;
		expect(todoText.textContent).not.toBe('Buy apple');

		// there should be 3 todos found in the list
		todos = screen.queryAllByTestId('todo');
		expect(todos.length).toBe(3);
	});

	it('todo is edited', () => {
		render(<App />);

		// adding new todo
		const input = screen.getByTestId('input');
		const addButton = screen.getByTestId('add-button');
		fireEvent.change(input, { target: { value: 'Buy peach' } });
		fireEvent.click(addButton);

		// there should be 4 todos found including new added todo to be edited
		let todos = screen.queryAllByTestId('todo');
		expect(todos.length).toBe(4);

		// edit new todo
		const editButton = screen.getByTestId('edit-button0');
		fireEvent.click(editButton);

		// input field to contain todo text to be edited
		const editInput = screen.getByTestId('edit-input');
		expect(editInput.value).toBe('Buy peach');

		// edit todo
		const editTodoButton = screen.getByTestId('edit-todo-button');
		fireEvent.change(editInput, { target: { value: 'Buy 1kg of peach' } });
		fireEvent.click(editTodoButton);

		// edited todo is in the list
		const editedTodo = screen.getByTestId('todo0');
		const todoText = editedTodo.firstChild;
		expect(todoText.textContent).toBe('Buy 1kg of peach');
		expect(editedTodo).toBeInTheDocument();

		// there should be 4 todos found including edited todo
		todos = screen.queryAllByTestId('todo');
		expect(todos.length).toBe(4);
	});

	it('todo is checked done', () => {
		render(<App />);

		// default status 'Buy bread' todo is not checked
		expect(screen.getByText('Buy bread')).toBeDefined();
		let buyBreadTodoCheckbox = screen.getByTestId('checked1');
		expect(buyBreadTodoCheckbox).not.toBeChecked();

		// check todo to be done
		const checkBox = screen.getByTestId('checked1');
		fireEvent.click(checkBox);

		// new status of 'Buy bread' todo is checked
		buyBreadTodoCheckbox = screen.getByTestId('checked1');
		expect(buyBreadTodoCheckbox).toBeChecked();
	});

	it('todo is checked not done', () => {
		render(<App />);

		let todos = screen.queryAllByTestId('todo');
		expect(todos.length).toBe(4);

		// default status 'Buy milk' todo is checked
		expect(screen.getByText('Buy milk')).toBeDefined();
		let buyMilkTodoCheckbox = screen.getByTestId('checked2');
		expect(buyMilkTodoCheckbox).toBeChecked();

		// check todo to be not done
		const checkBox = screen.getByTestId('checked2');
		fireEvent.click(checkBox);

		// new status of 'Buy milk' todo is not checked
		buyMilkTodoCheckbox = screen.getByTestId('checked2');
		expect(buyMilkTodoCheckbox).not.toBeChecked();
	});

	it('error message input field cannot be empty', () => {
		render(<App />);

		// adding new todo with empty field
		const input = screen.getByTestId('input');
		const addButton = screen.getByTestId('add-button');
		fireEvent.change(input, { target: { value: '' } });
		userEvent.click(addButton);

		// todo was not added
		const todo = screen.queryByTestId('todo0');
		const todoText = todo.firstChild;
		expect(todoText.textContent).not.toBe('');

		// number of added todos
		const todos = screen.getAllByTestId('todo');
		expect(todos.length).toBe(4);

		// error message is showing
		const label = screen.getByTestId('error-label');
		const error = label.firstChild;
		expect(error.textContent).toBe('You must enter Todo name');
		expect(label).toBeInTheDocument();

		// input field is cleared
		expect(input.value).toBe('');
	});
});
