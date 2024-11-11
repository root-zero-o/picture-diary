import Header from "@/components/Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full h-screen justify-center font-pretendard">
      <main className="w-full h-fit max-w-[800px] min-w-[400px] flex flex-col items-center gap-4 px-10 py-10">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
