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
import { useState } from "react";

interface CommentaryCardProps {
    id: string;
    incrementLikes: (commentaryId: string) => void;
    deleteCommentary: (commentaryId: string) => void;
}

export function CommentaryCard({id, incrementLikes, deleteCommentary}: CommentaryCardProps) {

    const [isLikeButtonClicked, setIsLikeButtonClicked] = useState(false);

    return (
        <Container>
            <CommentaryInfo>
                <CommentaryProfile>
                     <CommentaryImage>
                        <Image 
                            src={Image01}
                            layout="responsive"
                            objectFit="cover"
                            alt="Foto do usuário"
                        />
                    </CommentaryImage>
                    <CommentaryDetail>
                        <span>Alessandra Melo</span>
                        <span>5 horas</span>
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
                    <TrashSimple 
                        color={pallete.grayOne} 
                        size={30} 
                        weight="fill" 
                        onClick={() => {
                            deleteCommentary(id)
                        }}
                        style={{marginLeft: "1.188rem"}}
                    />
                </IconsArea>
            </CommentaryInfo>
            <Content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet eros non fringilla porta. Integer molestie tempor mi, ac dignissim turpis venenatis nec.
            </Content>
        </Container>
    )
}
