import { useLoginStore } from "./login"
import { useUserStore } from "./user"
import { useUserinfoStore} from './userinfo'
import { useMusicStore } from "./music"
import { useSearchStore } from "./search"

export default function useStore(){
    return{
        login:useLoginStore(),
        user:useUserStore(),
        userinfo:useUserinfoStore(),
        music:useMusicStore(),
        search:useSearchStore()
    }
}