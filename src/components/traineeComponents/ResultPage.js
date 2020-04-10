import React, { useContext } from 'react'
import StorageContext from '../../StorageContext'
import { Container } from 'react-bootstrap';

function ResultPage() {

    const { sendState } = useContext(StorageContext);

    return (
        <div>
            <Container>
                <fieldset className="bg-light border border-dark p-2 m-5">
                    <legend className="w-auto"><u><b> Result:</b></u></legend>
                    <div>
                        <ul className="font-weight-bold">
                            <li>Exam: {sendState.examName}</li>
                            <li>Correct Answer: {sendState.correctAns}</li>
                            <li>Total Question: {sendState.questions}</li><br />
                            <li>Your Percentage: {(sendState.correctAns / sendState.questions * 100).toFixed(2)} %</li>
                            <li>Passing Percentage: 60 %</li>
                        </ul>
                    </div>
                    {((sendState.correctAns / sendState.questions * 100).toFixed(2) > 60) ?
                        <div className="font-weight-bold text-center">Well Done ! You have scored well in exam.</div> :
                        <div className="font-weight-bold text-center">Sorry ! You have not cleared the exam.</div>
                    }
                </fieldset>
            </Container>
        </div>
    )
}

export default ResultPage
