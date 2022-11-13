import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Todo from './Todo'

describe("<Todo />", () => {
    test('not done todo shows "not done"', () => {
        const todo = { text: "test todo", done: false }
        const deleteTodo = async (todo) => { }
        const completeTodo = async (todo) => { }
        render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
        const element = screen.getByText("This todo is not done")
        expect(element).toBeDefined()
    })

    test('done todo shows "done"', () => {
        const todo = { text: "test todo", done: true }
        const deleteTodo = async (todo) => { }
        const completeTodo = async (todo) => { }
        render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
        const element = screen.getByText("This todo is done")
        expect(element).toBeDefined()
    })

    test('not done todo shows "set as done" button', () => {
        const todo = { text: "test todo", done: false }
        const deleteTodo = async (todo) => { }
        const completeTodo = async (todo) => { }
        render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
        const element = screen.getByText("Set as done")
        expect(element).toBeDefined()
    })

    test('done todo doesnt show "set as done" button', () => {
        const todo = { text: "test todo", done: true }
        const deleteTodo = async (todo) => { }
        const completeTodo = async (todo) => { }
        render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
        const element = screen.queryByText("Set as done")
        expect(element).not.toBeInTheDocument()
    })
})

