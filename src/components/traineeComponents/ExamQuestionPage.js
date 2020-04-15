import React, { useEffect, useState, useContext } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import axios from 'axios'
import StorageContext from '../../StorageContext'
import loading from '../../images/loading.gif';

function ExamQuestionPage(props) {

    const { sendState, sendDispatch } = useContext(StorageContext);
    const [questions, setQuestions] = useState([]);
    var [timer, setTimer] = useState(0);
    const [loader, setLoader] = useState(true);
    const [answers] = useState([]);

    useEffect(() => {
        axios.get(`${"http://localhost:8000/api/question/quesDetails"}/${sendState.examId}`)
            .then((resp) => {
                setQuestions(resp.data);
                resp.data.map((question, index) => {
                    return answers.splice(index, 0, { ind: index, ans: "" });
                });
                console.log(resp.data);
                setLoader(false);
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const formSubmit = setTimeout(() => {
            result();
        }, 600000);

        return () => {
            clearTimeout(formSubmit);
        }
    }, [questions])

    const result = (e) => {
        var count = 0;
        questions.map((option, index) => {
            if (option.answer === answers[index].ans) {
                return count = count + 1;
            }
        });
        sendDispatch({ type: "RESULT", correct: count, question: questions.length, name: sendState.examName });
        props.history.push("/result");
    }

    const storeAnswer = (index, answer) => {
        questions.map((ques, item) => {
            if (item === index) {
                return answers.splice(index, 1, { ind: index, ans: answer });
            }
        });
    }


    return (
        <React.Fragment>
        <Header />
        <div>
            <fieldset className="bg-light border border-dark p-2 m-5 col-11">
                <strong className="float-right m-2 position-relative"> <b>Timer: {timer} seconds</b></strong>
                <legend className="w-auto"><b>Exam Name: {sendState.examName} </b></legend>
                {loader ? <img src={loading} className="img-fluid" alt="Responsive image" /> : <form className="bg-light p-2 m-4" onSubmit={(e) => result(e)}>
                    {questions.map((ques, index) => (<div className="border border-primary m-2 p-3" key={ques._id}>
                        <label><b>Question{index + 1}:</b></label><textarea className="form-control" rows="3" readOnly defaultValue={ques.quesDesc}></textarea><br />
                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" name={index} value={ques.option1} onChange={(e) => storeAnswer(index, ques.option1)} />
                            <label className="form-check-label">{ques.option1}</label><br></br>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" name={index} value={ques.option2} onChange={(e) => storeAnswer(index, ques.option2)} />
                            <label className="form-check-label">{ques.option2}</label><br></br>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" name={index} value={ques.option3} onChange={(e) => storeAnswer(index, ques.option3)} />
                            <label className="form-check-label">{ques.option3}</label><br></br>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" name={index} value={ques.option4} onChange={(e) => storeAnswer(index, ques.option4)} />
                            <label className="form-check-label">{ques.option4}</label><br></br>
                        </div>
                    </div>))}
                    <button type="submit" className="btn btn-primary p-2 ml-3 float-right text-white">Submit</button>
                </form>}
            </fieldset>
            </div >
            <Footer />
      </React.Fragment>
    )
}

export default ExamQuestionPage
