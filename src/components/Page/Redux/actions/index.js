import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const setPersonName = (name) => {
  return {
    type: "NAME",
    payload: name,
  };
};

export const get = (data) => {
  return {
    type: "GET_DATA",
    payload: data,
  };
};

export const userdelete = (id) => {
  return {
    type: "DELETE_USER",
    payload: id,
  };
};

export const getUserData = (data) => {
  return {
    type: "GET_USER_DATA",
    payload: data,
  };
};

export const setResult = (res) => {
  return {
    type: "SET_RESULT",
    payload: res,
  };
};

export const editUser = (user) => {
  console.log("jjjjj", user);
  return {
    type: "EDIT_USER",
    payload: user,
  };
};
export const sub = (ndata) => {
  return {
    type: "CREATE_USER",
    payload: ndata,
  };
};
export const crea = (create) => {
  console.log("lllll", create);
  return {
    type: "CREATE",
    payload: create,
  };
};
export const setComment = (com) => {
  return {
    type: "SET_COMMENT",
    payload: com,
  };
};

export const getRecord = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}posts`)
      .then((res) => dispatch(get(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editRecord = (data, id) => {
  console.log(id, data, "sdfasfdasfsfasrdf");

  return (dispatch) => {
    axios
      .patch(`${BASE_URL}posts/${id}`, data)
      .then((res) => {
        dispatch(editUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}users`)
      .then((res) => {
        dispatch(getUserData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getComment = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}comments`)
      .then((res) => dispatch(setComment(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};
