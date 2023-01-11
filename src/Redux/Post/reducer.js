const initial_state = {
  data: [],
  editUser: [],
  newData: [],
  userList: [],
  filterName: "",
  filterState: false,
  ComState: [],
  createPost:[]
};

export const datareducer = (state = initial_state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        data: action.payload,
        newData: action.payload,
      };
    case "DELETE_USER":
      const remove = state.data.filter((el) => el.id !== action.payload);
      return {
        ...state,
        newData: remove,
      };
      case "CREATE_DATA":
        return {
          ...state,
          createPost: action.payload,
        };
    case "EDIT_USER":
      const editdata = state.data.filter((el) => el.id === action.payload);
      return {
        ...state,
        editUser: editdata,
      };

    case "GET_USER":
      const editu = state.data.filter((el) => el.id !== action.payload);
      return {
        ...state,
        newData: editu,
      };

    case "GET_USER_DATA":
      return {
        ...state,
        userList: action.payload,
      };

    case "NAME":
      return {
        ...state,
        filterName: action.payload,
      };

    case "SET_RESULT":
      return {
        ...state,
        filterState: action.payload,
      };
    case "SET_COMMENT":
      return {
        ...state,
        ComState: action.payload,
      };
    default:
      return state;
  }
};
