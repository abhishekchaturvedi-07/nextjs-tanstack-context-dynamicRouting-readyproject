import AppWrapper from "../components/AppWrapper";
import UserCard from "../components/UserCard";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          <UserCard />
          <main className="pt-16">{children}</main>
        </AppWrapper>
      </body>
    </html>
  );
}
