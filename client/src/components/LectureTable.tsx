import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

const LectureTable = ({lectureList}) => {
    return (            
        <DataTable value={lectureList} resizableColumns showGridlines paginator rows={5} size={'medium'}
    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <Column field="id" header="id" style={{ width: '10%' }}></Column>
            <Column field="name" header="name" style={{ width: '30%' }}></Column>
            <Column field="classId" header="class_id" style={{ width: '10%' }}></Column>
            <Column field="teacherId" header="teacher_id" style={{ width: '10%' }}></Column>
            <Column field="scheduleDay" header="schedule_day" style={{ width: '20%' }}></Column>
            <Column field="scheduleTime" header="schedule_time" style={{ width: '20%' }}></Column>
        </DataTable>)
}
export default LectureTable;