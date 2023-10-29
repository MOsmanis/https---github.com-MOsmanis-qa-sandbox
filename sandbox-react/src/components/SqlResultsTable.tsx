import React, { useState, useEffect } from "react"

const SqlResultsTable = () => {
    const [sql, setSql] = useState("")
    const [sqlList, setSqlList] = useState(null)


    interface WelcomeFormElements extends HTMLCollection {
        sql: HTMLInputElement;
      }
      const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const elements: WelcomeFormElements = event.currentTarget.elements as WelcomeFormElements;
        setSql(elements.sql.value);
      }


    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sqlQuery: sql})
        };
        if(sql.trim().length !== 0) {
            fetch('http://localhost:8080/sql', requestOptions)
            .then(response => response.json())
            .then(data => setSqlList(data));
        }
    }, [sql])
        
            
    
    if (!sqlList) return (<div>
        <form className="commentForm" onSubmit={submitForm}>
            <label htmlFor="sql">Enter SQL</label><br/>
            <input id="sql" type="text"/> 
          </form>
        <h2>SQL Results</h2>
        <table className="table"></table>
        
        </div>)
    return (<div>
        <form className="commentForm" onSubmit={submitForm}>
            <label htmlFor="sql">Enter SQL</label><br/>
            <input id="sql" type="text"/> 
          </form>
        <h2>SQL Results</h2>
        <table className="table">
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {sqlList.map((result, index) => {return (
                    <tr key={index}>
                    {result.map(i => {
                        return <td>{i.toString()}</td>;
                    })}
                </tr>
                )})}
            </tbody>
        </table>
    </div>)
}
export default SqlResultsTable;