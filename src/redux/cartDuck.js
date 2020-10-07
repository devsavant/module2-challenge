import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat } from 'rxjs';

export function addItemEpic(action$, state$) {
    return action$.pipe(
        ofType('ADD_ITEM'),
        switchMap(({ payload }) => {
            let itemsAdded = state$.value.app.selectedItems;
            itemsAdded[payload._id] = { ...payload, unitsAdded: itemsAdded[payload._id] ? itemsAdded[payload._id].unitsAdded + 1 : 1 };
            return concat(
                of({ type: 'UPDATE_CART', payload: itemsAdded }),
                of({ type: 'SHOW_CART' })
            );
        })
    );
}

export function substractItemEpic(action$, state$) {
    return action$.pipe(
        ofType('SUBSTRACT_ITEM'),
        switchMap(({ payload }) => {
            let itemsAdded = state$.value.app.selectedItems;
            if (itemsAdded[payload._id]) {
                itemsAdded[payload._id] = { ...payload, unitsAdded: itemsAdded[payload._id].unitsAdded - 1 }
                if (itemsAdded[payload._id].unitsAdded <= 0) {
                    delete itemsAdded[payload._id];
                }
                return of({ type: 'UPDATE_CART', payload: itemsAdded })
            }
        })
    );
}

export function removeItemEpic(action$, state$) {
    return action$.pipe(
        ofType("REMOVE_ITEM"),
        switchMap(({payload}) => {
            let itemsAdded = state$.value.app.selectedItems;
            delete itemsAdded[payload];
            return of({ type: 'UPDATE_CART', payload:itemsAdded });
        })
    );
}