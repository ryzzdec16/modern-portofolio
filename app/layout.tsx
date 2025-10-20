import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { NavbarWrapper } from "../components/NavbarWrapper";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Ryzzbe | Portfolio",
  description: "Showcasing projects and client work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-500 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <ClientLayout>
          <NavbarWrapper />
          <main className="min-h-screen">{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              className:
                "rounded-xl bg-gray-900 text-gray-100 border border-gray-700 shadow-lg shadow-black/20 px-4 py-3 text-sm",
            }}
          />
        </ClientLayout>
      </body>
    </html>
  );
}
