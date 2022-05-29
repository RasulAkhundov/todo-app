import React, { useState, useEffect } from 'react';
import '../scss/AddTodo.scss';
import $ from 'jquery';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AddTodo = () => {

    const token = window.localStorage.getItem('user');
    if(!token) {
        window.location.href = '/login';
    }
    const decoded = jwt_decode(token);
    const todoId = decoded._id;
    const userId = decoded._id;

    const [ todoDetails, setTodoDetails ] = useState({
        subject: '',
        text: ''
    });
    const [allTodos, setAllTodos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const gettingTodos = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${todoId}`).then(res => res.data.userInfo);
            setAllTodos(gettingTodos.todos);
        }
        fetchData();
    }, [])

    const handleChangeTodo = (e) => {
        const { name, value } = e.target;

        setTodoDetails((prevState) => {
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    //Adding todo
    const submitHandler = async (e) => {
        e.preventDefault();

        if(todoDetails.subject.length < 1 || todoDetails.text.length < 1) {
            $('#error_text').text('zehmet olmasa To Do elave edin');
            return
        } else {
            const Todo = {
                todoId,
                subject: todoDetails.subject,
                text: todoDetails.text
            }
            await axios.post(`${process.env.REACT_APP_API_URL}/api/add-todo`, Todo)
            .then(res => {
                // setTodo('');
                window.location.reload();
                return res.data
            })
            .catch(err => {
                if(err) {
                    console.log(`error from add todo front end` + err);
                }
            })
        }
    }

    //Deleting Todo
    const deleteTodo = async (e) => {

        const todoId = e.target.value;

        const alert = window.confirm('Silmek istediyinizden eminsiz?');
        if(alert) {
            await axios
            .delete(`${process.env.REACT_APP_API_URL}/api/delete-todo/${todoId}/user-id/${userId}`)
            .then(res => {
                
                window.location.reload();
            })
            .catch(err => {
                if(err) {
                    console.log(`error from delete todo front end` + err);
                }
            })   
        }
    }

    return (
        <section className='todos'>
            <div className="container">
                <div className="row todos_wrapper" id='todos_wrapper'>
                    {
                        //TOPO TAPILMADINI GOSTERMEK TERNAR IF ELSE ILEr
                        allTodos.length !== 0
                        ?
                        allTodos.map((item) =>
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 todo_box" key={item._id}>
                                <div className="todo_box_wrapper">
                                    <div className="todo-date">
                                        <i>{item.todoDate}</i>
                                    </div>
                                    <h2>{item.subject}</h2>
                                    <p>{item.text}</p>
                                    <div className="todo-btn">
                                        <button type='button'>Update</button>
                                        <button type='button' style={{ background: 'red'}} onClick={deleteTodo} value={item._id}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <h2 className='cant_find_todo' style={{marginBlock: '50px'}}>Todo Tapilmadi</h2>
                    }
                    <div className="col-12 mt-5">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 add_todo_box">
                                <div className="todo_box_wrapper">
                                    <h5>Add Todo</h5>
                                    <p id='error_text'></p>
                                    <input className='mb-3'
                                    name='subject'
                                    value={todoDetails.subject}
                                    type="text"
                                    id='subject'
                                    required
                                    placeholder='Subject'
                                    onChange={handleChangeTodo}
                                    />
                                    <input
                                    name='text'
                                    value={todoDetails.text}
                                    type="text"
                                    id='text'
                                    required
                                    placeholder='Text'
                                    onChange={handleChangeTodo}
                                    />
                                    <div className="add-todo-btn">
                                        <button type='button' id='add-todo-btn' onClick={submitHandler}>Create Todo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddTodo