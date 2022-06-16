import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Header } from "../../components/Header";
import { User } from "../search";
import { 
    Container
} from "./style";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const { ["ramirez-user"]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const data: User[] = await fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    const user = {
        id: data[0]._id ?? null,
        name: data[0].name ?? null,
        city: data[0].city ?? null,
        state: data[0].state ?? null,
        specialization: data[0].specialization ?? null
    }

    return {
        props: {
            user,
        },
    }
}

interface PhotographerProps {
    user: User;
}

export default function EditProfile({user}: PhotographerProps) {

    return (
        <Container
            initial={{width: 0}} 
            animate={{width: "100vw"}} 
            exit={{ x: "100%" }}
        >
            <Header/>
           
        </Container>
    )
}
