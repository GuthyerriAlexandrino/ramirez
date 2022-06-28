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
import { parseCookies } from "nookies";

export default function Post() {

    const router = useRouter();

    const [image, setImage] = useState<any>();
    const [userCommentary, setUserCommentary] = useState("");

    let cookies = parseCookies();
    let userSectionId = cookies["ramirez-user-id"]

    async function getImageFromApi() {

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const data = await fetch("http://127.0.0.1:3001/setimg/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
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

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const newComment = {
            comment: {
                user_id: router.query.id,
                content: userCommentary
            }
        }

        await fetch("http://127.0.0.1:3001/comments", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newComment)
        }).then(response => response)
        .catch(error => console.log(error))
    }

    async function incrementLikeAmountInACommentary(commentaryId: string) {

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const incrementLike = {
            comment: {
                post_id: router.query.post,
                author_id: userSectionId
            }
        }

        await fetch(`http://127.0.0.1:3001/comments/${commentaryId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(incrementLike)
        }).then(response => response)
        .catch(error => console.log(error))
    }

    async function deleteACommentaryFromPost(commentaryId: string) {

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const commentaryToDelete = {
            comment: {
                post_id: router.query.post,
                author_id: userSectionId
            }
        }

        await fetch(`http://127.0.0.1:3001/comments/${commentaryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(commentaryToDelete)
        }).then(response => response)
        .catch(error => console.log(error))
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
                            onClick={(event) => setUserCommentary(event.currentTarget.value)}
                        />
                        <CommentaryButton
                            type="button"
                            title="Clique para comentar"
                            value={"Comentar"}
                            onClick={() => sendCommentaryToPost()}
                        >
                            Comentar
                        </CommentaryButton>
                    </CommentaryInputContainer>
                    <FeedBackArea>
                        <h2>Comentários (4)</h2>
                        <FeedBackList>
                            <CommentaryCard
                                id="1"
                                incrementLikes={incrementLikeAmountInACommentary}
                                deleteCommentary={deleteACommentaryFromPost}
                            />
                        </FeedBackList>
                    </FeedBackArea>
                </PostArea> 
            </PostContainer>
        </Container>
    )
}
