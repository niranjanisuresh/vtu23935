import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../middleware/logMiddleware";
import "../styles/redirect.css";

const RedirectPage: React.FC = () => {
  const { shortcode } = useParams<{ shortcode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginalUrl = () => {
      const mockDatabase: Record<string, string> = {
        abcd1: "https://example.com",
        xyz99: "https://openai.com"
      };

      const url = shortcode ? mockDatabase[shortcode] : undefined;

      if (url) {
        logEvent("info", true, "page.RedirectPage");
        window.location.replace(url);
      } else {
        logEvent("error", false, "page.RedirectPage");
        navigate("/error", { state: { message: "Shortcode not found." } });
      }
    };

    fetchOriginalUrl();
  }, [shortcode, navigate]);

  return (
    <div className="redirect-message">Redirecting...</div>
  );
};

export default RedirectPage;
