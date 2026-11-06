import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import '@fontsource/figtree/700.css';
import '@fontsource/bricolage-grotesque/700.css';
import '../globals.css';
import './admin.css';

export const metadata = { title: 'Admin · Ruta Suiza', robots: { index: false, follow: false } };
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#d52b1e' };

export default function AdminLayout({ children }) {
  return (
    <html lang="fr">
      <body className="adm">{children}</body>
    </html>
  );
}
