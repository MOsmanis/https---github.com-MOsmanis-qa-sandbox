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

  const onTeacherSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(selectedClass.teacherId===NEW_PERSON_ID) {
      e.currentTarget.value = NEW_PERSON_ID.toString()
    } else {
      changeSelectedClass({...selectedClass, teacherId: Number(e.currentTarget.value)})
    }
  }

  const letterTemplate = (option, props) => {
    if (option) {
        return (
            <div className="text-center p-2 text-3xl w-1rem">
                {option}
            </div>
        );
    }
  }

  return (
    <div className="mt-2">
      <Dropdown value={selectedClass} onChange={(e) => changeSelectedClass(e.value)} options={schoolClasses} optionLabel="label" placeholder="Select a class" filter/>
       <div hidden={selectedClass.id!==NEW_CLASS_ID} className="p-inputgroup mt-2 w-12rem">
          <InputNumber  value={selectedClass.grade} onValueChange={(e) => changeSelectedClass({...selectedClass, grade: Number(e.value)})}
          showButtons min={1} max={12} 
          style={{maxWidth:"5rem",minWidth:"5rem"}}
          inputClassName="focus:shadow-none focus:surface-border text-center"
          inputStyle={{marginLeft:"2rem",height:"4rem",fontSize:"1.5rem",caretColor:"transparent"}} 
          incrementButtonClassName="bg-blue-200 absolute left-0 ml-4 w-2rem h-2rem border-round-top-sm"
          decrementButtonClassName="bg-blue-200 absolute left-0 mt-5 ml-4 w-2rem h-2rem border-round-bottom-sm"/> 
          <span className="p-inputgroup-addon w-1rem" style={{justifyContent:"left"}}>.</span>
          <Dropdown value={selectedClass.letter} onChange={(e) => changeSelectedClass({...selectedClass, letter: e.value})} 
           valueTemplate={letterTemplate}
           options={CLASS_LETTERS} placeholder="Letter" panelClassName="text-2xl active:shadow-none focus:shadow-none focus:surface-border active:surface-border" 
           className="w-2rem active:shadow-none focus:shadow-none focus:surface-border active:surface-border" />
       </div>
    </div>
  );
}
{/* TODO add teacher field 
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
        </Form.Control> */}

export default ClassForm;