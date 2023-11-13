import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ClassTable = ({classList}) => {
    if (!classList) return (<div>No Record Found</div>)
    return (
                <DataTable value={classList} resizableColumns showGridlines paginator rows={5} size={'medium'}
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                    <Column field="id" header="id" style={{ width: '10%' }}></Column>
                    <Column field="grade" header="grade" style={{ width: '30%' }}></Column>
                    <Column field="letter" header="letter" style={{ width: '30%' }}></Column>
                    <Column field="teacherId" header="teacher_id" style={{ width: '30%' }}></Column>
    
                </DataTable>)
}
export default ClassTable;