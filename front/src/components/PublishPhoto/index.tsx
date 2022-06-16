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
    IconArea
} from "./style";

import { FilePlus, XCircle } from "phosphor-react";
import { pallete } from "../../styles/colors";
import { useState } from "react";

interface Post {
    title: string;
    image: File;
    price?: number;
}

type PublishPhotoProps = {
    handlePopUp: (value: boolean) => void;
}

export function PublishPhoto({handlePopUp}: PublishPhotoProps) {

    const [post, setPost] = useState<Post>({} as Post);


    async function addNewPost() {

        const imageData = new FormData();
        imageData.append('image', post?.image, post.image?.name)

        const newPost = {
            post: {
                title: post.title,
                image: imageData,
                price: post.price ? post.price : 0
            }
        }
        
        const res = await fetch("http://localhost/3001/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .catch(error => error);
        console.log(newPost)
    }


    return (
        <PopupContainer>
            <FormAreaContainer>
                <IconArea onClick={() => handlePopUp(false)}>
                    <XCircle color={pallete.red} weight="fill" size={40} />
                </IconArea>
                <Typography>Postar uma nova foto</Typography>
                <FormArea>
                    <InputContainer>
                        <label htmlFor="title">Título</label>
                        <InputValue 
                            type="text" 
                            id="title" 
                            name="title" 
                            placeholder="Digite aqui um título para sua foto"
                            required
                            onChange={(event) => setPost({...post, title: event.target.value})}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="price">Preço</label>
                        <InputValue
                            type="number" 
                            id="price" 
                            name="price" 
                            placeholder="Digite aqui o preço da voto. Ex.: 100"
                            onChange={(event) => setPost({...post, price: Number(event.target.value)})}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Foto</label>
                        <InputFileLabel>
                            <span>{post ? `> ${post}` : "Insira aqui uma foto"}</span>
                            <div>
                                <FilePlus color={pallete.grayTwo} weight="fill" size={40}/>
                            </div>
                            <InputFile
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Insira aqui uma foto"
                                required
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => e.target.files && setPost({...post, image: e.target.files[0]!})}
                            />
                        </InputFileLabel>
                    </InputContainer>
                    <ButtonSubmit type="button" onClick={addNewPost}>Postar foto</ButtonSubmit>
                </FormArea>
            </FormAreaContainer>            
        </PopupContainer>
    )
}
