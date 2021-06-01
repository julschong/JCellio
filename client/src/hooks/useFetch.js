//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url, token) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...');
        setData(null);
        setError(null);
        const source = axios.CancelToken.source();
        axios
            .get(url, {
                cancelToken: source.token,
                headers: { Authorization: token }
            })
            .then((res) => {
                setLoading(false);
                //checking for multiple responses for more flexibility
                //with the url we send in.
                res.data.data && setData(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                setError('An error occurred. Awkward..');
            });
        return () => {
            source.cancel();
        };
    }, [url, token]);

    return { data, loading, error };
}

export default useFetch;
