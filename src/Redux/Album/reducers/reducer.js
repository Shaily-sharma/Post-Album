const initial_state = {
    data: [],
    editbut:[],
    newData:[],
    imgState:[],
    submit:[],
    create:[]
}

export const albumreducer = (state = initial_state, action) => {
    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                data: action.payload
            }
            case "EDIT_USER":

            const editdata = state.data.filter((el) => el.id === action.payload)
            console.log(editdata)
            return {
                ...state,
                editbut: editdata

            }
            case "CREATE_USER":
                return{
                    ...state,
                    create:action.payload
                }
                case "CREATE":
                    return{
                        ...state,
                        submit:action.payload
                    }
                case "DELETE_USER":
                    console.log("ppp",state.data)
                    const remove = state.data.filter((el) => el.id !== action.payload)
                    console.log("nnn",remove);
                    return {
                        ...state,
                        data: remove
                    }

                    case "SET_PHOTO":
                        console.log("999",action.payload);
                        return{
                            ...state,
                        imgState:action.payload    
                        }
        default:
            return state
    }
}