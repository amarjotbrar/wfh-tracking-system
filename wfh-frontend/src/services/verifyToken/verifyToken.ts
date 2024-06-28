export const verifyUser = async (token: string) => {
    const response = await fetch("http://localhost:5000/verify-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    return response;
};