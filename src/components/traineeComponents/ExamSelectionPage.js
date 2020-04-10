import React, { useEffect, useState, useContext } from 'react';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import StorageContext from '../../StorageContext';
import loading from '../../images/loading.gif';

function ExamSelectionPage(props) {

    const [exam, setExam] = useState([]);
    const [loader, setLoader] = useState(true);
    const { sendDispatch } = useContext(StorageContext);

    useEffect(() => {
        axios.get("http://localhost:8000/api/exam/examDetails")
            .then((res) => {
                console.log(res);
                setExam(res.data);
                setLoader(false);
            })
    }, []);

    const selectedExam = (id, name) => {
        sendDispatch({ type: 'EXAMID', payload: id, name: name })
        props.history.push('/question');
    }

    return (
        <div>
            <Container>
                <fieldset className="bg-light border border-dark p-2 m-5">
                    <legend className="w-auto"><u><b> Select the exam which you want to give:</b></u></legend>
                    <div>
                        {loader ? <img src={loading} className="img-fluid" alt="Responsive image" />: <ol>
                            {exam.map((item) => (<li className="m-4" key={item._id}><button className="btn btn-outline-secondary" key={item._id} onClick={() => selectedExam(item._id, item.examName)}>{item.examName}</button></li>))}
                        </ol>}
                    </div>
                </fieldset>
                <fieldset className="bg-light border border-dark p-3 m-5">
                    <h5><u><b> Exam Instruction</b></u></h5>
                    <div className="mt-3">
                        <ol>
                            <li>
                                <h6>Each Question will contain one mark.</h6>
                            </li>
                            <li>
                                <h6>There is no negative marking.</h6>
                            </li>
                            <li>
                                <h6>All question need to be attempted.</h6>
                            </li>
                            <li>
                                <h6>You will be given 10 mins to complete the exam.</h6>
                            </li>
                            <li>
                                <h6>If you do not submit the test, it will be submitted automatically.</h6>
                            </li>
                        </ol>
                    </div>
                </fieldset>
            </Container>
        </div>
    )
}

export default ExamSelectionPage
