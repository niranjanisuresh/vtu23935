import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../middleware/logMiddleware";
import "../styles/redirect.css";

const RedirectPage: React.FC = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    logEvent("redirect_attempt", `Trying to redirect for shortcode: ${shortcode}`);

    
    const fetchOriginalUrl = async () => {
      try {
        const originalUrl = shortcode === "abcd1"
          ? "https://example.com"
          : "";

        if (originalUrl) {
          logEvent("redirect_success", `Redirecting to: ${originalUrl}`);
          window.location.replace(originalUrl);
        } else {
          logEvent("redirect_error", `Shortcode not found: ${shortcode}`);
          navigate("/error", { state: { message: "Short URL not found." } });
        }
      } catch (error) {
        logEvent("redirect_error", `Error fetching URL for: ${shortcode}`);
        navigate("/error", { state: { message: "An error occurred during redirection." } });
      }
    };

    fetchOriginalUrl();
  }, [shortcode, navigate]);

  return (
    <div className="redirect-message">
      Redirecting to your original URL...
    </div>
  );
};

export default RedirectPage;
