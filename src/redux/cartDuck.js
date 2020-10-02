import {
    switchMap,
} from 'rxjs/operators'
import {
    ofType
} from 'redux-observable'
import { of } from 'rxjs'
const initialData = {
    items:[],
    products: [],
    total:0
}
export default function (state = initialData, action) {
    switch (action.type) {
        case "UPDATE_CART":
            return {
                ...state,
                items: action.payload,
                //total:action.payload.reduce(())
            }
        case "SET_PRODUCTS":
            return {...state, products: action.payload }
        default: return state;
    }
}

export function getItems(action$) {
    return action$.pipe(
        ofType("GET_PRODUCTS"),
        switchMap(() => {
            fetch('https://backend-panel.herokuapp.com/products')
            .then(res=>res.json())
            .then(data=>{
                return of({type: "SET_PRODUCTS", payload: data.result})
            })
        })
    )
}

export function addItemEpic(action$){
    return action$.pipe(
        ofType("ADD_ITEM"),
        switchMap(({fieldName,newValue})=>{
            return of({type:"UPDATE_CART", payload:{newValue,fieldName}})
        })
    )
}
export function substractItemEpic(action$){
    return action$.pipe(
        ofType("SUBSTRACT_ITEM"),
        switchMap(({fieldName,newValue})=>{
            return of({type:"UPDATE_CART", payload:{newValue,fieldName}})
        })
    )
}
export function removeItemEpic(action$){
    return action$.pipe(
        ofType("REMOVE_ITEM"),
        switchMap(({fieldName,newValue})=>{
            return of({type:"UPDATE_CART", payload:{newValue,fieldName}})
        })
    )
}


// fetch('https://backend-panel.herokuapp.com/products')
//         .then(res=>res.json())
//         .then(data=>{
//             setProducts(data.result)
//         })