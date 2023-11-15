// import Button from 'react-bootstrap/Button';
import { Button } from 'primereact/button';     
import { InputText } from 'primereact/inputtext';  
import { InputSwitch } from 'primereact/inputswitch';
import React, { useState, useEffect } from "react";
import ClassForm, {SchoolClass, NEW_CLASS} from './ClassForm';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { NEW_CLASS_ID, NEW_PERSON_ID } from '../Constants';
import { Dropdown } from 'primereact/dropdown';

export interface Person {
  id: number,
  name: string,
  surname: string,
  dateOfBirth: string,
  isTeacher: boolean,
  classId: number,
}


const SandboxForm = ({personList, classList, onSubmitPost}: {personList: Person[], classList: SchoolClass[], onSubmitPost: any}) => {
  const NEW_PERSON = {id: NEW_PERSON_ID, name: 'New', surname: 'Person', dateOfBirth: '', isTeacher: false, classId: NEW_CLASS_ID}
  const persons = [
    NEW_PERSON,
    ...personList
  ]
  const [selectedPerson, setSelectedPerson] = useState<Person>(NEW_PERSON)
  const [selectedClass, setSelectedClass] = useState<SchoolClass>(NEW_CLASS)
  const [teachers, setTeachers] = useState<Person[]>([])

  useEffect(() => {
    if(selectedPerson.id === NEW_PERSON_ID && selectedPerson.isTeacher) {
      setTeachers([selectedPerson]) 
    } else {
      setTeachers(personList.filter((p) => p.isTeacher)) //TODO Other teachers still can select different teacher for new class
    }
  },[selectedPerson, personList])

  useEffect(()=> {
    setSelectedPerson((s):Person => {return {...s, classId: selectedClass.id}})
  },[selectedClass])

  const onSubmitLog = (event: any) => { 
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedClass)
    };
    fetch('http://localhost:8080/classes/add', requestOptions)
    .then(response => response.json())
    .then(data => {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...selectedPerson, classId: data})
        };
        fetch('http://localhost:8080/persons/add', options)
          .then(response => {
            console.log(response); 
            onSubmitPost();
          });
      })
    
  }

  return (
    // <Form onSubmit={onSubmitLog}>
    <div className="p-inputtext-sm">
      <h2>Add Person</h2>
      {/* <PersonSelect persons={persons}/> */}
      
      <Dropdown value={selectedPerson} onChange={(e) => setSelectedPerson(e.value)} options={persons} optionLabel="name" placeholder="Select a person" 
    filter className="w-full md:w-14rem" />
      <InputText placeholder="Enter name" value={selectedPerson.name} onChange={(e) => setSelectedPerson({...selectedPerson, name: e.currentTarget.value})}/>
      <InputText placeholder="Enter surname" value={selectedPerson.surname} onChange={(e) => setSelectedPerson({...selectedPerson, surname: e.currentTarget.value})}/>
      <label htmlFor="isTeacherSwitch" className="font-bold mb-2">Teacher</label>
      <InputSwitch id="isTeacherSwitch" checked={selectedPerson.isTeacher} disabled={selectedPerson.id!==NEW_PERSON_ID} onChange={() => setSelectedPerson({...selectedPerson, isTeacher:!selectedPerson.isTeacher})} />
      {/* <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control value={selectedPerson.name} size="sm" type="text" placeholder="Enter name" 
        onChange={(e) => setSelectedPerson({...selectedPerson, name: e.currentTarget.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSurname">
        <Form.Label>Surname</Form.Label>
        <Form.Control value={selectedPerson.surname} size="sm" type="text" placeholder="Enter surname" 
        onChange={(e) => setSelectedPerson({...selectedPerson, surname: e.currentTarget.value})} />
      </Form.Group>
      <ClassForm classList={classList} personClassId={selectedPerson.classId} teachers={teachers} onClassChange={setSelectedClass}/>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check checked={selectedPerson.isTeacher} disabled={selectedPerson.id!==NEW_PERSON_ID} type="switch" label="Teacher" onChange={() => setSelectedPerson({...selectedPerson, isTeacher:!selectedPerson.isTeacher})}/>
      </Form.Group>
      <TERipple rippleColor='light'>  
        <Button>
          Submit
        </Button>
      </TERipple> */}
    {/* </Form> */}
    </div>
  );
}

export default SandboxForm;