import React, { useContext, useState } from 'react'
import StorageContext from '../../StorageContext';
import axios from 'axios'

function CreateQuestionPage(props) {

    const { sendState } = useContext(StorageContext);
    const [data, setData] = useState({ examId: '', quesDesc: '', option1: '', option2: '', option3: '', option4: '', answer: '' });

    const addQuest = (e) => {
        e.preventDefault();
        console.log(data);
        if (data.answer !== "") {
            axios.post("http://localhost:8000/api/question/addQuestion", data)
                .then((resp) => {
                    if (resp.data._id) {
                        alert("question add");
                        setData({ quesDesc: '', option1: '', option2: '', option3: '', option4: '', answer: '' });
                        props.history.push("/createQues");
                    } else {
                        alert(resp.data);
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        } else {
            alert("Please select answer");
        }
    }

    const backPage = () => {
        props.history.push("/createExam");
    }

    return (
        <div>
            <div className="bg-light p-2 m-5" ><b>Exam Name: {sendState.examName}</b></div>
            <form id="question-form" onSubmit={(e) => addQuest(e)}>
                <fieldset className="bg-light border border-dark p-2 m-5">
                    <legend className="w-auto"><b>Add Question</b></legend>
                    <div className="form-group mb-2">
                        <label>Question: </label>
                        <textarea className="form-control" rows="3" name="exam" value={data.quesDesc} placeholder="Enter Question"
                            onChange={(e) => setData({ ...data, examId: sendState.examId, quesDesc: e.target.value })} required>
                        </textarea>
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="radio" name='option' value={data.option1} onChange={(e) => setData({ ...data, answer: e.target.value })} />
                            </div>
                        </div>
                        <input type="text" class="form-control" value={data.option1} name="option1" onChange={(e) => setData({ ...data, option1: e.target.value })}
                            placeholder="Enter option1" required />
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="radio" name='option' value={data.option2} onChange={(e) => setData({ ...data, answer: e.target.value })} />
                            </div>
                        </div>
                        <input type="text" class="form-control" value={data.option2} name="option2" onChange={(e) => setData({ ...data, option2: e.target.value })}
                            placeholder="Enter option2" required />
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="radio" name='option' value={data.option3} onChange={(e) => setData({ ...data, answer: e.target.value })} />
                            </div>
                        </div>
                        <input type="text" class="form-control" value={data.option3} name="option3" onChange={(e) => setData({ ...data, option3: e.target.value })}
                            placeholder="Enter option3" required />
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="radio" name='option' value={data.option4} onChange={(e) => setData({ ...data, answer: e.target.value })} />
                            </div>
                        </div>
                        <input type="text" class="form-control" value={data.option4} name="option4" onChange={(e) => setData({ ...data, option4: e.target.value })}
                            placeholder="Enter option4" required />
                    </div>
                    <button type="submit" className="btn btn-success text-white">Add</button>
                </fieldset>
            </form>

            <button className="btn btn-dark mr-5 float-right text-white" onClick={backPage}>Done</button>
        </div>
    )
}

export default CreateQuestionPage;