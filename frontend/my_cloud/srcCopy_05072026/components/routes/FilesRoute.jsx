
import { files } from "../../data/files";
import { FilePreview } from "../files/FilePreview";
export const FilesRoute = () => {
    return (
        <div className='prevContainer'>
            <h1 className='text'>Список файлов</h1>
            {files.map(file => <FilePreview key={file.id} {...file} />)}
        </div>
    );
}