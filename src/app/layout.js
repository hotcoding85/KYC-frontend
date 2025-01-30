import { Inter } from "next/font/google";
import "./globals.css";

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Powered by thirteenx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            <ModalProvider>
              <UserProvider>
              {children}
              </UserProvider>
            </ModalProvider>
          </AuthProvider>
          
              {/* {children} */}
          
      </body>
    </html>
  );
}
