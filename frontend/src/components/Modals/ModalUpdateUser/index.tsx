import { useState } from 'react';
import Loading from '../../Loading';
import Modal from '../Modal';
import * as Styled from './styles';
import { useNavigate } from 'react-router';
import image from '../../../assets/image/software1.jpeg';
import { useForm } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';

type ModalProps = {
  user: any;
  onCancel: () => void;
};

type FormValues = {
  email: string;
  phone: number;
  name: string;
  endereço: string;
};

const ModalUpdateUser = (props: ModalProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit111 = () => {

  };

  const content = (
    <Styled.Content>
      <Styled.Image>
        <img src={props.user.img} />
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
            type="text"
            defaultValue={props.user.name}
            {...register('name', { required: true })}
            disabled={formState.isSubmitting}
          />
          {formState.errors.email && <Styled.Error>Nome é obrigatório</Styled.Error>}
        </Styled.Label>
        <Styled.Label>
          Email:
          <Styled.Input
            type="text"
            defaultValue={props.user.email}
            {...register('email', { required: true })}
            disabled={formState.isSubmitting}
          />
          {formState.errors.email && <Styled.Error>Email é obrigatório</Styled.Error>}
        </Styled.Label>
        <Styled.Label>
          Telefone:
          <Styled.Input
            type="phone"
            defaultValue={props.user.phone}
            {...register('phone', { required: true })}
            disabled={formState.isSubmitting}
          />
          {formState.errors.phone && <Styled.Error>Telefone é obrigatório</Styled.Error>}
        </Styled.Label>

        <Styled.Label>
          Endereço:
          <Styled.Input
            type="text"
            defaultValue={props.user.endereço}
            {...register('endereço', { required: true })}
            disabled={formState.isSubmitting}
          />
          {formState.errors.endereço && <Styled.Error>Endereço é obrigatória</Styled.Error>}
        </Styled.Label>
        <Styled.Text onClick={() => navigate('/RecoverPasswordPage')}>
          alterar senha
        </Styled.Text>

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
      top='14vh'
      showButtonClose={false}
      children={isLoading ? loading : content}
      footer={footer}
      onCancel={props.onCancel}
      onSubmit={handleSubmit111}
    />
  );
};

export default ModalUpdateUser;
