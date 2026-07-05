import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles } from '../../store/filesSlice'; // Импортируем thunk

const FilesPage = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.files);
    useEffect(() => {
        dispatch(fetchFiles());
    }, [dispatch]);
    if (status === 'loading') return <p>Загрузка файлов...</p>;
    if (error) return <p>Ошибка при загрузке файлов! {error}</p>;
    return (
        <div>
            <h2>Ваши файлы</h2>
            <ul>
                {items.map((file) => (
                    <li key={file.id}>
                        <strong>{file.name}</strong> - {file.size} байт. Комментарий:
                        "{file.comment}"
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default FilesPage;