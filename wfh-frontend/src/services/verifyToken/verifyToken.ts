export const verifyUser = async (token: string) => {
    const response = await fetch("http://localhost:5000/verifyuser", {
      method: "GET",
      body: JSON.stringify(token),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
};