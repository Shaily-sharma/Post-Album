import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const getData = (data) => {
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
export const createAlbumData = (data) => {
  return {
    type: "CREATE_DATA",
    payload: data,
  };
};

export const userDelete = (del) => {
  return {
    type: "DELETE_USER",
    payload: del,
  };
};

export const setPhoto = (imgg) => {
  console.log("uu", imgg);
  return {
    type: "SET_PHOTO",
    payload: imgg,
  };
};
export const getAlbum = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}albums`)
      .then((res) => dispatch(getData(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getEdit = (data, id) => {
  console.log(id, data, "sdfasfdasfsfasrdf");

  return (dispatch) => {
    axios
      .patch(`${BASE_URL}albums/${id}`, data)
      .then((res) => {
        dispatch(editbut(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


export const getParticularImg = (id) => {
  console.log(id, "idddddd----");
  return (dispatch) => {
    axios
      .get(`${BASE_URL}albums/${id}/photos`)
      .then((res) => dispatch(setPhoto(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteData=(id)=>{
  console.log(id,"ffff");
  return(dispatch)=>{
    axios.delete(`${BASE_URL}albums/${id}`)
    .then((res) => {
      console.log(res.data,"======");
      dispatch(userDelete(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}


export const createAlbum = (data) => {
  console.log(data,"datdsadstdastdsgfasd");
  return (dispatch) => {
    axios.post(`${BASE_URL}albums`, data)
    .then((res) => {
      console.log(res.data,"======");
      dispatch(createAlbumData([res.data]));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}