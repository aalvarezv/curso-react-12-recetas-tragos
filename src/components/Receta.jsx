import React, {useContext, useState} from 'react'
import {ModalContext} from '../context/ModalContext'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    const [modalStyle] = useState(getModalStyle)
    const [open, setOpen] = useState(false)

    const classes = useStyles()


    const {setIdReceta, preparacion, setPreparacion} = useContext(ModalContext)
    const {idDrink, strDrink, strDrinkThumb} = receta

    const handleOpen = () => {
        setIdReceta(idDrink)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setPreparacion({})
        setIdReceta(null)
    }

    const mostrarIngredientes = (preparacion) => {
        let ingredientes = []
        for(let i = 1; i < 16; i++){
            if(preparacion[`strIngredient${i}`]){
                ingredientes.push(
                <li>{preparacion[`strIngredient${i}`]}{preparacion[`strMeasure${i}`]}</li>
                )
            }
        }

        return ingredientes
    }

    return ( <div className="col-md-4 mb-3">
                <div className="card">
                    <h2 className="card-header">{strDrink}</h2>
                    <img className="card-img-top" src={strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>
                </div>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick = {handleOpen}
                    >Ver Receta</button>
                    <Modal
                        open={open}
                        onClose={() => handleClose()}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{preparacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones de Preparación</h3>
                            <p>{preparacion.strInstructions}</p>
                            <img className="img-fluid my-4" src={preparacion.strDrinkThumb} />
                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(preparacion)}
                            </ul>
                        </div>
                    </Modal>


                </div>
                
             </div> );
}
 
export default Receta;