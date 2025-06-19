import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import trpcClient from "./trpc";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      const response = await trpcClient.createShortUrl.mutate({ url });
      setShortUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUrls = async () => {
    try {
      const response = await trpcClient.getShortUrl.query("xn8mc5");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUrls();
  }, []);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-6 max-w-sm bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">URL shorty </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter you url here"
              className="w-full p-2 border border-gray-100 rounded-md mb-4"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Shorten URL
            </button>
          </form>

          {shortUrl && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Your shortend url is {shortUrl}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
