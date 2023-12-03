import { useState } from "react";

export const useSubscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucess] = useState(false);

  const subscribe = async (email: string) => {
    setIsLoading(true);

    await fetch("/api/convertkit", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw Error;
      })
      .then(() => {
        setIsSucess(true);
        setIsError(false);
      })
      .catch(() => {
        setIsSucess(false);
        setIsError(true);
      });

    setIsLoading(true);
  };

  return { subscribe, isLoading, isError, isSuccess };
};
