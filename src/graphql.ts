const gql = (query: string, variables?: { [k: string]: unknown }) =>
  fetch(new URL("/graphql/", import.meta.env.PUBLIC_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json())
    .then((res) => {
      if (res.errors) throw new Error(res.error);
      return res.data ?? [];
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

export { gql };
