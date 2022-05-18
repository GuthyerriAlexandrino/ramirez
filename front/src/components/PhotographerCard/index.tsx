import { CardContainer, Especialization, PhotographerImage, PhotographerInfo } from "./style";

import Photographer from "../../assets/photographer-profile.png"
import { User } from "../../pages/search";
import Link from "next/link";

type PhotographerCardProps = {
    user: User;
}

export function PhotographerCard({user}: PhotographerCardProps) {
    return (
        <Link href={`/profile/photographer/${user._id.$oid}`}>
            <CardContainer>
                <PhotographerImage src={Photographer} width={72} height={72}  />
                <PhotographerInfo>
                    <span>{user.name}</span>
                    <small>{user.city} - {user.state}</small>
                </PhotographerInfo>
                <Especialization>
                    <span>Área:</span>
                    <span>{user.specialization}</span>
                </Especialization>
            </CardContainer>
        </Link>
    )
}  
