import './Done.css';
import {useNavigate} from "react-router";

interface Props {
    text: string;
    message?: string;
    to?: any;
    done?: boolean;
}

export const Done = (props: Props) => {
    const navigate = useNavigate();

    return (
        <div className="done">
            <h3>{props.message}</h3>
            <button className='done-btn'
                    onClick={() => ((
                      navigate(`${props.to}`, {replace: true})
            ))}>{props.text}</button>
        </div>
    )
}