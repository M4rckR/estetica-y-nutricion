import { HeaderAuth } from "@/components/auth/HeaderAuth";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:grid lg:grid-cols-12 min-h-screen bg-m-green-dark lg:bg-white">
        <HeaderAuth />
        <main className="lg:col-span-5 lg:max-w-[480px] px-4 ">
              {children}
        </main>
    </div>
  );
}