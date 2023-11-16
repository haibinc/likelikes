import {useNavigate} from "react-router-dom";

export function ChangeWeb() {
    const navigate = useNavigate();

    const changeWeb = (path:string) =>
    {
        navigate(path);
    }

    return changeWeb;
}
