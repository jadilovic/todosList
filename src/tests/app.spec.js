import App from '../App';
import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

test('fake test', () => {
	expect(true).toBeTruthy();
});

describe('TodoApp', () => {
	it('renders app', () => {
		const app = render(<App />);
		expect(app).not.toBeUndefined();
	});

	it('renders initial items', () => {
		render(<App />);

		expect(screen.getByTestId('input').getAttribute('value')).toBe('');

		expect(screen.getByTestId('add-button')).toHaveTextContent('Add New Todo');

		expect(screen.getByText('Buy milk')).toBeDefined();
		const buyMilkTodoCheckbox = screen.getByTestId('checked0');
		expect(buyMilkTodoCheckbox).toBeChecked();

		expect(screen.getByText('Buy bread')).toBeDefined();
		const buyBreadTodoCheckbox = screen.getByTestId('checked1');
		expect(buyBreadTodoCheckbox).not.toBeChecked();

		const todos = screen.queryAllByTestId('todo');
		expect(todos.length).toBe(2);
	});

	it('new todo is added', () => {
		render(<App />);

		const input = screen.getByTestId('input');
		const addButton = screen.getByTestId('add-button');

		fireEvent.change(input, { target: { value: 'Buy eggs' } });
		fireEvent.click(addButton);

		const todos = screen.getAllByTestId('todo');
		const todo = screen.getByTestId('todo0');
		const todoText = todo.firstChild;

		expect(todoText.textContent).toBe('Buy eggs');

		expect(input.value).toBe('');

		expect(todo).toBeInTheDocument();

		expect(todos.length).toBe(3);
	});
});
