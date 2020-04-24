import React, {useContext} from 'react'
import Receta from './Receta'
import {RecetasContext} from '../context/RecetasContext'

const ListaRecetas = () => {

    const {recetas} = useContext(RecetasContext)

    if(!recetas) return null

    return ( <div className="row mt-5">{recetas.map(receta => {
                 return <Receta 
                            key={receta.idDrink} 
                            receta={receta} 
                        /> 
                })}
             </div> )
}
 
export default ListaRecetas;