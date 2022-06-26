import { CardContainer,  CardContent, FilterImage, ListSpecialization } from "./style";

import { UserP } from "../../pages/search";
import Link from "next/link";

type PhotographerCardProps = {
    user: UserP;
}

export function PhotographerCard({user}: PhotographerCardProps) {
    return (
        <Link href={`/profile/photographer/${user._id.$oid}`}>
            <CardContainer >
                <FilterImage/>
                <CardContent>
                    <h3>{user.name}</h3>
                    <div>
                        <article>
                            <span>{user.city} - {user.state}</span>
                            <strong>R$ 20 - 40</strong>
                        </article>
                        <ListSpecialization>
                            <span>Especialidades:</span>
                            <ul>
                                {user?.specialization?.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </ListSpecialization>
                    </div>
                </CardContent>
            </CardContainer>
        </Link>
    )
}  
