import React, { useState, useEffect } from "react"

const ClassTable = () => {
    const [classList, setClassList] = useState(null)
    useEffect(() => {
        getClassList()
    }, [])
    const getClassList = () => {
        fetch("http://localhost:8080/classes")
            .then(res => res.json())
            .then(
                (result) => {                    
                    setClassList(result)
                },
                (error) => {
                    setClassList(null);
                    console.log(error)
                }
            )
    }
    if (!classList) return (<div>No Record Found</div>)
    return (<div>
        <h2>Class table</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Grade</th>
                    <th>Letter</th>
                    <th>Teacher ID</th>
                </tr>
            </thead>
            <tbody>
                {classList.map(p => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.grade}</td>
                        <td>{p.letter}</td>
                        <td>{p.teacherId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}
export default ClassTable;