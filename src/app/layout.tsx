import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ReactQueryProvider } from "~/components/ReactQueryProvider";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Campaign List Manager",
  description: "An easy way to manage your email campaign list",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, "dark")}>
      <body>
        <ReactQueryProvider>
          <main>{children}</main>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
