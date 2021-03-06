import React, { useReducer } from 'react';
import './App.css';
import StorageContext from './StorageContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import GuestUserLandingPage from './components/GuestUserLandingPage';
import AdminUserViewPage from './components/Admin/AdminUserViewPage';
import EditUserRolePage from './components/Admin/EditUserRolePage';
import ExamSelectionPage from './components/traineeComponents/ExamSelectionPage';
import ExamQuestionPage from './components/traineeComponents/ExamQuestionPage';
import ResultPage from './components/traineeComponents/ResultPage';
import CreateExamPage from './components/trainerComponents/CreateExamPage';
import CreateQuestionPage from './components/trainerComponents/CreateQuestionPage';


// Code to store the data.
const initialState = {
  examId: '',
  examName: '',
  correctAns: 0,
  questions: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case "EXAMID":
      return {
        examId: action.payload,
        examName: action.name
      };
    case "RESULT":
      return {
        correctAns: action.correct,
        questions: action.question,
        examName: action.name
      }

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
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/registration" exact component={RegistrationPage} />
            <Route path="/guest" exact component={GuestUserLandingPage} />
            <Route path="/admin" exact component={AdminUserViewPage} />
            <Route path="/edit-role" exact component={EditUserRolePage} />
          	<Route path="/createExam" component={CreateExamPage} />
            <Route path="/createQues" component={CreateQuestionPage} />
            <Route path="/exam" component={ExamSelectionPage} />
            <Route path="/question" component={ExamQuestionPage} />
            <Route path="/result" component={ResultPage} />
          </Switch>
        </StorageContext.Provider>
      </Router>
    </div>
  );
}

export default App;