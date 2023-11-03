import Table from 'react-bootstrap/Table';

const PersonTable = ({personList}) => {
    if (!personList) return (<div>No Record Found</div>)
    return (
        <div>
        <h2>person</h2>
        <div style={{ height: '500px', overflowY: 'auto', border: '1' }} >
        <Table striped bordered hover variant="dark" size="sm">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>class_id</th>
                    <th>is_teacher</th>
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
        </Table>
        </div>
        </div>)
}
export default PersonTable;