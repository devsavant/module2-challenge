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
    showCart:false,
    selectedItems:{},
    products: [],
    total:0
}
export default function (state = initialData, action) {
    switch (action.type) {
        case "UPDATE_CART":
            return {
                ...state,
                selectedItems: action.payload,
                total: Object.values(action.payload).reduce((total, {price=0,unitsAdded}) => total + price * unitsAdded, 0)

            }
        case "SET_PRODUCTS":
            return {...state, products: action.payload }

        case "FETCH_FAILED":{
            alert(action.payload)
            return;
        }

        case "SET_CART_VISIVILITY":
            return {...state, showCart: action.payload }

        default: return state;
    }
}

export function getItemsEpic(action$) {
    return action$.pipe(
        ofType("GET_PRODUCTS"),
        switchMap(() => {
            return concat(
                ajax.getJSON('https://backend-panel.herokuapp.com/products').pipe(
                    map(resp=>({type:"SET_PRODUCTS", payload:resp.result})),
                    catchError(err=>{
                        return of({type: "FETCH_FAILED", payload: err.message})
                    })
                )
            )
        })
    )
}

export function addItemEpic(action$, state$){
    return action$.pipe(
        ofType("ADD_ITEM"),
        switchMap(({payload})=>{
            let itemsAdded = state$.value.app.selectedItems;
            itemsAdded[payload._id] = {...payload,unitsAdded: itemsAdded[payload._id] ? itemsAdded[payload._id].unitsAdded + 1 : 1}

            return concat(
                of({type:"UPDATE_CART", payload:itemsAdded}),
                of({type:"SHOW_CART"})
            );
        })
    )
}
export function substractItemEpic(action$, state$){
    return action$.pipe(
        ofType("SUBSTRACT_ITEM"),
        switchMap(({payload})=>{
            let itemsAdded = state$.value.app.selectedItems;
            if(itemsAdded[payload._id]){
                itemsAdded[payload._id] = {...payload,unitsAdded: itemsAdded[payload._id].unitsAdded - 1 }
                if(itemsAdded[payload._id].unitsAdded <= 0){
                    delete itemsAdded[payload._id]
                }
                return of({type:"UPDATE_CART", payload:itemsAdded})
            }
        })
    )
}

export function removeItemEpic(action$, state$){
    return action$.pipe(
        ofType("REMOVE_ITEM"),
        switchMap(({payload})=>{
            let itemsAdded = state$.value.app.selectedItems;
            delete itemsAdded[payload]
            return of({type:"UPDATE_CART", payload:itemsAdded})
        })
    )
}

export function showCartEpic(action$){
    return action$.pipe(
        ofType("SHOW_CART"),
        switchMap(()=>{
            return of({type:"SET_CART_VISIVILITY", payload:true})
        })
    )
}

export function hideCartEpic(action$){
    return action$.pipe(
        ofType("HIDE_CART"),
        switchMap(()=>{
            return of({type:"SET_CART_VISIVILITY", payload:false})
        })
    )
}

