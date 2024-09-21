const fetcher = (url: string) => fetch(url).then(repsonse => repsonse.json());

export default fetcher;
