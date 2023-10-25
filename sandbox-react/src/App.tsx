import React, { useState, useEffect } from "react"
import PersonTable from './PersonTable'
import './App.scss'
import ClassTable from './ClassTable'
import SqlResultsTable from './SqlResultsTable'
import LectureTable from './LectureTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SandboxForm from './SandboxForm'

//TODO Add ChatGPT https://platform.openai.com/docs/quickstart?context=node
const App = () => {
  const [personList, setPersonList] = useState([])
  useEffect(() => {
      getPersonList()
      getClassList()
      getLectureList()
    }, [])
  const getPersonList = () => {
      fetch("http://localhost:8080/persons")
          .then(res => res.json())
          .then(
              (result) => {                    
                  setPersonList(result)
              },
              (error) => {
                  setPersonList([]);
                  console.log(error)
              }
          )
  }
  const [classList, setClassList] = useState([])
  const getClassList = () => {
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
  const getLectureList = () => {
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


  return (
    <Container fluid>
      <Row>
        <Col>
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
      <SqlResultsTable/>
    </Container>
  )
}

export default App
