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
import Button from './components/Button';


const getCategories = (setData: (data: any[]) => null, setError: (err: string) => null) => {
  api.getCategories()
  .then( categories => {
    Promise.all(categories.map( (data: any) => api.getCategory(data.id)))
      .then( waterfall => {
        // @ts-ignore
        setData(waterfall)
      })
      .catch( err => {
        console.error(err)
      })
  })
  .catch( err => {
    setError(err && err.message || 'Problem getting resources. Please try again.')
  })
}

const getCurrentClue = (id: string, categories: any[]) => {
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
  const [correctAnswerArr, _setCorrectAnswerArr] = useState([])
  // hide in API
  const [error, setError] = useState('')
  const setCardId = (id: string, history: any) => {
    console.log('setCardId', { id, history })
    const currentClue = getCurrentClue(id, categories)
    setCurrentClue(currentClue)
    history.push(`/clue/${id}`)
  }
  const setCorrectAnswerArr = (nextCorrectAnswer: string) => {
    const _correctAnswerArr = correctAnswerArr.slice()
    // @ts-ignore
    _correctAnswerArr.push(nextCorrectAnswer)
    // @ts-ignore
    _setCorrectAnswerArr(_correctAnswerArr)
  }
  const resetGame = (history: any) => {
    localStorage.removeItem('currentClue')
    // @ts-ignore
    getCategories(setCategories, setError)
    _setCorrectAnswerArr([])
    // @ts-ignore
    history.push('')
    return null
  }
  useEffect(() => {
    // @ts-ignore
    getCategories(setCategories, setError)
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
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{padding: 10}}/>
          <div style={{padding: 10}}>
            <Route path="*" render={(props) => <Button label='Reset' onClick={() => resetGame(props.history)} />  }/>
          </div>
        </div>
        <Route 
          exact
          path='/clue/:id'
          render={(props) => <Clue setCorrectAnswerArr={setCorrectAnswerArr} currentClue={currentClue} setCardId={setCardId} {...props}/>}
        />
        <Route exact path='/' render={(props) => <Board  correctAnswerArr={correctAnswerArr} setCardId={setCardId} categories={categories} {...props}/>}/>
      </div>
    </Router>
  );
}

export default App;
