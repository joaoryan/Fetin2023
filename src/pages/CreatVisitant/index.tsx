import { useForm } from 'react-hook-form';
import * as Styled from './styled';
import { useNavigate } from 'react-router';
import Header from '../../components/Hader';
import CameraInput from '../../components/CameraInput';
import { FaArrowLeft } from 'react-icons/fa';
import { creat, creatImg, creatVisitantResident } from '../../services/axios';
import { useState } from 'react';


type FormValues = {
  name: string;
  phone: number;
};



export function CreatVisitant(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const [img, setImg] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleCapture = (imageData: string) => {
    img.push(imageData)
    setImg(img)
  };

  const onSubmit = async (data: FormValues) => {

    for (let index = 0; index < img.length; index++) {
      const imageUrl = img[index];
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = `captured_image.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }

    setTimeout(() => {
      creat(data.name)
        .then(resp => {
        })
        .catch(error => {
          console.log(error)
        })
      navigate('/home')
    }, 1000);

    /*
    console.log(data)
    const user = {
      name: data.name,
      phone: data.phone,
      serialNumber: 123,
      residentId: 1,
      image: img[0]
    }
    creatVisitantResident(user)
      .then(resp => {
        console.log(resp)
        for (var item of img) {
          const user = {
            userId: resp.data.id,
            image: item,
            serialNumber: 123
          }
          creatImg(user)
        }
        navigate('/home')
      })
      .catch(error => {
        console.log(error)
      })
    
    */
  };

  return (
    <>
      <Styled.Page>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Title>CRIAR USUÁRIO</Styled.Title>
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
                    defaultValue={''}
                    {...register('name', { required: true })}
                    disabled={formState.isSubmitting}
                  />
                  {formState.errors.name && <Styled.Error>Nome é obrigatório</Styled.Error>}
                </Styled.Label>
              </Styled.InfoDiv>
            </Styled.InputsDiv>
          </div>
          <div>
            <Styled.ButtonDiv>
              <Styled.Button onClick={() => (setImg([]), navigate(-1))} >
                {'voltar'}
              </Styled.Button>
              <Styled.Button type="submit">
                {'salvar'}
              </Styled.Button>
            </Styled.ButtonDiv>
          </div>
        </Styled.Form>
      </Styled.Page>
    </>
  );
};
