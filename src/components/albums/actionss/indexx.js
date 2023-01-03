import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const get = (data) => {
  return {
    type: "GET_DATA",
    payload: data,
  };
};

export const editbut = (user) => {
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

export const cre = (create) => {
  console.log("lllll", create);
  return {
    type: "CREATE",
    payload: create,
  };
};

export const userdelete = (id) => {
  return {
    type: "DELETE_USER",
    payload: id,
  };
};

export const setPhoto = (imgg) => {
  console.log("uu", imgg);
  return {
    type: "SET_PHOTO",
    payload: imgg,
  };
};
export const getAlb = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}albums`)
      .then((res) => dispatch(get(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getedit = (data, id) => {
  console.log(id, data, "sdfasfdasfsfasrdf");

  return (dispatch) => {
    axios
      .patch(`${BASE_URL}posts/${id}`, data)
      .then((res) => {
        dispatch(editbut(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getimg = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}photos`)
      .then((res) => {
        console.log("iii", res.data);
        dispatch(setPhoto(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
