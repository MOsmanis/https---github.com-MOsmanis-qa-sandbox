import Table from 'react-bootstrap/Table';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { useState} from 'react';

const PersonTable = ({personList}) => {
    const pageSize: number = 5;
    
    const getPersonsForTable = (persons: []) => {
        const extra = persons.length%pageSize;
        if(extra > 0) {
            const paddedPersons = [];
            paddedPersons.length = pageSize-extra;
            paddedPersons.fill({id: '', name: '', classId: '', isTeacher: ''});
            persons.push(...paddedPersons);
        }
        return persons
    }

    return (
        <div> 
            <DataTable value={getPersonsForTable(personList)} resizableColumns showGridlines paginator rows={5} size={'medium'}
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="id" header="id" style={{ width: '25%' }}></Column>
                <Column field="name" header="name" style={{ width: '25%' }}></Column>
                <Column field="classId" header="class_id" style={{ width: '25%' }}></Column>
                <Column field="isTeacher" header="is_teacher" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        // <div>
        // <h2>person</h2>
        // <div style={{ height: '500px', overflowY: 'auto', border: '1' }} >
        // <Table striped bordered hover variant="dark" size="sm">
        //     <thead>
        //         <tr>
        //             <th>id</th>
        //             <th>name</th>
        //             <th>surname</th>
        //             <th>class_id</th>
        //             <th>is_teacher</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {personList.map(p => (
        //             <tr key={p.id}>
        //                 <td>{p.id}</td>
        //                 <td>{p.name}</td>
        //                 <td>{p.surname}</td>
        //                 <td>{p.classId}</td>
        //                 <td>{p.isTeacher.toString()}</td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </Table>
        // </div>
        // </div>
        )
}

export default PersonTable;