import { useState, createContext } from "react";
import axios from "axios";
const ClimaContext = createContext()//context a usar 

const ClimaProvider = ({children}) =>{//provee los hooks o funciones 
    
    //Hooks o funciones
    const [busqueda,setBusqueda] = useState({
        ciudad:'',
        pais:''
    })

    const [resultado,setResultado] = useState({})
    const [cargando,setCargando] = useState(false)
    const [noResultado,setNoResultado] = useState(false)
    const datosBusqueda = e =>{
        setBusqueda({
            ...busqueda,
            [e.target.name]:e.target.value
        })
    }

    const consultarClima = async datos =>{
        setCargando(true)
        setNoResultado(false)
        try{
            const {ciudad,pais}=datos
            const appId= import.meta.env.VITE_API_KEY
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}
            ,${pais}&limit=1&appid=79fc2300732ba1673184190d8688a1c8`
            const {data} = await axios(url)
            const {lat,lon} =data[0]

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=79fc2300732ba1673184190d8688a1c8}`

            const {data: clima}=await axios(urlClima)

            setResultado(clima)
            
        }catch(error){
            setNoResultado('No hay Resultados')
        }finally{
            setCargando(false)
        }
    }
    //Hooks o funciones
    return(
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                resultado,
                cargando,
                noResultado
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext
