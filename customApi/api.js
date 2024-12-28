// const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL_VALIDATORS; // Import environment variable from configs

export const callApi = async () => {
  try {
    console.log("in v ::::::");
    const response = await fetch('http://192.168.1.88:8080/api/validators');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const res = await response.json();
    console.log(res, ":::::");
  } catch (error) {
  
    console.log(error,':::::::::: ');
  }
};


