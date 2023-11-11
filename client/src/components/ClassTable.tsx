import Table from "react-bootstrap/Table"

const ClassTable = ({classList}) => {
    if (!classList) return (<div>No Record Found</div>)
    return (<div>
        <h2>school_class</h2>
        <Table striped bordered hover variant="dark" size="sm">
            <thead>
                <tr>
                    <th>id</th>
                    <th>grade</th>
                    <th>letter</th>
                    <th>teacher_id</th>
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
        </Table>
    </div>)
}
export default ClassTable;