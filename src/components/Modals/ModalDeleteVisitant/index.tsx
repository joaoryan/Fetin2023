import { useState } from 'react';
import Loading from '../../Loading';
import Modal from '../Modal';
import * as Styled from './styles';
import { useNavigate } from 'react-router';
import { deleteUser, deleteUserResident } from '../../../services/axios';

type ModalProps = {
  name: string;
  onCancel: () => void;
};

const ModalDeleteVisitant = (props: ModalProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    deleteUser(props.name)
      .then(resp => {
        console.log(resp)
        navigate('/home')
      })
      .catch(error => {
        console.log(error)
      })
  };

  const content = (
    <Styled.Content>
      <Styled.Paragraph>
        Deseja deletar esse usuario? isso removerá o acesso a residencia
      </Styled.Paragraph>
    </Styled.Content>
  );

  const loading = <Loading />;

  const footer = (
    <>
      <Styled.Button onClick={() => props.onCancel()} >
        {'voltar'}
      </Styled.Button>
      <Styled.Button >
        {'deletar'}
      </Styled.Button>
    </>
  );
  return (
    <Modal
      title={'EXCLUIR USUÁRIO'}
      width='500px'
      top='38vh'
      showButtonClose={false}
      children={isLoading ? loading : content}
      footer={footer}
      onCancel={props.onCancel}
      onSubmit={handleSubmit}
    />
  );
};

export default ModalDeleteVisitant;
