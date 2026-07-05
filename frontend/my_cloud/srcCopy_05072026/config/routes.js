export const HOME_ROUTE = "/";
export const CONTACTS_ROUTE = "/contacts";
export const NOT_FOUND_ROUTE = "*";
export const REGISTER_ROUTE = "/register";
export const ADMIN_USER_ROUTE = '/admin/users';
export const FILES_ROUTE = '/files';
export const LOGIN_ROUTE = "/login";
export const FILE_ROUTE = ":id";
export const fileRoute = (id) => FILES_ROUTE + `/${id}`;