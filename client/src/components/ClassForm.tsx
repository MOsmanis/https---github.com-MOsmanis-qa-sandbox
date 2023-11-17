import React, { useEffect, useState } from "react";
import { NEW_CLASS_ID, NEW_PERSON_ID } from '../Constants';
import { Person } from './SandboxForm';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export interface SchoolClass {
  id: number,
  grade: number,
  letter: string,
  teacherId: number,
  label: string,
}

export const NEW_CLASS = {id: NEW_CLASS_ID, grade: 1, letter: 'A', teacherId: -1, label: 'New Class'} //TODO not valid if new Person is not a teacher
export const CLASS_LETTERS = ['A', 'B', 'C', 'D']

const ClassForm = ({classList, teachers, personClassId, onClassChange}: {classList: SchoolClass[], teachers: Person[], personClassId: number, onClassChange: any}) => {
  
  const schoolClasses: SchoolClass[] = [
    NEW_CLASS,
    ...classList.map(c => {return {...c, label: `${c.grade}.${c.letter}`}}), //TODO remove once saved in DB
  ]//TODO sorting by grade,letter - can be testable bug
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

  return (
    <div className="mt-2">
      <Dropdown value={selectedClass} onChange={(e) => changeSelectedClass(e.value)} options={schoolClasses} optionLabel="label" placeholder="Select a class" filter/>
       <div hidden={selectedClass.id!==NEW_CLASS_ID}>
          <InputNumber  value={selectedClass.grade} onValueChange={(e) => changeSelectedClass({...selectedClass, grade: Number(e.value)})}
          showButtons min={1} max={12} inputStyle={{width:"3rem"}} decrementButtonClassName="bg-blue-200"  incrementButtonClassName="bg-blue-200" />
          <Dropdown value={selectedClass.letter} onChange={(e) => changeSelectedClass({...selectedClass, letter: e.value})} options={CLASS_LETTERS} placeholder="Select a class" filter
          className="w-5rem" />
       </div>
    </div>
  );
}

export default ClassForm;