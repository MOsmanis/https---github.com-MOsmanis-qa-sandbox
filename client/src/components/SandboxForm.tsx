import { InputText } from 'primereact/inputtext';  
import { useState, useEffect } from "react";
import ClassForm, {SchoolClass} from './ClassForm';
import { NEW_CLASS_ID, NEW_PERSON_ID } from '../Constants';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';

export interface Person {
  id: number,
  name: string,
  surname: string,
  dateOfBirth: string,
  isTeacher: boolean,
  classId: number,
  label: string,
}


const SandboxForm = ({personList, classList, onSubmitPost}: {personList: Person[], classList: SchoolClass[], onSubmitPost: any}) => {
  const NEW_PERSON = {id: NEW_PERSON_ID, name: 'New', surname: 'Person', dateOfBirth: '', isTeacher: false, classId: NEW_CLASS_ID, label: 'New Person'}
  const NEW_CLASS = {id: NEW_CLASS_ID, grade: 1, letter: 'A', teacherId: -1, label: 'New'} //TODO teacherId not valid if new Person is not a teacher
  const GENDERS = ['Female', 'Male', 'Non-binary', 'Other']
  const persons = [
    NEW_PERSON,
    ...personList
  ]
  const schoolClasses: SchoolClass[] = [
    NEW_CLASS,
    ...classList.map(c => {return {...c, label: `${c.grade}.${c.letter}`}}), //TODO remove once saved in DB
  ]//TODO sorting by grade,letter - can be testable bug
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
    <div className="formgrid grid">
      <div className="field col-12">
        <Dropdown value={selectedPerson} onChange={(e) => setSelectedPerson(e.value)} options={persons} optionLabel="name" placeholder="Select a person" filter
        className='w-full p-inputtext-lg' /> 
      </div>
      <div className="field col-6">
        <InputText placeholder="Enter name" value={selectedPerson.name} onChange={(e) => setSelectedPerson({...selectedPerson, name: e.currentTarget.value})}
          className='w-full p-inputtext-lg'/>
      </div>
      <div className="field col-6">
        <InputText placeholder="Enter surname" value={selectedPerson.surname} onChange={(e) => setSelectedPerson({...selectedPerson, surname: e.currentTarget.value})}
        className='w-full p-inputtext-lg'/>
      </div>
      <div className="field col-6">
        <Calendar placeholder="12/31/2023" className='p-inputtext-lg w-full'/>
      </div>
      <div className="field col-6">
        <Dropdown placeholder="Gender" options={GENDERS} className='p-inputtext-lg w-full'/>
      </div>
      <div className="field col-6">
      {/* mt-3 h-1rem relative */}
        <label htmlFor="isTeacher" className="text-xl mb-0 mt-2">Teacher</label>
        <Checkbox id="isTeacher" checked={selectedPerson.isTeacher} disabled={selectedPerson.id!==NEW_PERSON_ID} onChange={() => setSelectedPerson({...selectedPerson, isTeacher:!selectedPerson.isTeacher})} 
        className='ml-2'/>
      </div>
      <div className="field col-6">
        <Dropdown value={selectedClass} onChange={(e) => setSelectedClass(e.value)} options={schoolClasses} optionLabel="label" placeholder="Select a class"
        className="p-inputtext-lg w-full"/>
      </div>
      <ClassForm schoolClass={selectedClass} personClassId={selectedPerson.classId} teachers={teachers} onNewClass={setSelectedClass}/>
    </div>
  );
}
export default SandboxForm;