console.log("from index.js");
const redux = require('redux')
const createStore = redux.createStore

const CAKE_OREDERD = "CAKE_OREDERD"

const order_cake = ()=>{
    return({
    type: CAKE_OREDERD,
    quantity: 1,
})
}

const initial_State = {
    numOfCake: 10,
    
}

const reducer = ( state = initial_State, action)=>{

        switch(action.type){
            case CAKE_OREDERD : 
            return{
                ...state,
                numOfCake : state.numOfCake - 1,
            }
            default:
                return state
        }
}

const store = createStore(reducer)

console.log("the initial state cake state:", store.getState());

const unsubscribe = store.subscribe(()=>
    console.log("Updated state", store.getState())
)

store.dispatch(order_cake())
store.dispatch(order_cake())
store.dispatch(order_cake())
store.dispatch(order_cake())

unsubscribe()

store.dispatch(order_cake())


