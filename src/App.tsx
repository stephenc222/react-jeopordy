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


const getCategories = (setData: (data: any[]) => null, setError: (err: string) => null, setDailyDoubleIndex: (index: number) => void) => {
  api.getCategories()
  .then( categories => {
    Promise.all(categories.map( (data: any) => api.getCategory(data.id)))
      .then( waterfall => {
        // @ts-ignore
        const categoryNum = Math.floor(Math.random() * waterfall.length)
        // "5" is the number of clues to be shown in a category for now
        const clueNum = Math.floor(Math.random() * 5)
        // @ts-ignore
        const { id } = waterfall[categoryNum].clues[clueNum]
        setDailyDoubleIndex(id)
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
  const [selectedAnswerArr, _setSelectedAnswerArr] = useState([])
  const [dailyDoubleIndex, setDailyDoubleIndex] = useState(0)
  // hide in API
  const [error, setError] = useState('')
  const setCardId = (id: string, history: any) => {
    console.log('setCardId', { id, history })
    const currentClue = getCurrentClue(id, categories)
    setCurrentClue(currentClue)
    history.push(`/clue/${id}`)
  }
  const setSelectedAnswerArr = (nextCorrectAnswer: string) => {
    const _correctAnswerArr = selectedAnswerArr.slice()
    // @ts-ignore
    _correctAnswerArr.push(nextCorrectAnswer)
    // @ts-ignore
    _setSelectedAnswerArr(_correctAnswerArr)
  }
  const resetGame = (history: any) => {
    localStorage.removeItem('currentClue')
    // @ts-ignore
    getCategories(setCategories, setError, setDailyDoubleIndex)
    _setSelectedAnswerArr([])
    // @ts-ignore
    history.push('')
    return null
  }
  useEffect(() => {
    // @ts-ignore
    getCategories(setCategories, setError, setDailyDoubleIndex)
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
          render={(props) => <Clue dailyDoubleIndex={dailyDoubleIndex} setSelectedAnswerArr={setSelectedAnswerArr} currentClue={currentClue} setCardId={setCardId} {...props}/>}
        />
        <Route exact path='/' render={(props) => <Board selectedAnswerArr={selectedAnswerArr} setCardId={setCardId} categories={categories} {...props}/>}/>
      </div>
    </Router>
  );
}

export default App;
