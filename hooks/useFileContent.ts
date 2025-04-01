import { useEffect, useState } from "react";

import { getContent } from "../lib/fileSystem";

const useFileContent = (path: string, isVaultUrl = false) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    // parse a url
    // new URL(href!, window.location.toString()).searchParams.get("path")!

    // if request already exists, return it
    const requestPath = isVaultUrl ? path : getContent(path);
    const cache = sessionStorage.getItem(requestPath);
    if (cache && cache.length > 0) {
      setContent(cache);
    }

    // otherwise fetch content again
    else {
      setContent(null);
      fetch(requestPath)
        .then((res) => {
          if (res.status === 404) return "";
          return res.text();
        })
        .then((newContent) => {
          setContent(newContent);
          sessionStorage.setItem(requestPath, newContent);
        });
    }
  }, [path]);

  return content;
};

export default useFileContent;
