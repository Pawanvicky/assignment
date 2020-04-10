import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import loading from '../../images/loading.gif';
import StorageContext from '../../StorageContext';

function CreateExamPage(props) {

    const [data, setData] = useState({ examName: '' })
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

    const createExam = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/exam/addExam", data)
            .then((resp) => {
                if (resp.data._id) {
                    window.location.reload();
                } else {
                    alert(resp.data);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const selectedExam = (id, name) => {
        sendDispatch({ type: 'EXAMID', payload: id, name: name })
        props.history.push('/createQues');
    }

    const deleteExam = (e) => {
        axios.delete(`${"http://localhost:8000/api/exam"}/${e}`)
            .then((res) => {
                console.log(res);
                alert("Exam Deleted Successfully");
                window.location.reload();
            })
    };

    return (
        <div>
            <div className='mt-5 row'>
                <div className='col-3'></div>
                <form className='bg-light col-6 text-center' onSubmit={(e) => createExam(e)}>
                    <fieldset className="border border-dark p-2 mt-5">
                        <legend className="w-auto"><b>Create Exam</b></legend>
                        <div className="form-group row">
                            <label className="col-5 col-form-label">Enter exam name:</label>
                            <div className="col-7">
                                <input type="text" className="form-control" name="exam" onChange={(e) => setData({ ...data, examName: e.target.value })}
                                    placeholder="Enter exam" required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary text-white">Create</button>
                    </fieldset>
                </form>
                <div className='col-3'></div>
            </div>
            <div>
                <fieldset className="bg-light border border-dark text-center p-2 m-5 h-auto">
                    <legend className="w-auto"><b>Modify the data of exam </b></legend>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col-8 table-responsive'>
                            {loader ? <img src={loading} className="img-fluid" alt="Responsive image" />:
                                <table className="table table-hover table-bordered">
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Exam Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exam.map((item, number) => (
                                            <tr key={item._id}>
                                                <th scope="row">{number + 1}</th>
                                                <th>{item.examName}</th>
                                                <th><button className="btn btn-warning" onClick={() => selectedExam(item._id, item.examName)}>Question Bank</button>
                                                    <button className="btn btn-danger ml-2" onClick={() => deleteExam(item._id)}>Delete</button></th>
                                            </tr>))}
                                    </tbody>
                                </table>}
                        </div>
                        <div className='col-2'></div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default CreateExamPage
