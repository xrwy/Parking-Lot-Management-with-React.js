import React, { createContext, useState } from 'react'
import { ADD_CAR, DELETE_CAR, UPDATE_CAR } from '../ActionTypes/ACTION_TYPES';


export const CarParkingContext = createContext();

const carParkingReducer = (state, action) => {
    switch (action.type) {
        case ADD_CAR:
            if (state.cars.length === 0) {
                const newPayload = {
                    id:1,
                    owner:action.payload.owner,
                    car:action.payload.car,
                    licensePlate:action.payload.licensePlate,
                    entryDate:action.payload.entryDate,
                    exitDate:action.payload.exitDate,
                }

                localStorage.setItem('cars', JSON.stringify([newPayload]))
                
                return {
                    ...state,
                    cars:JSON.parse(localStorage.getItem('cars')),
                }

            }else {
                console.log(action.payload);
                let findLastValue = JSON.parse(localStorage.getItem('cars'))[JSON.parse(localStorage.getItem('cars')).length - 1];
                
                const findOne = state.cars.find((car) => 
                    car.owner === action.payload.owner &&
                    car.car === action.payload.car &&
                    car.licensePlate === action.payload.licensePlate &&
                    car.entryDate === action.payload.entryDate &&
                    car.exitDate === action.payload.exitDate)

                if(findOne === undefined){
                    const newPayload = {
                        id:findLastValue.id + 1,
                        owner:action.payload.owner,
                        car:action.payload.car,
                        licensePlate:action.payload.licensePlate,
                        entryDate:action.payload.entryDate,
                        exitDate:action.payload.exitDate,
                    }
    
                    const localStorage_ = JSON.parse(localStorage.getItem('cars'));
                    const localStorageValues = [...localStorage_, newPayload];
                    localStorage.setItem('cars', JSON.stringify(localStorageValues))
    
                    return {
                        ...state,
                        cars:JSON.parse(localStorage.getItem('cars'))
                    }
                    
                }else {
                    alert('There is a car with this information.')
                    return {
                        ...state,
                    }
                }
            }
            
        case DELETE_CAR:
            const newCars = state.cars.filter((car) => car.id !== action.payload)
            localStorage.setItem('cars', JSON.stringify(newCars));

            return {
                ...state,
                cars:JSON.parse(localStorage.getItem('cars')),
            }
            
        case UPDATE_CAR:
            const findOne_ = state.cars.find((car) => 
                    car.owner === action.payload.owner &&
                    car.car === action.payload.car &&
                    car.licensePlate === action.payload.licensePlate &&
                    car.entryDate === action.payload.entryDate &&
                    car.exitDate === action.payload.exitDate)

            if(findOne_ === undefined){
                const findObject = state.cars.find((car) => car.id === action.payload.id);
                const indexOfValue = state.cars.indexOf(findObject);

                const newPayload_ = {
                    id:action.payload.id,
                    owner:action.payload.owner,
                    car:action.payload.car,
                    licensePlate:action.payload.licensePlate,
                    entryDate:action.payload.entryDate,
                    exitDate:action.payload.exitDate,
                }

                state.cars.splice(indexOfValue,1,newPayload_);
                localStorage.setItem('cars', JSON.stringify(state.cars));

                return {
                    ...state,
                    cars:JSON.parse(localStorage.getItem('cars')),
                }
                
            }else{
                alert('This information is available, you cannot update on the same information.');
                return {
                    ...state,
                }
            }
        default:
            break;
    }
}

const CarParkingProvider = ({ children }) => {
    const [cars, setCars] = useState(
        {
            cars:JSON.parse(localStorage.getItem('cars')) || [],
            dispatch:action => {
                setCars(cars => carParkingReducer(cars, action));
            }
        }
    );
    
  return (
    <CarParkingContext.Provider value={cars}>
        { children }
    </CarParkingContext.Provider>
  )
}

export default CarParkingProvider;
