import styled from "styled-components";

interface Props {
    time: number,
}

export const Card = styled.div<Props>`
    img{
        max-width: 220px;
        border-radius: 10%;
        margin-bottom: 20px;
    }
    .transform {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        transition: all ${props => props.time}s ease-out;
        transform: translateY(30px);
        opacity: 0;
    }
    .transform.show {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const Text = styled.div`
    font-size: 20px;
    font-weight: bold;
    cursor: default;
`;

export const Text1 = styled.div`
    font-size: 16px;
    cursor: default;
`;
