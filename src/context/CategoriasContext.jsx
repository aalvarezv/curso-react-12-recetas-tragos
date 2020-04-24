import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'
//Crear el context
export const CategoriasContext = createContext()

//Provider es donde se encuentran las funciones y state
const CategoriasProvider  = (props) => {

    const [categorias, setCategorias] = useState([])

    useEffect( () => {

        const getCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            const respuesta = await axios.get(url)
            setCategorias(respuesta.data.drinks)
        }
        getCategorias()

    }, [])

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider