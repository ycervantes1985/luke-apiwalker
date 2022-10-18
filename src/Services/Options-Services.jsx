import React, {useEffect, useState} from 'react'
import axios from 'axios';


const baseUrl = "https://swapi.dev/api";
let baseUrl2 = "";

function Options() {
const [state, setState] = useState([]);
const [state2, setState2] = useState([]);
const [posicion, setPosicion] = useState("");

const [option, setOption] = useState("");

useEffect(() =>{
 axios.get(baseUrl)  
            .then(response => {
            setState(response.data)
                })

}, []);


//console.log(Object.keys(state))



const handleInputChange = (event) => {
    // console.log(event.target.name)
     console.log(event.target.value)
    setOption(event.target.value)

}

const onChangeFormField = (e) => {
    const { value } = e.target;
    setPosicion(value)
}


const enviarDatos = async (event) => {
    event.preventDefault()
    baseUrl2 = baseUrl+"/"+option
    await axios.get(baseUrl2)
          .then((response) => {
          setState2(response.data);
        });
}

useEffect(() => {
  if(posicion && state2 && state)
  console.log(state2.results[parseInt(posicion)])
 
},[state2]);

return (
    <div className='container'>
        <div>
                <label>Search For: </label><select name="select" onChange={handleInputChange}>
                {Object.keys(state)?Object.keys(state).map((item, index) =>{
                return (<option key={index}>{item}</option>)}):null}
                </select>
        </div>
        <div>
          <form className="row" onSubmit={enviarDatos}>
            <label>Id</label> <input
                    type="text"
                    placeholder="Ingresa Id"
                    name="posicion"
                    onChange={(e) => onChangeFormField(e)}
                />
            <button type='submit'>Search</button>
          </form>
        </div>
        <div>     
               <h1>{state2.results[parseInt(posicion)].name}</h1> 
        </div>
    </div>
    
  );
}

export default Options