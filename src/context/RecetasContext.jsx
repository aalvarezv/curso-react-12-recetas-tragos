import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const RecetasContext = createContext()

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([])

    const [consulta, setConsulta] = useState({
        ingrediente: '',
        categoria: ''
    })
    
    const {ingrediente, categoria} = consulta

    useEffect(() => {
       
        if(Object.keys(consulta).length !== 0){

            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`
                const resultado = await axios.get(url)
                setRecetas(resultado.data.drinks)
            }

            obtenerRecetas()
        }
       

    }, [consulta])

    return (
        <RecetasContext.Provider
            value={{
                setConsulta,
                recetas
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider