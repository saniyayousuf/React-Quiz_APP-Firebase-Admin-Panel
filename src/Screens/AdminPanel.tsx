import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "../config/firebaseconfig";
import firebase from 'firebase/app';
import 'firebase/database';
import images from '../assets/images.jpg'
import { FbAdd, FbGet, FbLogout } from '../config/firebasemethids';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {

  const [quizlock, setquizLock] = useState(false);
  const [QuizModel, setQuizModel] = useState<any>({});
  const [questionModel, setQuestionModel] = useState<any>({});
  const [optionList, setOptionList] = useState<any>([]);
  const [Options, setOptions] = useState<any>('')
  const [correctOption, setCorrectOption] = useState<any>()
  const [Question, setQuestion] = useState<any>([])
  const [quizData, setquizData] = useState<any>([])

  const navigate = useNavigate()

  const fillQuizModel = (key: string, val: any) => {
    QuizModel[key] = val;
    setQuizModel({ ...QuizModel });
  };

  const fillQuestionModel = (key: string, val: any) => {
    questionModel[key] = val;
    setQuestionModel({ ...questionModel })

  }
  const logout= ()=>{
    FbLogout().then((res)=>{
  navigate("/login")
    }).catch((err)=>{
  console.log(err)
    })
  }
  const lockQuiz = () => {
    setquizLock(!quizlock)
  }


  const AddOpt = () => {
    optionList.push(Options)
    setOptionList([...optionList])
    console.log(optionList)
  }

  const AddQuestion = () => {

    const newQuestion = {
      question: questionModel.question,
      options: optionList,
      correctOption: correctOption,
    };

    QuizModel.questions = [...(QuizModel.questions || []), newQuestion];

    setQuestionModel({});
    setCorrectOption('');
    setOptionList([]);

  }

  const GetQuiz = () => {
    FbGet("QUIZ").then((res: any) => {
      console.log(res)
      setquizData([...res])
    }).catch((err) => {
      console.log(err)
    })
  }
  const SaveQuiz = () => {
    // QuizModel.question = [...Question]
    FbAdd("QUIZ", QuizModel).then((res) => {
      console.log(res)
      GetQuiz()
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    GetQuiz()
  }, [])

  return (
    <div>
      <div className='p-0 m-0 row'>
        <div className='col-md-2 h-screen bg-indigo-500' >
          <div className=' p-2'>
            <div className='text-center  px-5 py-2'>
              <img className='rounded-circle' width={100}
                height={150} src={images} alt="" />
              <div className="p-2 my-3 text-light  align-items-center">
                <button onClick={logout} className='text-dark bg-purple-200 rounded-pill px-9 py-2 text-light ' >Logout</button>
                
                {quizData.map((x: any, i: any) =>
                  // {console.log(x.description)}
                  <button onClick={() => navigate("/Quiz")} className='text-dark bg-teal-200 rounded-pill px-9 py-2 text-light ' key={i}>{x.quizName}</button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-10 h-screen  p-4 '>
          <div className=' d-flex justify-content-between align-items-center p-2'>
            <h2>Quiz App Admin </h2>
            <button onClick={SaveQuiz} className='btn btn-secondary shadow-md me-3'>Save Quiz</button>
          </div>
          <div className='p-2'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='p-2'>
                  <input

                    className='form-control'
                    placeholder='Quiz Name'
                    value={QuizModel.quizname}
                    onChange={(e) => { fillQuizModel("quizName", e.target.value) }}
                    type='text'
                    disabled={quizlock}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='p-2'>
                  <input
                    className='form-control'
                    placeholder='Duration'
                    value={QuizModel.duration}
                    onChange={(e) => { fillQuizModel("duration", e.target.value) }}
                    type='text'
                    disabled={quizlock}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='p-2'>
                  <input
                    className='form-control'
                    placeholder='secret key'
                    value={QuizModel.secretkey}
                    onChange={(e) => { fillQuizModel("secret key", e.target.value) }}
                    type='text'
                    disabled={quizlock}
                  />
                </div>
              </div>
              <div className='col-md-12'>
                <div className='p-2'>
                  <input
                    className='form-control'
                    placeholder='Description'
                    value={QuizModel.description}
                    onChange={(e) => { fillQuizModel("description", e.target.value) }}
                    type='text'
                    disabled={quizlock}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='p-2'>
                  <button
                    onClick={lockQuiz}
                    className='btn btn-secondary shadow-md'>{quizlock ? "Unlock Quiz" : "Lock Quiz"} </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="p-2">
                  <input
                    className='form-control text-center '
                    placeholder='Enter question'
                    value={questionModel.question}
                    onChange={(e) => { fillQuestionModel("question", e.target.value) }}
                    type='text'

                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="p-2">
                  <input
                    className='form-control text-center '
                    placeholder='Enter option'
                    value={Options}
                    onChange={(e) => { setOptions(e.target.value) }}
                    type='text'

                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-2">
                  <button
                    onClick={AddOpt}
                    className='btn btn-secondary shadow-md w-50'>➕ Option</button>
                </div>
              </div>
              <div className="col-md-8">
                <div className="p-2">
                  {optionList.map((x: any, i: any) => (
                    <button className='bg-indigo-400 p-2 rounded-pill shadow-md shadow-cyan-500/50 text-dark w-75 my-2 ' onClick={() => { setCorrectOption(x) }}
                      key={i}>{x}</button>
                  ))}
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-2 text-center">
                  <b className='font-serif' >Correct Option :</b>
                  {correctOption && (<button className='btn bg-success w-75 my-2 rounded-pill text-white fs-5 rounded-full shadow-md  '> {correctOption}</button>)}
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-2">
                  {correctOption && (<button onClick={AddQuestion} className='btn btn-info '>Add Question</button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>















    </div>
  );
};

