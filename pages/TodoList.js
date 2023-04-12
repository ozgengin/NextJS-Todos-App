import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, Form, FormControl } from "react-bootstrap";

const sampleTodos = [
    { title: "Buy groceries", done: false },
    { title: "Finishing writing report", done: false },
    { title: "Call mom", done: true },
    { title: "Go for a run", done: true },
];

function sortTodos(todos) {
    todos.sort((a, b) => a.done - b.done);
    return todos;
}





export default function TodoList() {
    const [todos, setTodos] = useState(sampleTodos)
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos(sortTodos([...todos, { title, done: false }]));
        setTitle("");
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((todo, i) => i !== index));
    }

    const updateDone = (e, index) => {
        const newTodos = [...todos];
        newTodos[index].done = e.target.checked;
        setTodos(sortTodos(newTodos));
    }


    return (
        <div>
            <Form className='d-flex' onSubmit={handleSubmit}>
                <FormControl className='me-2' placeholder='Do something..'
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                <Button type='submit'>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </Form>
            <div className='mt-2'>
                {todos.map((todo, index) => (
                    <div key={index} className='d-flex align-items-center mb-2 bg-light p-2'>
                        <input className='me-2' type="checkbox" checked={todo.done} onChange={(e) => updateDone(e, index)} />
                        <span className='me-auto'>{todo.title}</span>
                        <Button variant='danger' size='sm' onClick={() => deleteTodo(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
