import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import React, { useState } from "react";
import { NEW_CLASS_ID } from './Constants';


export interface SchoolClass {
  id: number,
  grade: number,
  letter: string,
  teacherId: number | null
}

const ClassForm = ({classList, selectedClassId}: {classList: SchoolClass[], selectedClassId: number}) => {
  const newSchoolClass = {id: NEW_CLASS_ID, grade: 1, letter: 'A', teacherId: null}
  const schoolClasses: SchoolClass[] = [
    newSchoolClass,
    ...classList
  ]
  const [selectedClass, setSelectedClass] = useState<SchoolClass>(schoolClasses.find((c) => c.id === selectedClassId) ?? newSchoolClass) //TODO this is always set to newSchoolClass

  const onClassSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.currentTarget.value
    const foundClass: SchoolClass | undefined = schoolClasses.find((c) => c.id.toString() === classId)
    if(!foundClass) {
      console.error('No SchoolClass found for id [' + classId + '] from ClassSelect')
      e.currentTarget.value = selectedClass.id.toString()
    } else {
      setSelectedClass(foundClass)
    }
  }

  const ClassSelect = ({classes}: {classes:SchoolClass[]}) => <Form.Select 
                                                                value={selectedClass.id}
                                                                size="sm" 
                                                                onChange={(e) => onClassSelectChange(e)}>
                                                                  {classes.map(c =>
                                                                    <option key={c.id} value={c.id}>{c.id===NEW_CLASS_ID ? 'New Class' : `${c.grade}. ${c.letter}`}</option>
                                                                    )}
                                                              </Form.Select>

  return (
    <div>
      <ClassSelect classes={schoolClasses}/>
      <InputGroup size="sm" hidden={selectedClass.id!==NEW_CLASS_ID} className="w-50">
        <InputGroup.Text>Class</InputGroup.Text>
        <Form.Control
          type="number"
          value={selectedClass.grade}
          onChange={(e) => setSelectedClass({...selectedClass, grade: Number(e.currentTarget.value)})}
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
          value={selectedClass.letter}
          onChange={(e) => setSelectedClass({...selectedClass, letter: e.currentTarget.value})}
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