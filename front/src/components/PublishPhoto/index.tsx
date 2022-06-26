import { 
    FormArea,
    InputContainer,
    InputValue,
    InputFileLabel,
    InputFile,
    FormAreaContainer, 
    PopupContainer,
    Typography,
    ButtonSubmit,
    IconArea,
    IconContainer,
    PreviewImage,
    Icon
} from "./style";

import { FilePlus, Minus, Plus, XCircle } from "phosphor-react";
import { pallete } from "../../styles/colors";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { parseCookies } from "nookies";
import { formatBytes } from "../../utils/formatBytes";
import { useNotify } from "../../context/NotifyContext";

type PublishPhotoProps = {
    handlePopUp: (value: boolean) => void;
}

export function PublishPhoto({handlePopUp}: PublishPhotoProps) {

    const [photoImageContent, setPhotoImageContent] = useState<File>();
    const [photoPrice, setPhotoPrice] = useState<number | null>(null);
    const [photoTitle, setPhotoTitle] = useState("");

    const {
        notifyError
    } = useNotify();

    async function addNewPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!verifyIfSizesImageIsValid()) {
            notifyError("Falha ao postar conteúdo! Tamanho da imagem é maior que 2 MB!")
            return;
        }

        const imageData = new FormData();
        imageData.append('image', photoImageContent!, photoTitle)
        imageData.append('price', photoPrice?.toString()!, photoTitle)

        let cookies = parseCookies();
        let token = cookies["ramirez-user"]
        
        const newPost = {
            post: {
                img: imageData,
                price: 0,
                title: photoTitle
            }
        }
        
        const res = await fetch("http://localhost:3001/matarocris", {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'debug'
            },
            body: imageData
        }).then(response => response.json());
        console.log(res)
    }

    function changePhotoPrice(value: number) {
        if (value < 0) {
            setPhotoPrice((photoPrice! - 1) < 0 ? 0 : photoPrice! - 1);
            return;
        }
        setPhotoPrice(photoPrice! + 1)
    }

    function verifyIfSizesImageIsValid() {
        const {value, sizes} = formatBytes(photoImageContent?.size!);

        if (sizes === "mb" && value > 2) {
            return false;
        }
        return true;
    }

    function renderSizeOfImage() {
        const {value, sizes} = formatBytes(photoImageContent?.size!);

        return (
            <strong>{value!} <sub>{sizes}</sub></strong>
        )
    }

    return (
        <PopupContainer>
            <FormAreaContainer>
                <IconArea onClick={() => handlePopUp(false)}>
                    <XCircle color={pallete.red} weight="fill" size={40} />
                </IconArea>
                <Typography>Postar uma nova foto</Typography>
                <FormArea 
                    action="http://localhost:3001" 
                    encType="multipart/form-data"
                    method="post" 
                    onSubmit={addNewPost}
                >
                    <InputContainer>
                        <label htmlFor="title">Título</label>
                        <InputValue 
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="Digite aqui um título para sua foto"
                            required
                            onChange={(event) => setPhotoTitle(event.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="price">Preço</label>
                        <Icon 
                            title="Valor mínimo"
                            data-title="minus"
                            valuePosition={40}  
                            onClick={() => changePhotoPrice(-1)}
                        >
                            <Minus 
                                size={24} 
                                color={pallete.red} 
                                weight="bold" 
                            />
                        </Icon>
                        <Icon 
                            title="Valor máximo"
                            data-title="plus"
                            valuePosition={10}
                            onClick={() => changePhotoPrice(1)}
                        >
                            <Plus 
                                size={24} 
                                color={pallete.green} 
                                weight="bold" 
                            />
                        </Icon>
                        <InputValue
                            id="price" 
                            name="price" 
                            type="number"
                            value={photoPrice === null ? "" : photoPrice} 
                            onChange={(event) => setPhotoPrice(Number(event.target.value))}
                            placeholder="Digite aqui o preço da voto. Ex.: 100"
                            min={0}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Foto {renderSizeOfImage()} </label>
                        <InputFileLabel>
                            <span>{photoImageContent ? `> ${photoImageContent.name}` : "Insira aqui uma foto"}</span>
                            {photoImageContent ? (
                                <PreviewImage>
                                    <Image 
                                        src={URL.createObjectURL(photoImageContent!)} 
                                        alt="foto para publicação"
                                        layout="fixed"
                                        width={100}
                                        height={100}
                                        objectFit="cover"
                                    />
                                </PreviewImage>
                            ) : (
                                <IconContainer>
                                    <FilePlus color={pallete.grayTwo} weight="fill" size={40}/>
                                </IconContainer>
                            )}
                            <InputFile
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Insira aqui uma foto"
                                required
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => e.target.files && setPhotoImageContent(e.target.files[0]!)}
                            />
                        </InputFileLabel>
                    </InputContainer>
                    <ButtonSubmit type="submit">Postar foto</ButtonSubmit>
                </FormArea>
            </FormAreaContainer>            
        </PopupContainer>
    )
}
