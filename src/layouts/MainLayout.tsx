interface IProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
    return <main className="h-screen w-full bg-slate-100">{children}</main>;
};

export default MainLayout;
