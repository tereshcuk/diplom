import { useParams } from "react-router";

import { files } from "../../data/files";
import { FileDetails } from "../files/FileDetails";

export const loader = ({ params }) => {
    const id = +params.id;
    return {
        id,
    };
};

// /recipes/:id -> /recipes/45
export const FileDetailsRoute = () => {
    const { id } = useParams();
    // const { id } = params;
    // console.log('files ID = ', id);
    const currentfile = files.find((f) => f.id === +id);

    return (
        <>
            {currentfile && <FileDetails {...currentfile} />}
            {!currentfile && "файл не найден!"}
        </>
    );
};