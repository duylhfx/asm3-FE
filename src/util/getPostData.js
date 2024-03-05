import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// "https://asm3-be-e7fc.onrender.com";
// "http://localhost:5000"
axios.defaults.baseURL = "https://asm3-be-e7fc.onrender.com";
const serverUrl = "https://asm3-be-e7fc.onrender.com";

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
