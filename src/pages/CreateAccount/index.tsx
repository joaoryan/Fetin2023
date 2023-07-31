import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { useNavigate } from 'react-router';
import RotateBanner from '../../components/RotateBanner';
import image from '../../assets/image/cat2.jpg';
import { FaImages } from 'react-icons/fa';
import CameraInput from '../../components/CameraInput';

type FormValues = {
  email: string;
  phone: number;
  password: string;
  codeAdm: string;
};

export function CreateAccount(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log(data); // Aqui você pode enviar os dados para a API de login
  };

  const handleCapture = (imageData: string) => {
    // Faça algo com a imagem capturada, como enviar para o servidor
    console.log('Image captured:', imageData);
  };

  return (
    <Styled.Container>
      <Styled.DivInputs>
        <Styled.Title>Crie sua conta</Styled.Title>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Image>
            <CameraInput onCapture={handleCapture} />
          </Styled.Image>
          <Styled.Label>
            Email:
            <Styled.Input
              type="email"
              {...register('email', { required: true })}
              disabled={formState.isSubmitting}
            />
            {formState.errors.email && <Styled.Error>Email é obrigatório</Styled.Error>}
          </Styled.Label>

          <Styled.Label>
            Senha:
            <Styled.Input
              type="password"
              minLength={8}
              {...register('password', { required: true })}
              disabled={formState.isSubmitting}
            />
            {formState.errors.password && <Styled.Error>Senha é obrigatória</Styled.Error>}
          </Styled.Label>

          <Styled.Label>
            Telefone:
            <Styled.Input
              type="phone"
              {...register('phone', { required: true })}
              disabled={formState.isSubmitting}
            />
            {formState.errors.email && <Styled.Error>Email é obrigatório</Styled.Error>}
          </Styled.Label>

          <Styled.Label>
            Codigo administrador:
            <Styled.Input
              type="text"
              minLength={8}
              {...register('codeAdm', { required: true })}
              disabled={formState.isSubmitting}
            />
            {formState.errors.codeAdm && <Styled.Error>Codigo do administrador é obrigatória</Styled.Error>}
          </Styled.Label>
          <Styled.divButton>
            <Styled.Button onClick={() => navigate(`/`)} disabled={formState.isSubmitting}>
              {formState.isSubmitting ? 'Aguarde...' : 'voltar'}
            </Styled.Button>
            <Styled.Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? 'Aguarde...' : 'entrar'}
            </Styled.Button>
          </Styled.divButton>
        </Styled.Form>
      </Styled.DivInputs>
      <Styled.DivImage>
        <RotateBanner />
      </Styled.DivImage>
    </Styled.Container>
  );
};
