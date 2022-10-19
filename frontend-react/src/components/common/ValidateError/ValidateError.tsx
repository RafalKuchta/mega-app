import React from 'react';

interface Props {
    length: number;
    lengthMin: number;
    lengthMax: number;
    text: string;
}

export const ValidateError = (props: Props) => {
    return (
        (props.length > props.lengthMin && props.length < props.lengthMax)
        ?
        <p className='error'>{props.text}</p>
        :
        null
    )
}
