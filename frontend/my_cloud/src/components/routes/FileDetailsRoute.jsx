import { useLoaderData, useNavigate, useParams } from "react-router";

// import { files } from "../../data/files";
import { FileDetails } from "../files/FileDetails";

// export const loader = ({ params }) => {
//     const id = +params.id;
//     return {
//         id,
//     };
// };


export const FileDetailsRoute = () => {
    const navigate = useNavigate();
    const currentfile = useLoaderData(); // Объект файла { id, name, size, uploaded_at, owner }
    const { id } = useParams();   // Для кнопки "Назад" или логирования

    if (!currentfile) {
        return <p>Загрузка...</p>;
    }
    // const { id } = useParams();
    // const { id } = params;
    console.log('files ID = ', id);    

    // const currentfile = files.find((f) => f.id === +id);

    return (
        <>
            {currentfile && <FileDetails {...currentfile} />}
            {!currentfile && "файл не найден!"}
        </>
    );
};