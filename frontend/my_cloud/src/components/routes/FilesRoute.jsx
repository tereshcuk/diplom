import { FilePreview } from "../files/FilePreview";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from '../../config/routes';
import { useLoaderData } from "react-router";

export const FilesRoute = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    // console.log(' FilesRoute token: ', localStorage.getItem('token'));   
    const files = useLoaderData(); 
    if (!isAuthenticated) {        
        return <Navigate to={LOGIN_ROUTE} replace />;
    }
    return (
        <div className='prevContainer'>
            <h1 className='text'>Список файлов</h1>
            {files.map(file => <FilePreview key={file.id} {...file} />)}
        </div>
    );
}