
import { files } from "../../data/files";
import { FilePreview } from "../files/FilePreview";
export const FilesRoute = () => {
    return (
        <div>
            Список файлов
            {files.map(file => <FilePreview key={file.id} {...file} />)}
        </div>
    );
}