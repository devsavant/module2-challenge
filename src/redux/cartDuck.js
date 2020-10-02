import {ajax} from 'rxjs/ajax'

import {
    switchMap,
    catchError,
    map
} from 'rxjs/operators'
import {
    ofType
} from 'redux-observable'
import { of, concat } from 'rxjs'
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
        case "SET_PRODUCTS":{
            console.log('llegooo');
            return {...state, products: action.payload }
        }
        default: return state;
    }
}

export function getItems(action$) {
    console.log('-**********************************------------');
    console.dir(action$);
    console.log('-*-------------------------------------------*--');
    return action$.pipe(
        ofType("GET_PRODUCTS"),
        //x(),
        switchMap(({payload}) => {
            console.log('*-*-**-*-*-*-*-')
            console.log('dentro del switch');
            console.dir(payload);
            console.log('*-**-**-*-*-*-');
            return concat(
                ajax.getJSON('https://backend-panel.herokuapp.com/products').pipe(
                    map(resp=>({type:"SET_PRODUCTS", payload:resp.result})),
                    catchError(err=>{
                        console.log('erroooooooor');
                        console.dir(err);
                    })
                )
            )
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