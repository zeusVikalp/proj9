import React from "react"


function Todo(){
    const[inputValue,setInputValue] = React.useState("")
    const[todos, setTodos] = React.useState([])
    const[isLoading,setIsLoading] = React.useState(true)
    const[isError,setIsError] = React.useState(false)
    const[page,setPage] = React.useState(1)


    React.useEffect( () => {
        getTodos()
    },[page]);

    const getTodos = () => {
        setIsLoading(true)
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
        .then((res) => res.json())
        .then( (res) => setTodos(res))
        .catch( (err) => setIsError(true))
        .finally( () => setIsLoading(false))
    }

    const handelAdd = () => {
        console.log(inputValue)
        const payload = {
            title:inputValue,
            status:false
        }
        const payloadjson = JSON.stringify(payload)
        
        fetch(`http://localhost:3001/todos`,{
            method:"POST",
            body: payloadjson,
            headers: {
                "content-type" : "application/json"
            }
        }).then((res) => {
            getTodos()
        })
         .catch( () => setIsError(true))
         .finally( () => setIsLoading(false))
    }
    
    return isLoading ?( <div>...Loading</div>): isError ? (<div>...Error...Something went wrong</div>):(
        <div>
            <input placeholder="Add Tods" value={inputValue} onChange = {(e) => setInputValue(e.target.value)} />
            <button onClick={handelAdd}>Add</button>
            {todos.map( (item) => {
                return <div> {item.title} </div>
            })}
                <button onClick={ () => setPage(page-1)} disabled = {page===1}>Prev</button>

            <button onClick={ () => setPage(page+1)} >Next</button>
        </div>
    )
}

export {Todo}