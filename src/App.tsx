import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Clue from './components/Clue'
import Board from './components/Board'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import api from './api'
import './App.css';


const getCurrentClue = (id: string, categories: any[]) => {
  console.log({ id, categories})
  let currentClue = {}
  categories.forEach( category => {
    category.clues && category.clues.forEach( (clue: any) => {
      if (id === clue.id) {
        currentClue = clue
      }
    })
  })
  localStorage.setItem('currentClue', JSON.stringify(currentClue))
  return currentClue
}

const App: React.FC = () => {
  const [categories, setCategories] = useState([])
  const [currentClue, setCurrentClue] = useState({})
  const [correctAnswerArr, setCorrectAnswerArr] = useState([])
  // hide in API
  const [error, setError] = useState('')
  const setCardId = (id: string, history: any) => {
    console.log('setCardId', { id, history })
    const currentClue = getCurrentClue(id, categories)
    setCurrentClue(currentClue)
    history.push(`/clue/${id}`)
  }
  useEffect(() => {
    api.getCategories()
      .then( categories => {
        const nextState = []
        console.log({categories})
        Promise.all(categories.map( (data: any) => api.getCategory(data.id)))
          .then( waterfall => {
            console.log({waterfall})
            // @ts-ignore
            setCategories(waterfall)
          })
      })
      .catch( err => {
        setError(err && err.message || 'Problem getting resources. Please try again.')
      })
    return () => {
    };
  }, [])
  if (error) {
    return <div>{error}</div>
  }
  if (!categories.length) {
    return <div>loading...</div>
  }
  return (
    <Router>
      <div className="App">
        <Route 
          exact
          path='/clue/:id'
          render={(props) => {
            return <Clue currentClue={currentClue} setCardId={setCardId} {...props}/>
          }}
        />
        <Route exact path='/' render={(props) => <Board correctAnswerArr={correctAnswerArr} setCardId={setCardId} categories={categories} {...props}/>}/>
      </div>
    </Router>
  );
}

export default App;
