import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// "https://asm3-be-e7fc.onrender.com";
// "http://localhost:5000"
// https://be-aplshop-6e47979688b7.herokuapp.com
axios.defaults.baseURL = "https://be-aplshop-6e47979688b7.herokuapp.com";
const serverUrl = "https://be-aplshop-6e47979688b7.herokuapp.com";

const token = localStorage.getItem("jwt") || null;

// get data
function useGetData(path) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function getData(value) {
    if (value) {
      setUser(value);
    } else {
      setLoading(true);
      setError(null);
      axios
        .get(path, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => setError(err.response))
        .finally((end) => setLoading(false));
    }
  }

  return [user, getData, loading, error];
}

// Post data
function usePostData(path, data, direction, cb) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function postData() {
    setLoading(true);
    setError(null);
    axios
      .post(path, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.msg);
        navigate(direction);
        cb();
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally((rs) => setLoading(false));
  }

  return [postData, loading, error];
}

export { useGetData, usePostData, serverUrl };
