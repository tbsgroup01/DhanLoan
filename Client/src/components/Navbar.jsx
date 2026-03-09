export default function Navbar({ settings }) {

  if (!settings) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white">

      <div className="flex items-center gap-2">

        {settings?.logo && (
          <img
            src={`http://localhost:3000${settings.logo}`}
            alt="logo"
            className="h-2 object-contain"
            
          />
        )}

        <span className="font-semibold text-lg text-gray-800">
          {settings?.site_title}
        </span>

      </div>

    </nav>
  );
}