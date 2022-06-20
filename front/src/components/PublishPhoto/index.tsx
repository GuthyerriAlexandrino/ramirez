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
    PreviewImage
} from "./style";

import { FilePlus, XCircle } from "phosphor-react";
import { pallete } from "../../styles/colors";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { parseCookies } from "nookies";

interface Post {
    title: string;
    image: File;
    price?: number;
}

type PublishPhotoProps = {
    handlePopUp: (value: boolean) => void;
}

export function PublishPhoto({handlePopUp}: PublishPhotoProps) {

    const [photoImageContent, setPhotoImageContent] = useState<File>();
    const [photoPrice, setPhotoPrice] = useState<number | null>();
    const [photoTitle, setPhotoTitle] = useState("");

    async function addNewPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const imageData = new FormData();
        imageData.append('image', photoImageContent!, photoTitle)

        let cookies = parseCookies();
        let token = cookies["ramirez-user"]

        const newPost = {
            post: {
                title: photoTitle,
                image: photoImageContent,
                price: photoPrice ? photoPrice : 0
            }
        }
        
        const res = await fetch("http://localhost/3001/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .catch(error => error);
        console.log(res)
    }

    return (
        <PopupContainer>
            <FormAreaContainer>
                <IconArea onClick={() => handlePopUp(false)}>
                    <XCircle color={pallete.red} weight="fill" size={40} />
                </IconArea>
                <Typography>Postar uma nova foto</Typography>
                <FormArea onSubmit={addNewPost}>
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
                        <InputValue
                            type="number" 
                            id="price" 
                            name="price" 
                            placeholder="Digite aqui o preço da voto. Ex.: 100"
                            onChange={(event) => setPhotoPrice(Number(event.target.value))}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Foto</label>
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
