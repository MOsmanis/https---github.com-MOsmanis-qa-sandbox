import React, { useState, useEffect } from "react"
import PersonTable from './components/PersonTable'
import ClassTable from './components/ClassTable'
import SqlResultsTable from './components/SqlResultsTable'
import LectureTable from './components/LectureTable'
import SandboxForm from './components/SandboxForm'
import { PrimeReactProvider } from 'primereact/api'
import { Panel } from "primereact/panel"
import 'primereact/resources/themes/tailwind-light/theme.css'
import 'primeflex/primeflex.css'


//TODO Add ChatGPT https://platform.openai.com/docs/quickstart?context=node
//TODO add purgeCSS https://purgecss.com/
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
    <PrimeReactProvider>
          <div className="grid bg-yellow-100">
            <Panel className="col" style={{minWidth: '10rem'}}>
              <SandboxForm personList={personList} classList={classList} onSubmitPost={onQuerySubmit}/> 
            </Panel>
            <Panel header="person" className="col" style={{maxWidth: '25rem'}}>
              <PersonTable personList={personList}/>
            </Panel>
            <Panel header="school_class" className="col" style={{maxWidth: '25rem'}}>
              <ClassTable classList={classList}/>
            </Panel>
            <Panel className="col" header="lecture">
              <LectureTable lectureList={lectureList}/>
            </Panel>
          </div>
          <SqlResultsTable onQuerySubmit={onQuerySubmit}/>
    </PrimeReactProvider>
  )
}

export default App
