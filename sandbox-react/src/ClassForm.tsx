import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
import React, { useState, useEffect } from "react"
import BsPrefixRefForwardingComponent from 


interface SchoolClass {
  id: number,
  grade: number,
  letter: string,
  teacherId: number | null
}


const ClassForm = ({classList}) => {
  const newSchoolClass = {id: -1, grade: 1, letter: 'A', teacherId: null}
  const schoolClasses: SchoolClass[] = [
    newSchoolClass,
    classList
  ]
  const [selectedClass, setSelectedClass] = useState<SchoolClass>(newSchoolClass)

  const onClassSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.currentTarget.value
    const foundClass: SchoolClass | undefined = classes.find((c) => c.id.toString() === classId)
    if(!foundClass) {
      console.error('No SchoolClass found for id [' + classId + '] from ClassSelect')
      e.currentTarget.value = selectedClass?.id.toString()
    } else {
      setSelectedClass(foundClass)
    }
  }

  const ClassSelect:ReactElement = (classes:SchoolClass[]) => <Form.Select value={selectedClass.id}
                                      size="sm" aria-label="Default select example" 
                                      onChange={(e) => onClassSelectChange(e)}>
                                        <option value="-1">New Classroom</option>
                                        {classes.map(c =>
                                          <option value={c.id}>{c.grade}. {c.letter}</option>
                                          )}
                                        </Form.Select>

  return (
    <div>
      <ClassSelect classes={schoolClasses}/>
      <InputGroup size="sm" hidden={selectedClass.id!=null} className="w-50">
        <InputGroup.Text>Class</InputGroup.Text>
        <Form.Control
          type="number"
          className="form-control"
          min="1" step="1" max="12" 
          placeholder="Year"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text>.</InputGroup.Text>
        <Form.Control
          as="select"
          placeholder="Letter"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2">
          <option>{"A"}</option>
          <option>{"B"}</option>
          <option>{"C"}</option>
        </Form.Control>
      </InputGroup>
    </div>
  );
}

export default ClassForm;