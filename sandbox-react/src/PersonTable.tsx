import React, { useState, useEffect } from "react"

const PersonTable = () => {
    const [personList, setPersonList] = useState(null)
    useEffect(() => {
        getPersonList()
    }, [])
    const getPersonList = () => {
        fetch("http://localhost:8080/persons")
            .then(res => res.json())
            .then(
                (result) => {                    
                    setPersonList(result)
                },
                (error) => {
                    setPersonList(null);
                    console.log(error)
                }
            )
    }
    if (!personList) return (<div>No Record Found</div>)
    return (<div>
        <h2>Person table</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Class ID</th>
                    <th>Is a teacher</th>
                </tr>
            </thead>
            <tbody>
                {personList.map(p => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.surname}</td>
                        <td>{p.classId}</td>
                        <td>{p.isTeacher.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}
export default PersonTable;