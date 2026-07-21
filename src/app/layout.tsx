import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Practero — Where plans meet reality",
    template: "%s | Practero",
  },
  description:
    "An evidence-backed implementation workspace for forward-deployed teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
