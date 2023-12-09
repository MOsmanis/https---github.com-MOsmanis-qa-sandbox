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

export const CLASS_LETTERS = ['A', 'B', 'C', 'D']

const ClassForm = ({schoolClass, teachers, personClassId, onNewClass: onNewClass}: {schoolClass: SchoolClass, teachers: Person[], personClassId: number, onNewClass: any}) => {

  const [selectedClass, setSelectedClass] = useState<SchoolClass>(schoolClass)

  function changeSelectedClass(schoolClass: SchoolClass) {
    onNewClass(schoolClass)
    setSelectedClass(schoolClass)
  }

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
    <div id="schoolClassForm" hidden={schoolClass.id!==NEW_CLASS_ID} className="field w-full formgroup-inline">
      <div id="createSchoolClass" className="field col-6 p-inputgroup h-4rem">
        <InputNumber  value={selectedClass.grade} onValueChange={(e) => changeSelectedClass({...selectedClass, grade: Number(e.value)})}
        showButtons min={1} max={12} 
        style={{maxWidth:"10rem",minWidth:"5rem"}}
        inputClassName="focus:shadow-none focus:surface-border text-center"
        inputStyle={{marginLeft:"2rem",height:"auto",fontSize:"1.5rem",caretColor:"transparent"}} 
        incrementButtonClassName="bg-blue-200 absolute left-0 ml-4 w-2rem h-2rem border-round-top-sm"
        decrementButtonClassName="bg-blue-200 absolute left-0 ml-4 w-2rem h-2rem border-round-bottom-sm mt-5"/> 
        <span className="p-inputgroup-addon" style={{justifyContent:"left"}}>.</span>
        <Dropdown value={selectedClass.letter} onChange={(e) => changeSelectedClass({...selectedClass, letter: e.value})} 
          valueTemplate={letterTemplate}
          options={CLASS_LETTERS} placeholder="Letter" panelClassName="text-2xl active:shadow-none focus:shadow-none focus:surface-border active:surface-border" 
          className="w-2rem active:shadow-none focus:shadow-none focus:surface-border active:surface-border" />
      </div>
      <div className="field col-6">
        <label htmlFor="teachersSelect" className="">Class teacher</label>
        <Dropdown id="teachersSelect" options={teachers} className="p-inputtext-lg w-full"/>
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