import { HeaderAuth } from "@/components/auth/HeaderAuth";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        <HeaderAuth />
    <main className="lg:col-span-5 max-w-[480px] w-full mx-auto flex flex-col justify-center px-6 py-12">
          {children}
        </main>
    </div>
  );
}