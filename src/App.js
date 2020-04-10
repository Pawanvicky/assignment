import React, { useReducer } from 'react';
import './App.css';
import ExamSelectionPage from './components/traineeComponents/ExamSelectionPage';
import ExamQuestionPage from './components/traineeComponents/ExamQuestionPage';
import CreateExamPage from './components/trainerComponents/CreateExamPage';
import CreateQuestionPage from './components/trainerComponents/CreateQuestionPage';
import StorageContext from './StorageContext';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const initialState = {
  examId: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case "EXAMID":
      return {
        examId: action.payload
      };
    default:
      return state;
  };
};

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <Router>
        <StorageContext.Provider value={{ sendState: state, sendDispatch: dispatch }}>
          <Link to='/createExam'><button>Create Exam</button></Link>
          <Switch>
            <Route path="/createExam" component={CreateExamPage} />
            <Route path="/createQues" component={CreateQuestionPage} />
            <Route path="/exam" component={ExamSelectionPage} />
            <Route path="/question" component={ExamQuestionPage} />
          </Switch>
        </StorageContext.Provider>
      </Router>
    </div>
  );
}

export default App;
