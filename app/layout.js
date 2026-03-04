'use client';

import './globals.css';

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100">
        {children}
      </body>
    </html>
  );
}