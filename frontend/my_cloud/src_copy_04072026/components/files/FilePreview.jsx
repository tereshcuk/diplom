import { Link } from "react-router";

import { fileRoute } from "../../config/routes";

export const FilePreview = ({ id, original_name }) => {
    return (
        <div>            
            <h3>
            <Link to={fileRoute(id)}>{original_name}</Link>
            </h3>
        </div>
    );
};