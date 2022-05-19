import App from '../App';
import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

describe('TodoApp', () => {
	it('renders app', () => {
		const app = render(<App />);
		expect(app).not.toBeUndefined();
	});

	it('renders initial items', () => {
		render(<App />);

		expect(screen.getByText('Buy milk')).toBeDefined();
		const buyMilkTodo = screen.getByTestId('toggle0');
		expect(buyMilkTodo).toBeChecked();

		//TODO: Verify second todo
	});
});
