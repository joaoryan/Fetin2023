import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { useNavigate } from 'react-router';
import Header from '../../components/Hader';
import ModalCreatVisitant from '../../components/Modals/ModalCreatVisitant';
import CameraInput from '../../components/CameraInput';

type FormValues = {
  name: string;
  phone: number;
};

export function CreatVisitant(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const navigate = useNavigate();
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
            <Styled.Image>
              <CameraInput onCapture={handleCapture} />
            </Styled.Image>

            <Styled.InfoDiv>
              <Styled.Label>
                Nome:
                <Styled.Input
                  type="text"
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
          </div>
          <div>
            <Styled.Button onClick={() => ''} >
              {'voltar'}
            </Styled.Button>
            <Styled.Button >
              {'salvar'}
            </Styled.Button>
          </div>
        </Styled.Content>

        {/* 
      <ModalCreatVisitant
        id={1}
        onCancel={() => navigate('/home')}
      />
      <Styled.Container>
        <Header />
      </Styled.Container>
      */}
      </Styled.Page>
    </>
  );
};
