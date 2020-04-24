import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'

const Formulario = () => {

    const {categorias} = useContext(CategoriasContext)
    const {setConsulta} = useContext(RecetasContext)

    const [busqueda, setBusqueda] = useState({
        ingrediente: '',
        categoria: ''
    })
    const {ingrediente, categoria} = busqueda

    const [error, setError] = useState(false)

    const handleChange = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        /*verifica si hay errores
        if(ingrediente.trim() === '' || categoria.trim() === ''){
            setError(true)
            console.log('cayo aqui no ejecuta nada')
            return
        }
        setError(false) */
        //pasa los filtros de busqueda al context receta
        setConsulta(busqueda)
    }

    return (
    
    <form 
        className="col-12"
        onSubmit={handleSubmit}
    >
        {error ? <p className="col-12 alert alert-danger text-center">Complete los filtros de búsqueda</p> : null}
        <fieldset>
            <legend className="text-center">Buscar bebidas por categoría o ingredientes</legend>
        </fieldset>
        <div className="row mt-4">
            <div className="col-md-4">
               <input 
                 name="ingrediente"
                 className="form-control"
                 type="text"
                 placeholder="Buscar por ingrediente"
                 onChange={handleChange}
               />
            </div>
            <div className="col-md-4">
                <select 
                    className="form-control"
                    name="categoria"
                    onChange={handleChange}
                >
                <option value="">Selecciona categoría</option>
                {categorias.map(categoria => {
                     return <option 
                                key={categoria.strCategory} 
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                })}
                </select>
            </div>
            <div className="col-md-4">
                <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="Buscar bebidas"
                ></input>
            </div>
        </div>
    </form> );
}
 
export default Formulario;