import { useState } from 'react';
import Loading from '../../Loading';
import Modal from '../Modal';
import * as Styled from './styles';
import { useNavigate } from 'react-router';

type ModalProps = {
  id: number;
  onCancel: () => void;
};

const ModalUpdateUser = (props: ModalProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {

  };

  const content = (
    <Styled.Content>
      <Styled.Paragraph>
        Deseja deletar essa conta e todos os visitantes relacioados ah essa conta?
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
      top='14vh'
      showButtonClose={false}
      children={isLoading ? loading : content}
      footer={footer}
      onCancel={props.onCancel}
      onSubmit={handleSubmit}
    />
  );
};

export default ModalUpdateUser;
