import { Header } from "../../components/Header";
import { 
    Container, 
    ContentFooter, 
    FeedBackArea, 
    FeedBackList, 
    IconsArea, 
    PostContainer, 
    PostArea,
    PostContent, 
    PostImage,
    CommentaryInputContainer,
    CommentaryInput,
    CommentaryButton
} from "./style";

// import Image01 from "../../assets/water-animal/image5.jpg"

import { TrashSimple, Chat, Heart } from "phosphor-react";
import { pallete } from "../../styles/colors";
import { CommentaryCard } from "../../components/CommentaryCard";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/keys/firebaseconfig";
import Image from "next/image";

export default function Post() {

    const [image, setImage] = useState<any>();

    async function getImageFromApi() {
        const data = await fetch("http://127.0.0.1:3001/setimg/", {
            method: "GET",
            headers: {
                "Authorization": `debug`
            }
        }).then(result => result.text().then(link => link));
        const foresRef = ref(storage, "pexels-ylanite-koppens-2479246.jpg");
        getDownloadURL(foresRef)
        .then(url => {
            setImage(url)
    
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getImageFromApi()
    }, [])

    return (
        <Container>
            <Header/>
            <PostContainer>
                <PostArea>
                    <PostContent>
                        <PostImage>
                            <Image 
                                src={image}
                                width={"100%"}
                                height={"100%"}
                                alt={"Imagem da postagem"}
                            />
                        </PostImage>
                        <ContentFooter>
                            <span>R$ 25,00</span>
                            <IconsArea>
                                <TrashSimple 
                                    color={pallete.grayOne} 
                                    size={30} 
                                    weight="fill"
                                    style={{cursor: "pointer"}}
                                />
                                <Chat 
                                    color={pallete.grayOne} 
                                    size={30} weight="fill" 
                                    style={{marginLeft: "1.25rem", cursor: "pointer"}} 
                                />
                                <Heart 
                                    color={pallete.grayOne} 
                                    size={30} 
                                    weight="fill" 
                                    style={{marginLeft: "1.25rem", cursor: "pointer"}} 
                                />
                            </IconsArea>
                        </ContentFooter>
                    </PostContent>
                    <CommentaryInputContainer>
                        <CommentaryInput
                            placeholder="Escreva aqui o seu comentário"
                            cols={50}
                            minLength={0}
                            maxLength={3000} 
                        />
                        <CommentaryButton
                            type="button"
                            title="Clique para comentar"
                            value={"Comentar"}
                        >
                            Comentar
                        </CommentaryButton>
                    </CommentaryInputContainer>
                    <FeedBackArea>
                        <h2>Comentários (4)</h2>
                        <FeedBackList>
                            <CommentaryCard/>
                        </FeedBackList>
                    </FeedBackArea>
                </PostArea> 
            </PostContainer>
        </Container>
    )
}
