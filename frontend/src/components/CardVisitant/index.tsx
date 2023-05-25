import { useInView } from "react-intersection-observer";
import * as Styled from './styled';
import image from '../../assets/image/cat2.jpg';
import { MdDeleteForever, MdEdit } from "react-icons/md";

interface CardProps {
    img: string,
    name: string,
    timeAnimate: number,
    threshold?: number,
}

const CardVisitant = ({
    img,
    name,
    timeAnimate,
    threshold = 0.2,
}: CardProps) => {
    const { ref, inView } = useInView({ threshold })
    return (
        <Styled.Card time={timeAnimate}>
            <div ref={ref} className={`transform ${inView ? "show" : ""}`}>
                <Styled.Icon>
                    <div>
                        Remover
                        <MdDeleteForever />
                    </div>
                    <div>
                        Editar
                        <MdEdit />
                    </div>
                </Styled.Icon>
                <img src={image} />
                <Styled.Text>{name}</Styled.Text>
            </div>
        </Styled.Card>
    );
};

export default CardVisitant;
