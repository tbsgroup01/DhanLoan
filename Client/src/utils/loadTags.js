const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const loadTrackingTags = async () => {
  try {

    const res = await fetch(`${API_BASE}/tags`);
    const tags = await res.json();

    tags.forEach((tag) => {

      if (!tag.is_active) return;

      const container = document.createElement("div");
      container.innerHTML = tag.tag_code;

      const scripts = container.querySelectorAll("script");

      scripts.forEach((oldScript) => {

        const newScript = document.createElement("script");

        /* external script */
        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = true;
        }

        /* inline script */
        if (oldScript.innerHTML) {
          newScript.textContent = oldScript.innerHTML;
        }

        /* append to head or body */

        if (tag.location === "head") {
          document.head.appendChild(newScript);
        } else {
          document.body.appendChild(newScript);
        }

      });

    });

  } catch (error) {
    console.error("Tag loading failed:", error);
  }
};