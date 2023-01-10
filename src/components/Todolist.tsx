import React from 'react';

interface TodolistTypes {
    name: string
}

const Todolist = (props: TodolistTypes) => {
    const {
        name,
    } = props
    return (
        <div>
            <h3>{name}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/><span>CSS&HTML</span></li>
                <li><input type="checkbox" checked={true}/><span>JS</span></li>
                <li><input type="checkbox" checked={false}/><span>React</span></li>
            </ul>
            <div>
                <button>ALL</button>
                <button>ACTIVE</button>
                <button>COMPLETED</button>
            </div>
        </div>
    );
};

export default Todolist;
