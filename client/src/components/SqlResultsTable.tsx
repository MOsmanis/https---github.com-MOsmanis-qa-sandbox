import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const SqlResultsTable = ({onQuerySubmit} : {onQuerySubmit: any}) => {
    const [sql, setSql] = useState("")
    const [sqlList, setSqlList] = useState<string[][]>([])

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sqlQuery: sql})
        };
        if(sql.trim().length !== 0) {
            fetch('http://localhost:8080/sql', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    setSqlList([[data.error]])
                } else {
                    setSqlList(data)
                    onQuerySubmit()
                }
            });
        }
    }
        
            
    return (<div>
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formSurname">
            <Form.Control className="text-center" value={sql} size="sm" type="text"
            //  as="textarea" 
             placeholder="Select * from person p left join class c on p.class_id = c.id" 
            onChange={(e) => setSql(e.currentTarget.value)} />
            </Form.Group>
        </Form>
        <Table striped bordered hover variant="dark" size="xl">
            <tbody>
            {sqlList.map((result, index) => {return (
                    <tr key={index}>
                    {result.map(i => {
                        return <td>{i.toString()}</td>;
                    })}
                </tr>
                )})}
            </tbody>
        </Table>
    </div>)
}
export default SqlResultsTable;