import React, { useState } from "react";

const MetaTagGenerator: React.FC = () => {
  const [meta, setMeta] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const generatedCode = `<title>${meta.title || "Page Title"}</title>
<meta name="title" content="${meta.title}">
<meta name="description" content="${meta.description}">

<meta property="og:type" content="website">
<meta property="og:url" content="${meta.url}">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:image" content="${meta.image}">

<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${meta.url}">
<meta property="twitter:title" content="${meta.title}">
<meta property="twitter:description" content="${meta.description}">
<meta property="twitter:image" content="${meta.image}">`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 text-white">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-black tracking-tight">Meta Generator</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Site Title
            </label>
            <input
              name="title"
              value={meta.title}
              onChange={handleChange}
              placeholder="Enter page title"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Description
            </label>
            <textarea
              name="description"
              value={meta.description}
              onChange={handleChange}
              placeholder="Short summary of the page"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Page URL
            </label>
            <input
              name="url"
              value={meta.url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">
              Image URL
            </label>
            <input
              name="image"
              value={meta.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Generated HTML
            </label>
            <button
              onClick={copyToClipboard}
              className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <pre className="flex-1 bg-zinc-950 p-4 rounded-2xl border border-zinc-700 font-mono text-[11px] overflow-auto text-indigo-300 whitespace-pre-wrap leading-relaxed shadow-inner">
            {generatedCode}
          </pre>
        </div>
      </div>

      <div className="mt-8 p-4 bg-indigo-900/20 rounded-2xl border border-indigo-500/20 text-[11px] text-zinc-400 leading-relaxed">
        <span className="text-indigo-400 font-bold uppercase mr-2">
          Pro Tip:
        </span>
        Paste these tags into the{" "}
        <code className="text-indigo-300 font-bold">{"<head>"}</code> section of
        your HTML. Use an image with a **1200x630** aspect ratio for the best
        results across all social networks.
      </div>
    </div>
  );
};

export default MetaTagGenerator;
