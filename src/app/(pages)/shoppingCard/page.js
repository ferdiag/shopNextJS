"use client"
import React, { useContext } from 'react'
import { Store } from '../../context/Store'
import { handleAddShoppingcard } from '../../handlers/handleAddShoppingcard'
const ShoppingCard = () => {
    const { state, dispatch } = useContext(Store)
    const baseSrc = "http://192.168.0.149:4000/uploads/uploads/"

    console.log(state.shoppingCard)
    const handleDeleteFromShoppingcard = (e, index, state, dispatch) => {
        let updateshoppingCard = []
        if (state.shoppingCard[index].amount != 0) {
            updateshoppingCard = state.shoppingCard.with(index, {
                ...state.shoppingCard[index],
                amount: state.shoppingCard[index].amount - 1
            })

            dispatch({
                type: "SET_SHOPPINGCARD",
                payload: updateshoppingCard,
            });
        }

    }

    const displayArrayOfPictues = state.shoppingCard.map((pic, index) => {
        const src = baseSrc.concat("", pic.id).concat(".", pic.fileType)

        return <div key={index}><img src={src} alt="hallo welt" width={90} height={60} />
            <p>{pic.category}</p>
            <p>{pic.name}</p>
            <p>{pic.description}</p>
            <p>{pic.id}</p>
            <p>{pic.price}</p>
            <p>{pic.amount}</p>
            <button onClick={e => handleAddShoppingcard(e, index, state, dispatch)}>+</button>
            <button onClick={e => handleDeleteFromShoppingcard(e, index, state, dispatch)}>-</button>
        </div >
    })
    return (
        <div style={{ marginTop: "200px" }}>{state.shoppingCard.length > 0 ?
            displayArrayOfPictues : <div>Sie haben keine Waren im Warenkorb</div>
        }
        </div>
    )
}

export default ShoppingCard