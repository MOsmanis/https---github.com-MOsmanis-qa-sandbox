import { InputText } from 'primereact/inputtext';  
import { InputSwitch } from 'primereact/inputswitch';
import React, { useState, useEffect } from "react";
import ClassForm, {SchoolClass, NEW_CLASS} from './ClassForm';
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
    //TODO background color to bg-yellow-50
    <div className="p-inputtext-xl ">
      <Dropdown value={selectedPerson} onChange={(e) => setSelectedPerson(e.value)} options={persons} optionLabel="name" placeholder="Select a person" filter
       className="w-full md:w-14rem h-3rem" />
      <InputText placeholder="Enter name" value={selectedPerson.name} onChange={(e) => setSelectedPerson({...selectedPerson, name: e.currentTarget.value})}
       className='mt-2 h-3rem'/>
      <InputText placeholder="Enter surname" value={selectedPerson.surname} onChange={(e) => setSelectedPerson({...selectedPerson, surname: e.currentTarget.value})}
      className='mt-2 h-3rem'/>
      <div className='mt-3'>
      <label htmlFor="isTeacherSwitch" className="ml-2 mr-2 text-xl">Teacher</label>
      <InputSwitch id="isTeacherSwitch" checked={selectedPerson.isTeacher} disabled={selectedPerson.id!==NEW_PERSON_ID} onChange={() => setSelectedPerson({...selectedPerson, isTeacher:!selectedPerson.isTeacher})} 
      className=''/>
      </div>
      <ClassForm classList={classList} personClassId={selectedPerson.classId} teachers={teachers} onClassChange={setSelectedClass}/>
    </div>
  );
}

export default SandboxForm;