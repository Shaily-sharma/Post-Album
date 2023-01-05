const initial_state = {
  data: [],
  editUser: [],
  newData: [],
  userList: [],
  filterName: "",
  filterState: false,
  ComState: [],
  submit: [],
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
      console.log("vvv", state.data);
      const remove = state.data.filter((el) => el.id !== action.payload);
      console.log("kkk", remove);
      return {
        ...state,
        newData: remove,
      };
    case "CREATE_USER":
      return {
        ...state,
        create: action.payload,
      };
    case "CREATE":
      return {
        ...state,
        submit: action.payload,
      };
    case "EDIT_USER":
      const editdata = state.data.filter((el) => el.id === action.payload);
      console.log(editdata);
      return {
        ...state,
        editUser: editdata,
      };

    case "GET_USER":
      console.log(state.data);
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
