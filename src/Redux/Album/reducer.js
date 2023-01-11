const initial_state = {
  data: [],
  editbut: [],
  newData: [],
  imgState: [],
  createAlbum:[]
};

export const albumreducer = (state = initial_state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "CREATE_DATA":
      return {
        ...state,
        createAlbum: action.payload,
      };
    case "EDIT_USER":
      const editdata = state.data.filter((el) => el.id === action.payload);
      return {
        ...state,
        editbut: editdata,
      };
    

    case "DELETE_USER":
      const remove = state.data.filter((el) => el.id !== action.payload);
      console.log("nnn", remove);
      return {
        ...state,
        newData: remove,
      };

    case "SET_PHOTO":
      return {
        ...state,
        imgState: action.payload,
      };
    default:
      return state;
  }
};
