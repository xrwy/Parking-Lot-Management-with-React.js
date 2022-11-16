import React, { useContext } from 'react'
import { BodyContext } from '../../contexts/BodyProvider';
import { CarParkingContext } from '../../contexts/CarParkingProvider';
import { DELETE_CAR } from '../../ActionTypes/ACTION_TYPES';
import './car.css';

const Car = ({id, owner, car, licensePlate, entryDate, exitDate}) => {
  const { setShow, setId} = useContext(BodyContext);
  const { dispatch } = useContext(CarParkingContext);

  const onUpdateFunc = (e) => {
    const newId = id;
    setShow(() => {
      setId(newId);
      return false;
    });
  }

  const onDeleteFunc = (dispatch) => {
    dispatch({type:DELETE_CAR,payload:id})
  }
  
  return (
    <tr>
        <td>{owner}</td>
        <td>{car}</td>
        <td>{licensePlate}</td>
        <td>{entryDate}</td>
        <td>{exitDate}</td>
        <td>
          <div className='del-btn-box'>
            <button onClick={() => onDeleteFunc(dispatch)} type='button' className='del-btn'>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </td>
        <td>
          <input onChange={(e) => onUpdateFunc(e)} type="radio" name="update" className='radio-btn' />
        </td>
    </tr>
  )
}

export default Car;
