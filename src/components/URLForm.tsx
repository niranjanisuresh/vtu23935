import React, { useState } from "react";
import { logEvent } from "../middleware/logMiddleware";
import "../styles/form.css";

const URLForm: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const validateUrl = (url: string): boolean => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +                      
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*))\\.)+" + 
      "[a-z]{2,}" +                              
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +         
      "(\\?[;&a-z\\d%_.~+=-]*)?" +               
      "(\\#[-a-z\\d_]*)?$",                      
      "i"
    );
    return pattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!validateUrl(longUrl)) {
      setError("Please enter a valid URL.");
      await logEvent("error", false, "component.URLForm");
      return;
    }

    const shortcode = customCode || Math.random().toString(36).substring(2, 8);
    const shortenedLink = `http://localhost:3000/${shortcode}`;

    await logEvent("info", true, "component.URLForm");

    setShortUrl(shortenedLink);
  };

  return (
    <div className="form-wrapper">
      <h2>🔗 URL Shortener</h2>
      <form className="url-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your long URL"
        />
        <input
          type="text"
          className="input-custom"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="Custom shortcode (optional)"
        />
        <button type="submit" className="submit-btn">
          Shorten
        </button>
      </form>

      {error && <div className="error-msg">{error}</div>}
      {shortUrl && (
        <div className="result-msg">
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  );
};


export default URLForm;
