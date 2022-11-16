import React, { memo, useContext, useState } from 'react'
import { BodyContext } from '../../contexts/BodyProvider';
import { CarParkingContext } from '../../contexts/CarParkingProvider';
import { ADD_CAR, UPDATE_CAR } from '../../ActionTypes/ACTION_TYPES';
import { useThemeContext } from '../../contexts/ThemeProvider';
import './body.css';


const initialValues = {
  owner:'',
  car:'',
  licensePlate:'',
  entryDate:'',
  exitDate:'',
};

const Body = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const { dispatch } = useContext(CarParkingContext);
  const { show, id } = useContext(BodyContext);
  const { theme, setTheme } = useThemeContext();

  const onChangeEvent = (e) => {
    setFormValues({...formValues,[e.target.name]:e.target.value})
  }

  const onSubmitData = (e,dispatch) => {
    e.preventDefault();
    
    const isTrueOrFalse = Object.keys(formValues).some((key) => {
      if(formValues[key] === ''){return true}
      return false;
    });
    const newFormValues = {
      owner:formValues.owner,
      car:formValues.car,
      licensePlate:formValues.licensePlate,
      entryDate:formValues.entryDate.split('-').reverse().join("-"),
      exitDate:formValues.exitDate.split('-').reverse().join("-"),
    }

    isTrueOrFalse ? alert('Do not leave the fields blank.') : dispatch({type:ADD_CAR,payload:{...newFormValues}})

  }
  
  const onDataUpdate = (e,dispatch) => {
    e.preventDefault();

    const isTrueOrFalse = Object.keys(formValues).some((key) => {
      if(formValues[key] === ''){return true}
      return false;
    })
    const newFormValues = {
      owner:formValues.owner,
      car:formValues.car,
      licensePlate:formValues.licensePlate,
      entryDate:formValues.entryDate.split('-').reverse().join("-"),
      exitDate:formValues.exitDate.split('-').reverse().join("-"),
    }
    isTrueOrFalse ? alert('Do not leave the fields blank.') : dispatch({type:UPDATE_CAR,payload:{id,...newFormValues}})
    
  }

  const reset = () => {
    setFormValues(initialValues);
    /*
    const inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
      inputs[i].value = "";
    }
    */
  }
  
  return (
    <main>
        <div className='body-wrapper p-32-0'>
          {
            show ?
            <div className='form-content'>
            <div className='app-title-box'>
              <h1 className='title'>Add Car to Parking Lot</h1>
                <div className='theme-box'>
                <button className={`theme-btn`} onClick={() => {
                        let theme = localStorage.getItem('theme') || 'light';
                        if(theme === 'light') {
                          localStorage.setItem('theme','dark')
                        }else {
                          localStorage.setItem('theme','light')
                        }
                        
                        setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark')
                    }}>
                        {
                            <p>{theme} Mode</p>
                        }
                    </button>
                </div>
            </div>

            <br />
            <div className='form-box'>
              <form onSubmit={(e) => onSubmitData(e,dispatch)}>
                <div className='form-control'>
                  <label htmlFor='owner' className='labelText'>
                    Owner
                    <input 
                    onChange={(e) => onChangeEvent(e)} 
                    type="text" 
                    name='owner' 
                    id='owner' 
                    className='owner' 
                    value={formValues.owner}
                    placeholder='Aman'
                    autoComplete='off'
                    required
                    />
                  </label>
                </div>
                <div className='form-control'>
                  <label htmlFor='car' className='labelText'>
                    Car
                    <input 
                    onChange={(e) => onChangeEvent(e)} 
                    type="text" 
                    name='car' 
                    id='car' 
                    className='car' 
                    value={formValues.car}
                    placeholder='Car'
                    autoComplete='off'
                    required
                    />
                  </label>
                </div>
                <div className='form-control'>
                  <label htmlFor='licensePlate' className='labelText'>
                    License Plate
                    <input 
                    type="text"
                    onChange={(e) => onChangeEvent(e)}
                    name='licensePlate' 
                    id='licensePlate' 
                    className='licensePlate'
                    value={formValues.licensePlate}
                    placeholder='NN-NN-LL,NN-LL-NN, .... etc'
                    autoComplete='off'
                    required
                    />
                  </label>
                </div>
                <div className='date-box'>
                  <div className='form-control' style={{width:'100%'}}>
                    <label htmlFor='enrtyDate' className='labelText'>
                      Entry Date
                      <input 
                      type="date"
                      onChange={(e) => onChangeEvent(e)}
                      name='entryDate' 
                      id='enrtyDate' 
                      className='enrtyDate'
                      value={formValues.entryDate}
                      required
                      />
                    </label>
                  </div>
                  <div className='form-control' style={{width:'100%'}}>
                  <label htmlFor='exitDate' className='labelText'>
                    Exit Date
                    <input 
                    type="date"
                    onChange={(e) => onChangeEvent(e)}
                    name='exitDate' 
                    id='exitDate' 
                    className='exitDate'
                    value={formValues.exitDate}
                    required
                    />
                  </label>
                </div>
                </div>
                <div className='submit-btn-box'>
                  <button type='submit'>
                    Add Car
                  </button>
                </div>
                <div className='submit-btn-box' style={{padding:'0 0'}}>
                  <button onClick={() => reset()} type="button">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
          :
          <div className='form-content'>
            <div className='app-title-box'>
              <h1 className='title'>Update the Car in the Parking Lott</h1>
              <div className='theme-box'>
                <button className={`theme-btn`} onClick={() => {
                        let theme = localStorage.getItem('theme') || 'light';
                        if(theme === 'light') {
                          localStorage.setItem('theme','dark')
                        }else {
                          localStorage.setItem('theme','light')
                        }
                        
                        setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark')
                    }}>
                        {
                            <p>{theme} Mode</p>
                        }
                    </button>
                </div>
            </div>
            <br />
            <div className='form-box'>
              <form onSubmit={(e) => onDataUpdate(e,dispatch)}>
                <div className='form-control'>
                  <label htmlFor='owner' className='labelText'>
                    Owner
                    <input 
                    onChange={(e) => onChangeEvent(e)} 
                    type="text" 
                    name='owner' 
                    id='owner' 
                    className='owner' 
                    value={formValues.owner}
                    placeholder='Aman'
                    autoComplete='off'
                    required
                    />
                  </label>
                </div>
                <div className='form-control'>
                  <label htmlFor='car' className='labelText'>
                    Car
                    <input 
                    onChange={(e) => onChangeEvent(e)} 
                    type="text" 
                    name='car' 
                    id='car' 
                    className='car' 
                    value={formValues.car}
                    placeholder='Car'
                    autoComplete='off'
                    required
                    />
                  </label>
                </div>
                <div className='form-control'>
                  <label htmlFor='licensePlate' className='labelText'>
                    License Plate
                    <input type="text"
                    onChange={(e) => onChangeEvent(e)} 
                    name='licensePlate' 
                    id='licensePlate' 
                    className='licensePlate'
                    value={formValues.licensePlate}
                    placeholder='NN-NN-LL,NN-LL-NN, .... etc'
                    autoComplete='off'
                    required
                    />
                  </label>
                </div>
                <div className='date-box'>
                  <div className='form-control' style={{width:'100%'}}>
                    <label htmlFor='enrtyDate' className='labelText'>
                      Entry Date
                      <input 
                      type="date"
                      onChange={(e) => onChangeEvent(e)} 
                      name='entryDate' 
                      id='enrtyDate' 
                      className='enrtyDate'
                      value={formValues.entryDate}
                      autoComplete='off'
                      required
                      />
                    </label>
                  </div>
                  <div className='form-control' style={{width:'100%'}}>
                  <label htmlFor='exitDate' className='labelText'>
                    Exit Date
                    <input 
                    type="date"
                    onChange={(e) => onChangeEvent(e)} 
                    name='exitDate' 
                    id='exitDate' 
                    className='exitDate'
                    value={formValues.exitDate}
                    autoComplete='off'
                    required
                    />
                  </label>
                </div>
                </div>
                <div className='submit-btn-box'>
                  <button type='submit'>
                    Update Car
                  </button>
                </div>
                <div className='submit-btn-box' style={{padding:'0 0'}}>
                  <button onClick={() => reset()} type="button">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
          }
        </div>
    </main>
  )
}

export default memo(Body);
