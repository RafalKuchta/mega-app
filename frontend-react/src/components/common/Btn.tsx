import React from 'react';
import './Btn.css';

interface Props {
    text: string;
    class?: string;
}

export const Btn = (props: Props) => (
    <button className={props.class}>{props.text}</button>
);