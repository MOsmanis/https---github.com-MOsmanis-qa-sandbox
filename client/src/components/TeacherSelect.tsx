import { Dropdown } from "primereact/dropdown";
import { Person } from "./SandboxForm";

const TeacherSelect = ({teachers} : {teachers: Person[]}) => {

    if(teachers.length==1) {
        return (
            <div className="field col-6">
                <label htmlFor="teachersSelect" className="">Class teacher</label>
                <Dropdown id="teachersSelect" value={teachers[0]} disabled optionLabel="label" options={teachers} className="p-inputtext-lg w-full"/>
            </div>
        );
    }
    return (
      <div className="field col-6">
        <label htmlFor="teachersSelect" className="">Class teacher</label>
        <Dropdown id="teachersSelect" optionLabel="label" options={teachers} className="p-inputtext-lg w-full"/>
      </div>
  );
}

export default TeacherSelect