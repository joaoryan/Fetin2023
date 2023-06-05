import { useInView } from "react-intersection-observer";
import * as Styled from './styled';
import image from '../../assets/image/cat2.jpg';
import { MdDeleteForever, MdEdit } from "react-icons/md";
import ModalUpdateUserVisitant from "../Modals/ModalUpdateVisitant";
import { useState } from "react";

interface CardProps {
    img: string,
    name: string,
    timeAnimate: number,
    threshold?: number,
    modalDelete: () => void,
}

const CardVisitant = ({
    img,
    name,
    timeAnimate,
    threshold = 0.2,
    modalDelete,
}: CardProps) => {
    const [showModalUpdateUserVisitant, setShowModalUpdateUserVisitant] = useState(false);
    const { ref, inView } = useInView({ threshold })
    return (
        <>
            {showModalUpdateUserVisitant && (
                <ModalUpdateUserVisitant
                    id={1}
                    onCancel={() => setShowModalUpdateUserVisitant(false)}
                />
            )}
            <Styled.Card time={timeAnimate}>
                <div ref={ref} className={`transform ${inView ? "show" : ""}`}>
                    <Styled.Icon>
                        <div onClick={() => modalDelete()}>
                            Remover
                            <MdDeleteForever />
                        </div>
                        <div onClick={() => setShowModalUpdateUserVisitant(true)}>
                            Editar
                            <MdEdit />
                        </div>
                    </Styled.Icon>
                    <img src={image} />
                    <Styled.Text>{name}</Styled.Text>
                </div>
            </Styled.Card>
        </>
    );
};

export default CardVisitant;
