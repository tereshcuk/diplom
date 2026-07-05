import { Outlet } from "react-router";
import { MainMenu } from "./MainMenu";

export const MainTemplate = () => {
    return (
        <div>
            <header>
                <MainMenu />
            </header>
            <main className='main'>
                <Outlet />
            </main>
        </div>
    );
};