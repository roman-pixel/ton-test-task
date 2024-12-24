/* eslint-disable @typescript-eslint/no-explicit-any */
export const useLocalStorage = () => {
  const setItem = (key: string, value: any) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  const getItem = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  const removeItem = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return { setItem, getItem, removeItem };
};
