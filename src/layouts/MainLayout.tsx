interface IProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
    return <main className="h-screen w-full max-w-[100rem] mx-auto bg-slate-100">{children}</main>;
};

export default MainLayout;
