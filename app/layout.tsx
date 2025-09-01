import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/app/context/ThemeProvider";
import { Toaster } from "react-hot-toast"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const code = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Code Viewer",
  description: "Inspect code with ease at simple-code-viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function () {
            const valid = ['dark', 'light'];
            const localTheme = localStorage.getItem("scv-theme") || 'light';
            const html = document.documentElement;

            if (valid.includes(localTheme)) {
              html.classList.add(localTheme);
              html.style.colorScheme=localTheme;
            }

          })()
          `,
          }}
        />
      </head>
      <body className={`${code.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
