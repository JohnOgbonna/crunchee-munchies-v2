'use client'
import { useEffect } from "react";

type TikTokEmbedProps = {
  username?: string;
};

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({ username = "crunchee.munchies" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center w-full min-h-[300px] md:min-h-[400px]">
      <blockquote
        className="tiktok-embed w-full h-full"
        cite={`https://www.tiktok.com/@${username}`}
        data-unique-id={username}
        data-embed-type="creator"
      >
        <section>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.tiktok.com/@${username}?refer=creator_embed`}
          >
            @{username}
          </a>
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokEmbed;
