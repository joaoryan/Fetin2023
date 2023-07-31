import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { useNavigate } from 'react-router';
import Header from '../../components/Hader';
import ModalCreatVisitant from '../../components/Modals/ModalCreatVisitant';
import CameraInput from '../../components/CameraInput';
import { FaArrowLeft } from 'react-icons/fa';
import image from '../../assets/image/joao-ryan.png';

type FormValues = {
  name: string;
  phone: number;
  cpf: string;
  address: string
};

export function UpdateUser(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const navigate = useNavigate();

  const user =
  {
    id: 1,
    name: 'joao ryan',
    email: 'test@gmail.com',
    img: image,
    phone: '(35) 9 99372979',
    cpf: '111.111.111-11',
    address: 'Rua em algum lugar'
  }

  const handleCapture = (imageData: string) => {
    // Faça algo com a imagem capturada, como enviar para o servidor
    console.log('Image captured:', imageData);
  };

  return (
    <>
      <Styled.Page>
        <Styled.Content>
          <Styled.Title>EDITAR USUÁRIO</Styled.Title>
          <div>
            <Styled.InputsDiv>
              <Styled.Image>
                <CameraInput onCapture={handleCapture} />
              </Styled.Image>
              <Styled.InfoDiv>
                <Styled.Label>
                  Nome:
                  <Styled.Input
                    type="text"
                    defaultValue={user.name}
                    {...register('name', { required: true })}
                    disabled={formState.isSubmitting}
                  />
                  {formState.errors.name && <Styled.Error>Nome é obrigatório</Styled.Error>}
                </Styled.Label>
                <Styled.Label>
                  CPF:
                  <Styled.Input
                    type="text"
                    defaultValue={user.cpf}
                    {...register('cpf', { required: true })}
                    disabled={formState.isSubmitting}
                  />
                  {formState.errors.cpf && <Styled.Error>CPF é obrigatório</Styled.Error>}
                </Styled.Label>
                <Styled.Label>
                  Endereço:
                  <Styled.Input
                    type="text"
                    defaultValue={user.address}
                    {...register('address', { required: true })}
                    disabled={formState.isSubmitting}
                  />
                  {formState.errors.address && <Styled.Error>Endereço é obrigatório</Styled.Error>}
                </Styled.Label>
                <Styled.Label>
                  Telefone:
                  <Styled.Input
                    type="phone"
                    defaultValue={user.phone}
                    {...register('phone', { required: true })}
                    disabled={formState.isSubmitting}
                  />
                  {formState.errors.phone && <Styled.Error>Telefone é obrigatório</Styled.Error>}
                </Styled.Label>
              </Styled.InfoDiv>
            </Styled.InputsDiv>
          </div>
          <div>
            <Styled.ButtonDiv>
              <Styled.Button onClick={() => navigate(-1)} >
                {'voltar'}
              </Styled.Button>
              <Styled.Button >
                {'salvar'}
              </Styled.Button>
            </Styled.ButtonDiv>
          </div>
        </Styled.Content>
      </Styled.Page>
    </>
  );
};
