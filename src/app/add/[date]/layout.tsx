import Header from "@/components/Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full h-screen justify-center font-pretendard overflow-x-scroll">
      <main className="w-[700px] h-fit flex flex-col items-center gap-4 px-10 py-10">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
