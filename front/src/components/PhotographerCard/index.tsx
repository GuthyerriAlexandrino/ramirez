import { CardContainer,  CardContent, FilterImage, ListSpecialization } from "./style";

import { UserP } from "../../pages/search";
import Link from "next/link";

type PhotographerCardProps = {
    user: UserP;
}

export function PhotographerCard({user}: PhotographerCardProps) {
    return (
        // eslint-disable-next-line @next/next/link-passhref
        <Link href={`/profile/photographer/${user._id.$oid}`}>
            <CardContainer >
                <FilterImage/>
                <CardContent>
                    <h3>{user.name}</h3>
                    <div>
                        <article>
                            <span>{user.city} - {user.state}</span>
                            {user.services_price.length > 0 ? (
                                <strong>R$ {user.services_price[0]} - {user.services_price[1]}</strong>
                            ) : (
                                <strong>Nenhum preço informado</strong>
                            )}
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
