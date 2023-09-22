import { useInView } from "react-intersection-observer";
import * as Styled from './styled';
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

interface CardProps {
    visitant: any,
    timeAnimate: number,
    threshold?: number,
    modalDelete: () => void,
    deleteVisitant: () => void,
}

const CardVisitant = ({
    visitant,
    timeAnimate,
    threshold = 0.2,
    modalDelete,
    deleteVisitant
}: CardProps) => {
    const navigate = useNavigate();
    const { ref, inView } = useInView({ threshold })
    const [imageSrc, setImageSrc] = useState('');
    console.log(visitant)
    useEffect(() => {
        // Converte os dados do buffer para uma URL de imagem base64
        const arrayBufferView = new Uint8Array(visitant.img.data);
        const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);

        // Limpa a URL da imagem quando o componente é desmontado
        return () => URL.revokeObjectURL(imageUrl);
    }, [visitant.img]);
    return (
        <>

            <Styled.Card time={timeAnimate}>
                <div ref={ref} className={`transform ${inView ? "show" : ""}`}>
                    <img src={imageSrc} alt="Imagem" />
                    <Styled.DivName>
                        <Styled.Text>{visitant.name}</Styled.Text>
                        <Styled.Icon>
                            <div onClick={() => (deleteVisitant(), modalDelete())}>
                                <MdDeleteForever />
                            </div>
                        </Styled.Icon>
                    </Styled.DivName>
                </div>
            </Styled.Card>
        </>
    );
};

export default CardVisitant;
