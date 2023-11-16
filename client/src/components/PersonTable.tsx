import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

const PersonTable = ({personList}) => {

    return (
            <DataTable style={{lineHeight: '1rem', minHeight: '5vh'}} value={personList} resizableColumns showGridlines paginator rows={5} size={'medium'}
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