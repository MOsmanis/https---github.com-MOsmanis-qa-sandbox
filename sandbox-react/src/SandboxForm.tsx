import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import ClassForm, {SchoolClass} from './ClassForm';
import { NEW_CLASS_ID, NEW_PERSON_ID } from './Constants';

interface Person {
  id: number,
  name: string,
  surname: string,
  dateOfBirth: string,
  isTeacher: boolean,
  classId: number,
}


const SandboxForm = ({personList, classList}: {personList: Person[], classList: SchoolClass[]}) => {
  
  const newPerson = {id: NEW_PERSON_ID, name: 'New', surname: 'Person', dateOfBirth: '', isTeacher: false, classId: NEW_CLASS_ID}
  const persons = [
    newPerson,
    ...personList
  ]
  const [selectedPerson, setSelectedPerson] = useState<Person>(newPerson)

  const onPersonSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const personId = e.currentTarget.value
    const foundPerson: Person | undefined = persons.find((p) => p.id.toString() === personId)
    if(!foundPerson) {
      console.error('No Person found for id [' + personId + '] from ClassSelect')
      e.currentTarget.value = selectedPerson.id.toString()
    } else {
      setSelectedPerson(foundPerson)
    }
  }

  const PersonSelect = ({persons}: {persons: Person[]}) => <Form.Select 
                                                              value={selectedPerson.id.toString()} 
                                                              size="sm" 
                                                              onChange={(e) => onPersonSelectChange(e)}>
                                                                {persons.map(p => 
                                                                    <option key={p.id} value={p.id}>{p.name} {p.surname}</option>
                                                                )}
                                                            </Form.Select>

  return (
    <Form>
      <h2>Add Person</h2>
      <PersonSelect persons={persons}/>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control value={selectedPerson.name} size="sm" type="text" placeholder="Enter name" onChange={(e) => setSelectedPerson({...selectedPerson, name: e.currentTarget.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSurname">
        <Form.Label>Surname</Form.Label>
        <Form.Control value={selectedPerson.surname} size="sm" type="text" placeholder="Enter surname" onChange={(e) => setSelectedPerson({...selectedPerson, surname: e.currentTarget.value})} />
      </Form.Group>
      <ClassForm classList={classList} selectedClassId={selectedPerson.classId}/>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check checked={selectedPerson.isTeacher} disabled={selectedPerson.id!==NEW_PERSON_ID} type="switch" label="Is a teacher?" onChange={() => setSelectedPerson({...selectedPerson, isTeacher:!selectedPerson.isTeacher})}/>
      </Form.Group>
      
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SandboxForm;