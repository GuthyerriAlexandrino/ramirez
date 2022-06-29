import Image from "next/image";
import { Heart, TrashSimple } from "phosphor-react";
import { 
    CommentaryDetail, 
    CommentaryImage, 
    CommentaryInfo, 
    CommentaryProfile, 
    Container, 
    Content, 
    IconsArea
} from "./style";

import Image01 from "../../assets/photographer-profile.png";
import { pallete } from "../../styles/colors";
import { useEffect, useState } from "react";
import { Comment } from "../../pages/profile/photographer/[id]/post/[post]";
import { parseCookies } from "nookies";
import { ref, storage } from "../../utils/keys/firebaseconfig";
import { getDownloadURL } from "firebase/storage";
import { formatDate } from "../../utils/formatData";

interface CommentUser {
    name: string;
    profile_img: string;
}
interface CommentaryCardProps {
    id: string;
    content: Comment;
    incrementLikes: (commentaryId: string) => void;
    deleteCommentary: (commentaryId: string) => void;
}

export function CommentaryCard({id, content, incrementLikes, deleteCommentary}: CommentaryCardProps) {

    const [isLikeButtonClicked, setIsLikeButtonClicked] = useState(false);
    const [commentUser, setCommentUser] = useState<CommentUser>({} as CommentUser);
    const [profileImage, setProfileImage] = useState<string | null>();

    let cookies = parseCookies();
    let token = cookies["ramirez-user"];
    let userSectionId = cookies["ramirez-user-id"];

    async function getUserData() {

        const data: CommentUser = await fetch(`http://127.0.0.1:3001/users/${content.user_id.$oid}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(async result => {
            let user = await result.json();

            console.log(user)

            if (user.profile_img !== "") {
                const foresRef = ref(storage, user.profile_img);
                await getDownloadURL(foresRef)
                .then(url => setProfileImage(url))
                .catch(error => console.log(error));
            }


            return user;
        })
        .catch(error => error)

        setCommentUser(data)
    }


    useEffect(() => {
        getUserData();
    }, [])


    return (
        <Container>
            <CommentaryInfo>
                <CommentaryProfile>
                     <CommentaryImage>
                        {profileImage ? (
                            <Image 
                                src={profileImage}
                                width={50}
                                height={50}
                                layout="responsive"
                                objectFit="cover"
                                alt="Foto do usuário"
                            />
                        ) : (
                            <Image 
                                src={"/default-user.png"}
                                width={50}
                                height={50}
                                layout="responsive"
                                objectFit="cover"
                                alt="Foto do usuário"
                            />
                        )}
                    </CommentaryImage>
                    <CommentaryDetail>
                        <span>{commentUser.name}</span>
                        <span>{formatDate(content.created_at)}</span>
                    </CommentaryDetail>
                </CommentaryProfile>
                <IconsArea>
                    <Heart 
                        color={isLikeButtonClicked ? pallete.red : pallete.grayOne} 
                        size={30} 
                        weight="fill"
                        onClick={() => {
                            setIsLikeButtonClicked(!isLikeButtonClicked) 
                            incrementLikes(id)
                        }}
                        style={{cursor: "pointer", transition: "all 0.2s ease"}}
                    />
                    {userSectionId === content.user_id.$oid ? (
                        <TrashSimple 
                            color={pallete.grayOne} 
                            size={30} 
                            weight="fill" 
                            onClick={() => {
                                deleteCommentary(id)
                            }}
                            style={{marginLeft: "1.188rem", cursor: "pointer"}}
                        />
                    ) : (
                        ""
                    )}
                </IconsArea>
            </CommentaryInfo>
            <Content>
               {content?.content}
            </Content>
        </Container>
    )
}
