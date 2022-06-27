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
    CommentaryButton,
    PostLoading
} from "./style";

// import Image01 from "../../assets/water-animal/image5.jpg"

import { TrashSimple, Chat, Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { storage } from "../../../../../utils/keys/firebaseconfig";
import { Header } from "../../../../../components/Header";
import { Loading } from "../../../../../components/Loading";
import { pallete } from "../../../../../styles/colors";
import { CommentaryCard } from "../../../../../components/CommentaryCard";
import { useAuthLogin } from "../../../../../context/AuthContext";

interface RouterProperties {
    id: string;
}

export default function Post() {

    const [image, setImage] = useState<any>();
    const {
        userSectionId
    } = useAuthLogin()

    async function getImageFromApi() {
        const data = await fetch("http://127.0.0.1:3001/setimg/", {
            method: "GET",
            headers: {
                "Authorization": `debug`
            }
        }).then(result => result.text().then(link => link));
        const foresRef = ref(storage, "pexels-ylanite-koppens-2479246.jpg");
        // const foresRef = ref(storage, "trigo.jpg");
        getDownloadURL(foresRef)
        .then(url => {
            setImage(url)
    
        })
        .catch(error => console.log(error))
    }

    async function sendCommentaryToPost() {
        const commentary = await fetch("http://127.0.0.1:3001/comments", {
            method: "GET",
            headers: {
                "Authorization": `debug`
            },
            // body: {}
        })
    }

    useEffect(() => {
        getImageFromApi()
    }, [])

    return (
        <Container>
            <Header userId={userSectionId}/>
            <PostContainer>
                <PostArea>
                    <PostContent>
                        {image ? (
                            <PostImage>
                                <Image 
                                    src={image}
                                    alt={"Imagem da postagem"}
                                    width={"100%"}
                                    height={"50vh"}
                                    layout="responsive"
                                    objectFit="cover"
                                />
                            </PostImage>
                        ) : (
                            <PostLoading>
                                <Loading/>
                            </PostLoading>
                        )}
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
                            maxLength={500} 
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
