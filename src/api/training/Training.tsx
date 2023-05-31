const GetUrl = async () => {
  try {
    const env: any = process.env;
    return env.ApiUrl;
  } catch {
    return "";
  }
};

export const GetAllData = async () => {
  // const url = await GetUrl();
  const url = "https://6475537ce607ba4797dbc627.mockapi.io/api/v1/training/";

  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const UpdateData = async (data: any) => {
  // const ApiUrl = GetUrl();
  const ApiUrl = "https://6475537ce607ba4797dbc627.mockapi.io/api/v1/training/";

  const id = data.id;
  delete data.id;
  const url = `${ApiUrl}${id}`;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  const res = await fetch(url, requestOptions);
  console.log(res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to update data");
  }

  return res.json();
};


export const CreateData = async (data: any) => {
  // const ApiUrl = GetUrl();
  const url = "https://6475537ce607ba4797dbc627.mockapi.io/api/v1/training/";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  const res = await fetch(url, requestOptions);
  console.log(res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to update data");
  }

  return res.json();
};

export const DeleteData = async (data: any) => {
  // const ApiUrl = GetUrl();
  const ApiUrl = "https://6475537ce607ba4797dbc627.mockapi.io/api/v1/training/";

  const id = data.id;
  delete data.id;
  const url = `${ApiUrl}${id}`;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, requestOptions);
  console.log(res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to update data");
  }

  return res.json();
};


// export const GetAllData = fetch(url);
