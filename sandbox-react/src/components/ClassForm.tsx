import { Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { NEW_CLASS_ID, NEW_PERSON_ID } from '../Constants';
import { Person } from './SandboxForm';


export interface SchoolClass {
  id: number,
  grade: number,
  letter: string,
  teacherId: number
}
export const NEW_CLASS = {id: NEW_CLASS_ID, grade: 1, letter: 'A', teacherId: -1} //TODO not valid if new Person is not a teacher

const ClassForm = ({classList, teachers, personClassId, onClassChange}: {classList: SchoolClass[], teachers: Person[], personClassId: number, onClassChange: any}) => {
  
  const schoolClasses: SchoolClass[] = [
    ...classList,
    NEW_CLASS
  ]
  const [selectedClass, setSelectedClass] = useState<SchoolClass>(NEW_CLASS)

  function changeSelectedClass(schoolClass: SchoolClass) {
    onClassChange(schoolClass)
    setSelectedClass(schoolClass)
  }

  useEffect (()=> {
    let initialClass: SchoolClass | undefined = schoolClasses.find((c) => c.id === personClassId)
    if(!initialClass) {
      initialClass = NEW_CLASS
    }
    
    changeSelectedClass(initialClass)
  }, [personClassId])

  const onClassSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.currentTarget.value
    const foundClass: SchoolClass | undefined = schoolClasses.find((c) => c.id.toString() === classId)
    if(!foundClass) {
      console.error('No SchoolClass found for id [' + classId + '] from ClassSelect')
      e.currentTarget.value = selectedClass.id.toString()
    } else {
      changeSelectedClass(foundClass)
    }
  }

  const onTeacherSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(selectedClass.teacherId===NEW_PERSON_ID) {
      e.currentTarget.value = NEW_PERSON_ID.toString()
    } else {
      changeSelectedClass({...selectedClass, teacherId: Number(e.currentTarget.value)})
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
      <InputGroup size="sm" hidden={selectedClass.id!==NEW_CLASS_ID}>
        <Form.Control
          type="number"
          value={selectedClass.grade}
          onChange={(e) => changeSelectedClass({...selectedClass, grade: Number(e.currentTarget.value)})}
          className="form-control"
          min="1" step="1" max="12" 
          placeholder="Year"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text>.</InputGroup.Text>
        <Form.Control
          as="select"
          placeholder="Letter"
          value={selectedClass.letter}
          onChange={(e) => changeSelectedClass({...selectedClass, letter: e.currentTarget.value})}
          aria-describedby="basic-addon2">
            {/* TODO map from array */}
          <option>{"A"}</option>
          <option>{"B"}</option>
          <option>{"C"}</option>
        </Form.Control>
        <InputGroup.Text>Tutor</InputGroup.Text>
        <Form.Control
          as="select"
          placeholder="Tutor"
          className="w-25"
          value={selectedClass.teacherId}
          onChange={(e) => onTeacherSelectChange(e)}
          aria-describedby="basic-addon2">
          {teachers.map((t) => 
            <option key={t.id} value={t.id}>{t.name} {t.surname}</option>
          )}
        </Form.Control>
      </InputGroup>
    </div>
  );
}

export default ClassForm;