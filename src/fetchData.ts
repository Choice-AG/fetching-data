function getSuspended<T>(promise: Promise<T>) {
  let status = "pending";
  let response : T | null = null;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  }

  return { read };
}


export function fetchData(url: string) {
  const promise = fetch(url)
    .then((response) => response.json())
    .then((data) => data)

  return getSuspended(promise);
}
