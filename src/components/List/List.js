import React, { useContext, useState} from 'react'
import { CarParkingContext } from '../../contexts/CarParkingProvider';
import Car from '../Car/Car';
import './list.css';
import { BodyContext } from '../../contexts/BodyProvider';

const List = () => {
    const [filterText, setFilterText] = useState('');
    const { cars } = useContext(CarParkingContext);
    const { setShow} = useContext(BodyContext);

    const filteredCars = cars.filter((car) => {
        return Object.keys(car).some((key) => {
            return car[key]
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())
        })
    })

    const preventDefault = (e) => {
        e.preventDefault();
    }

    const radioBtnReset = () => {
        setShow((show) => {
            if(show === false){
                const radioButtons = document.getElementsByName('update');
                radioButtons.forEach((radioButton) => {
                    radioButton.checked = false;
                })
                return true;
            }else{
                const radioButtons = document.getElementsByName('update');
                radioButtons.forEach((radioButton) => {
                    radioButton.checked = false;
                })
                return true;
            }
        });
      }

  return (
    <footer>
        <div className='search-wrapper'>
            <div className='search-title-box'>
                <div className='list-title'>
                    <h1>List of Cars in Parking Lot</h1>
                </div>
                <div className='search-box'>
                    <form onSubmit={(e) => preventDefault(e)}>
                        <input
                        type='text'
                        name='search'
                        id='search'
                        placeholder='Search Word'
                        onChange={(e) => setFilterText(e.target.value)}
                        autoComplete="off"
                        />
                    </form>
                </div>
            </div>
        </div>

        <div className='list-of-cars-wrapper'>
            <div className='list'>
                <table className='list-of-Cars'>
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Car</th>
                            <th>License Plate</th>
                            <th>Entry Plate</th>
                            <th>Exit Plate</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCars.length > 0
                            ?
                            filteredCars.map((car) => {
                                return (
                                    <Car 
                                    key={car.id}
                                    id={car.id}
                                    owner={car.owner}  
                                    car={car.car}
                                    licensePlate={car.licensePlate}
                                    entryDate={car.entryDate}
                                    exitDate={car.exitDate}                                      
                                    />
                                )
                            })
                            :
                            <tr>
                                <td colSpan={8} style={{fontWeight:'bold'}}>Nothing with {filterText} content found.</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className='rst-radio-btns'>
                    <button type='button' className='radio-btn-reset' onClick={(e) => radioBtnReset()}>
                        Radio Buttons Reset
                    </button>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default List;
