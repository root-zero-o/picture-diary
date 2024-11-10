import Header from "@/components/Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full h-screen justify-center font-pretendard">
      <main className="w-full max-w-[800px] min-w-[600px] h-full flex flex-col items-center p-10 pb-16 gap-4">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
