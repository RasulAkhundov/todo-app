import React from 'react';
import '../scss/Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {

  const userMe = window.localStorage.getItem('user');

  return (
    <section className='home'>
        <div className="create_todo_wrapper">
          <h2>Create your own ToDo</h2>
          <Link to={userMe ? '/addTodo' : '/login'}><button type='button'>Create Your ToDo</button></Link>
        </div>
    </section>
  )
}

export default Home