import { render, screen, fireEvent } from '@testing-library/react';
import AddInput from "../AddInput"
// we want to make any empty funtion this a way and anth
const mockedSetTodo = jest.fn();

describe("AddInput", () => {
    // To checek is the input already exist 
    it('should render input element', () => {
        render(
            <AddInput 
                todos={[]}
                setTodos={mockedSetTodo}
                //setTodos={()=>{}}
                
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        expect(inputElement).toBeInTheDocument();
    });
    // to ensure when write Go Grocery Shopping the output will be Go Grocery Shopping
    it('should be able to type into input', () => {
        render(
            <AddInput 
                todos={[]}
                setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } }) // test Go Grocery Shopping
        expect(inputElement.value).toBe("Go Grocery Shopping");
    });
    
    it('should be able to type into input1', () => {
        render(
            <AddInput 
                todos={[]}
                setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } });
        const buttonElement = screen.getByRole("button", { name: /Add/i});
        fireEvent.click(buttonElement)
        expect(mockedSetTodo).toBeCalled()
    });
    //when Click on add Button Empty Input 
    it('should have empty input when add button is cliked', () => {
        render(
            <AddInput 
                todos={[]}
                setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } });
        const buttonElement = screen.getByRole("button", { name: /Add/i});
        fireEvent.click(buttonElement)
        expect(inputElement.value).toBe("")
    });
})