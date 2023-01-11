import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const setPersonName = (name) => {
  return {
    type: "NAME",
    payload: name,
  };
};

export const createPostData = (data) => {
  return {
    type: "CREATE_DATA",
    payload: data,
  };
};
export const getData = (data) => {
  return {
    type: "GET_DATA",
    payload: data,
  };
};

export const userDelete = (del) => {
  return {
    type: "DELETE_USER",
    payload: del,
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
      .then((res) => dispatch(getData(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editRecord = (data, id) => {
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

export const getParticularComment = (id) => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}posts/${id}/comments`)
      .then((res) => dispatch(setComment(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteData=(id)=>{
  return(dispatch)=>{
    axios.delete(`${BASE_URL}posts/${id}`)
    .then((res) => {
      dispatch(userDelete(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}


export const createPost = (data) => {
  console.log(data,"datdsadstdastdsgfasd");
  return (dispatch) => {
    axios.post(`${BASE_URL}posts`, data)
    .then((res) => {
      console.log(res.data,"======");
      dispatch(createPostData([res.data]));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}