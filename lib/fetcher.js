export default async function fetcher (url, options = {}) {
  const data = await fetch(url, options);
  return data.json();
}
