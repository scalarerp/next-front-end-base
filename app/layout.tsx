// import { Inter } from "next/font/google";
import type { Metadata } from "next";

// import { ThemeProvider } from "@/components/providers/theme-provider";
// import { ModalProvider } from "@/components/providers/modal-provider";

import "./globals.css";
import "./fonts.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { TailwindIndicator } from "@/components/tailwind-indicator.tsx";
// import { SiteHeader } from "@/components/site-header";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next frontEnd",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
          // fontSans.variable
        )}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="next-frontend-theme-2"
        >
          <ModalProvider />
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <TailwindIndicator />
        </ThemeProvider> */}

        <Link href={"/teste"}>Teste</Link>
        <Link href={"/"}>Home</Link>

        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
};
export default RootLayout;
