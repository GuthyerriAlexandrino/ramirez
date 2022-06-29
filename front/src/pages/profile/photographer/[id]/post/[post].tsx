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
import { getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { Header } from "../../../../../components/Header";
import { Loading } from "../../../../../components/Loading";
import { pallete } from "../../../../../styles/colors";
import { CommentaryCard } from "../../../../../components/CommentaryCard";
import { parseCookies } from "nookies";
import { storage, ref } from "../../../../../utils/keys/firebaseconfig";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useNotify } from "../../../../../context/NotifyContext";

interface Post {
    price: number,
    title: string,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id, post } = context.params!;
    const { ["ramirez-user"]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const data: Post = await fetch(`http://localhost:3001/post/${id}/${post}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    const postContent = {
        price: data.price ?? null,
        title: data.title ?? null,
    }

    return {
        props: {
            postContent,
        },
    }
}

interface PostImage {
    image: string;
}

interface PostScreenProps {
    postContent: Post
}

export default function Post({ postContent }: PostScreenProps) {

    const router = useRouter();

    const [image, setImage] = useState<any>();
    const [userCommentary, setUserCommentary] = useState("");

    const {
        notifyError,
        notifySuccess
    } = useNotify();

    let cookies = parseCookies();
    let userSectionId = cookies["ramirez-user-id"];

    async function getImageFromApi() {

        const userId = window?.location.pathname.split("/")[3];
        const postId = window?.location.pathname.split("/")[5];

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const data: PostImage = await fetch(`http://127.0.0.1:3001/post/${userId}/${postId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(result => result.json());

        if (data.image !== undefined) {
            const foresRef = ref(storage, data.image);
            await getDownloadURL(foresRef)
            .then(url => {
                setImage(url)
            })
            .catch(error => console.log(error))
        }
    }

    async function deletePost() {

        const postId = window?.location.pathname.split("/")[5];

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const data: PostImage = await fetch(`http://127.0.0.1:3001/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(result => result.json())
        .catch(error => error.json())

        console.log(data)
    }

    async function sendCommentaryToPost() {

        if (userCommentary === "") {
            notifyError("Error! Comentário está vazio!");
            return;
        }

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const userId = window?.location.pathname.split("/")[3];
        const postId = window?.location.pathname.split("/")[5];

        const newComment = {
            comment: {
                user_id: userId,
                content: userCommentary,
                post_id: postId
            }
        }

        const res = await fetch("http://127.0.0.1:3001/comments", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newComment)
        }).then(response => response)
        .catch(error => console.log(error))

        console.log(res)
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
                            <span>
                                {postContent.title}
                                {postContent.price ? ` - R$ ${postContent.price}` : ""}
                            </span>
                            <IconsArea>
                                <TrashSimple 
                                    color={pallete.grayOne} 
                                    size={30} 
                                    weight="fill"
                                    style={{cursor: "pointer"}}
                                    onClick={() => deletePost()}
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
                            onChange={(event) => setUserCommentary(event.target.value)}
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
