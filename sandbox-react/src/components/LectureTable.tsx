import Table from "react-bootstrap/Table"

const LectureTable = ({lectureList}) => {
    if (!lectureList) return (<div>No Record Found</div>)
    return (<div>
        <h2>lecture</h2>
        <Table striped bordered hover variant="dark" size="sm">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>class_id</th>
                    <th>teacher_id</th>
                    <th>schedule_day</th>
                    <th>schedule_time</th>
                </tr>
            </thead>
            <tbody>
                {lectureList.map(l => (
                    <tr key={l.id}>
                        <td>{l.id}</td>
                        <td>{l.name}</td>
                        <td>{l.classId}</td>
                        <td>{l.teacherId}</td>
                        <td>{l.scheduleDay}</td>
                        <td>{l.scheduleTime}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>)
}
export default LectureTable;