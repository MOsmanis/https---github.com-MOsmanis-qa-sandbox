import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
import React, { useState, useEffect } from "react"



const SandboxForm = ({personList, classList}) => {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [isTeacher, setIsTeacher] = useState(false)
  const [selectedClass, setSelectedClass] = useState("0")

    useEffect(() => {
      if(selectedPerson!=null) {
        setIsTeacher(selectedPerson.isTeacher)
        setSelectedClass(selectedPerson.classId ? selectedPerson.classId.toString() : "0")
      } else {
        setIsTeacher(false)
        setSelectedClass("0")
      }

    }, [selectedPerson])

  const getPerson = (personId) => {
    const persons = personList.filter(p => personId === p.id.toString());
    if(persons.length===0) {
      return null;
    }
    return persons[0];
  }

  const PersonSelect = ({persons}) => <Form.Select value={selectedPerson ? selectedPerson.id.toString() : "0"} size="sm" aria-label="Default select example" 
                                        onChange={(e) => setSelectedPerson(getPerson(e.currentTarget.value))}>
                                          <option value="0">New Person</option>
                                          {persons.map(p => 
                                              <option value={p.id}>{p.name} {p.surname}</option>
                                          )}
                                      </Form.Select>

  const ClassSelect = ({classes}) => <Form.Select value={selectedClass} 
                                      size="sm" aria-label="Default select example" 
                                      onChange={(e)=>setSelectedClass(e.currentTarget.value)}>
                                        <option value="0">New Classroom</option>
                                        {classes.map(c =>
                                          <option value={c.id}>{c.grade}. {c.letter}</option>
                                          )}
                                        </Form.Select>

  return (
    <Form>
      <h2>Add Person</h2>
      <PersonSelect persons={personList}/>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control value={selectedPerson ? selectedPerson.name : null} size="sm" type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSurname">
        <Form.Label>Surname</Form.Label>
        <Form.Control value={selectedPerson ? selectedPerson.surname : null} size="sm" type="text" placeholder="Enter surname" />
      </Form.Group>
      <ClassSelect classes={classList}/>
      <InputGroup size="sm" hidden={selectedClass!="0"}>
        <InputGroup.Text>Class</InputGroup.Text>
        <Form.Control
          type="number"
          class="form-control"
          min="1" step="1" max="12" 
          placeholder="Year"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text>.</InputGroup.Text>
        <Form.Control
          as="select"
          placeholder="Letter"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2">
          <option>{"A"}</option>
          <option>{"B"}</option>
          <option>{"C"}</option>
        </Form.Control>
      </InputGroup>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check checked={isTeacher} disabled={selectedPerson!=null} type="switch" label="Is a teacher?" onClick={(e) => setIsTeacher(!isTeacher)}/>
      </Form.Group>
      
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SandboxForm;