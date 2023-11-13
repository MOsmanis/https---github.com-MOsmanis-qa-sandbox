import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

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
            <DataTable value={getPersonsForTable(personList)} resizableColumns showGridlines paginator rows={5} size={'medium'}
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="id" header="id" style={{ width: '10%' }}></Column>
                <Column field="name" header="name" style={{ width: '30%' }}></Column>
                <Column field="classId" header="class_id" style={{ width: '30%' }}></Column>
                <Column field="isTeacher" header="is_teacher" style={{ width: '30%' }}></Column>

            </DataTable>
        )
}

export default PersonTable;