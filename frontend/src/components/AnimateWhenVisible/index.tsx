import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import * as Styled from './styled';
import { BsFillEmojiWinkFill } from 'react-icons/bs';

interface AnimateWhenVisibleProps {
    icon: String;
    text: string;
    threshold?: number;
}

const AnimateWhenVisible = ({
    icon,
    text,
    threshold = 0.5,
}: AnimateWhenVisibleProps) => {
    const { ref, inView } = useInView({ threshold });
    return (
        <Styled.Container>
            <div ref={ref} className={`transform ${inView ? "show" : ""}`}>
                <BsFillEmojiWinkFill />
                <Styled.Text>
                    {text}
                </Styled.Text>
            </div>

        </Styled.Container>

    );
};

export default AnimateWhenVisible;
