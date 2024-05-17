import { useEffect, useState } from 'react';
import { db } from '../data/db';

export function useCar () {

    const initialCar = () => {
        const localStorageCar = localStorage.getItem('car');
        return localStorageCar ? JSON.parse(localStorageCar) : []
    }


    const [data, setdata] = useState(db)
    const [ car, setCar ] = useState(initialCar)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1
    // console.log(data)

    useEffect( ()=> {
        localStorage.setItem('car', JSON.stringify(car));
    }, [car])

    function addToCar(item) {

        const itemExist = car.findIndex( guitar => guitar.id === item.id)

        if ( itemExist >=0 ) { // item exists
            if( car[itemExist].quantity >= MAX_ITEMS ) return;
            const updateCart = [...car]

            updateCart[itemExist].quantity++;
            setCar( updateCart );

               } else { // item does not exist
            item.quantity = 1;
            setCar([...car, item])
        }

    }

    function removeFromCar(id) {
        setCar( prevCart => prevCart.filter( guitar => guitar.id !== id) );
    }

    function increaseQuantity(id) {
        
       const updateCar =  car.map( item => {

            if( item.id === id && item.quantity < MAX_ITEMS ) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }

            return item
       })
       setCar( updateCar )
    }

    function decrementQuantity(id) {
        const updateCar = car.map( item => {

            if( item.id === id && item.quantity > MIN_ITEMS ) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }

            return item
        })

        setCar( updateCar )
    }

    function clearCart () {
        setCar([])
    }

    // State derivado 
    const isEmpty = useMemo( ()=> car.length === 0, [car] );
    const carTotal = useMemo( ()=> car.reduce( ( total, item ) => total + (item.quantity * item.price), 0 ), [car] );
    
    return {
        addToCar,
        car,
        carTotal,
        clearCart,
        data,
        decrementQuantity,
        increaseQuantity,
        isEmpty,
        removeFromCar,
    }
}