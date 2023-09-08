import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { Navigate, useNavigate } from 'react-router';
import RotateBanner from '../../components/RotateBanner';
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from 'react';
import AnimateWhenVisible from '../../components/AnimateWhenVisible';
import { MdGroupAdd } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md'
import { RiContactsFill } from 'react-icons/ri'
import { FaArrowLeft } from 'react-icons/fa'
import TeamCard from '../../components/Equip';
import Header from '../../components/Hader';
import image from '../../assets/image/joao-ryan.png';
import CardVisitant from '../../components/CardVisitant';
import ModalDeleteVisitant from '../../components/Modals/ModalDeleteVisitant';
import { load } from '../../services/axios';
import Loading from '../../components/Loading';

export function Visitant(): JSX.Element {
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState<string>('');
    const [visitant, setVisitant] = useState<any[]>([]);
    const [loading, seLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        load()
            .then(resp => {
                seLoading(false)
                setVisitant(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    return (
        <>
            {showModalDeleteUser && (
                <ModalDeleteVisitant
                    name={deleteUser}
                    onCancel={() => setShowModalDeleteUser(false)}
                />
            )}
            {loading ?
                <Loading />
                :
                <Styled.Container>
                    <Header />
                    <Styled.RegressDiv>
                        <Styled.Regress onClick={() => navigate(`/home`)}>
                            <FaArrowLeft />
                            voltar
                        </Styled.Regress>
                    </Styled.RegressDiv>

                    <Styled.BodyDiv>
                        {visitant.map((item, index) =>
                            <CardVisitant visitant={item} timeAnimate={index / 4} deleteVisitant={() => setDeleteUser(item.name)} modalDelete={() => setShowModalDeleteUser(true)} />
                        )}
                    </Styled.BodyDiv>
                </Styled.Container>
            }
        </>
    );
};