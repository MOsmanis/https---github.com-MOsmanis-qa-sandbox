import React, { useState, useEffect } from "react"
import PersonTable from './components/PersonTable'
import './App.scss'
import ClassTable from './components/ClassTable'
import SqlResultsTable from './components/SqlResultsTable'
import LectureTable from './components/LectureTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SandboxForm from './components/SandboxForm'

//TODO Add ChatGPT https://platform.openai.com/docs/quickstart?context=node
const App = () => {
  const [personList, setPersonList] = useState([])
  const getPersonList = async () => {
    fetch("http://localhost:8080/persons")
    .then(res => res.json())
    .then(
        (result) => {                    
          setPersonList(result)
        },
        (error) => {
          console.log(error)
          setPersonList([])
        }
    )
  }
  const [classList, setClassList] = useState([])
  const getClassList = async () => {
      fetch("http://localhost:8080/classes")
          .then(res => res.json())
          .then(
              (result) => {                    
                  setClassList(result)
              },
              (error) => {
                  setClassList([]);
                  console.log(error)
              }
          )
  }
  const [lectureList, setLectureList] = useState([])
  const getLectureList = async () => {
      fetch("http://localhost:8080/lectures")
          .then(res => res.json())
          .then(
              (result) => {                    
                  setLectureList(result)
              },
              (error) => {
                  setLectureList([]);
                  console.log(error)
              }
          )
  }
  useEffect(() => {
    getPersonList()
    getClassList()
    getLectureList()
  }, [])

  const onQuerySubmit = async () => {
    getPersonList()
    getClassList()
    getLectureList()   
  }


  return (
    <Container fluid>
      <Row>
        <Col>
        {/* TODO onChange update table lists */}
        <SandboxForm personList={personList} classList={classList}/> 
        </Col>
        <Col>
          <PersonTable personList={personList}/>
        </Col>
        <Col>
          <ClassTable classList={classList}/>
        </Col>
        <Col>
          <LectureTable lectureList={lectureList}/>
        </Col>
      </Row>
      <SqlResultsTable onQuerySubmit={onQuerySubmit}/>
    </Container>
  )
}

export default App
