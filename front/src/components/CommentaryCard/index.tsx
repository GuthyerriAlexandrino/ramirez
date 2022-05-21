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

export function CommentaryCard() {
    return (
        <Container>
            <CommentaryInfo>
                <CommentaryProfile>
                     <CommentaryImage>
                        <Image 
                            src={Image01}
                            layout="responsive"
                            objectFit="cover"
                        />
                    </CommentaryImage>
                    <CommentaryDetail>
                        <span>Alessandra Melo</span>
                        <span>5 horas</span>
                    </CommentaryDetail>
                </CommentaryProfile>
                <IconsArea>
                    <Heart color={pallete.grayOne} size={30} weight="fill"/>
                    <TrashSimple color={pallete.grayOne} size={30} weight="fill" style={{marginLeft: "1.188rem"}}/>
                </IconsArea>
            </CommentaryInfo>
            <Content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet eros non fringilla porta. Integer molestie tempor mi, ac dignissim turpis venenatis nec.
            </Content>
        </Container>
    )
}
