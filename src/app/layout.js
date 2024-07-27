
// import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
