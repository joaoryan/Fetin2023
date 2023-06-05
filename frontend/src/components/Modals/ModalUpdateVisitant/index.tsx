import { useState } from 'react';
import Loading from '../../Loading';
import Modal from '../Modal';
import * as Styled from './styles';
import { useNavigate } from 'react-router';
import image from '../../../assets/image/cat2.jpg';
import { useForm } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';

type ModalProps = {
  id: number;
  onCancel: () => void;
};

type FormValues = {
  name: string;
  phone: number;
};

const ModalUpdateUserVisitant = (props: ModalProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit111 = () => {

  };

  const content = (
    <Styled.Content>
      <Styled.Image>
        <img src={image} />
        <div>
          <Styled.ImageDiv>
            alterar
            <MdEdit />
          </Styled.ImageDiv>
        </div>
      </Styled.Image>

      <Styled.InfoDiv>
        <Styled.Label>
          Nome:
          <Styled.Input
            type="name"
            defaultValue={''}
            {...register('name', { required: true })}
            disabled={formState.isSubmitting}
          />
          {formState.errors.name && <Styled.Error>Nome é obrigatório</Styled.Error>}
        </Styled.Label>
        <Styled.Label>
          Telefone:
          <Styled.Input
            type="phone"
            {...register('phone', { required: true })}
            disabled={formState.isSubmitting}
          />
          {formState.errors.phone && <Styled.Error>Telefone é obrigatório</Styled.Error>}
        </Styled.Label>
      </Styled.InfoDiv>
    </Styled.Content>
  );

  const loading = <Loading />;

  const footer = (
    <>
      <Styled.Button onClick={() => props.onCancel()} >
        {'voltar'}
      </Styled.Button>
      <Styled.Button >
        {'salvar'}
      </Styled.Button>
    </>
  );
  return (
    <Modal
      title={'EDITAR USUÁRIO'}
      width='900px'
      top='26vh'
      showButtonClose={false}
      children={isLoading ? loading : content}
      footer={footer}
      onCancel={props.onCancel}
      onSubmit={handleSubmit111}
    />
  );
};

export default ModalUpdateUserVisitant;
