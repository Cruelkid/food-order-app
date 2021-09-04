import { useCallback, useState } from 'react';

const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (reqCfg, transformData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(reqCfg.url, {
                method: reqCfg.method ? reqCfg.method : 'GET',
                headers: reqCfg.headers ? reqCfg.headers : {},
                body: reqCfg.body ? JSON.stringify(reqCfg.body) : null,
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            transformData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useRequest;
