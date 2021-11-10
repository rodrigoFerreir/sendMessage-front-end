import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'

export const LoginBox = () => {

    const { signInURL } = useContext(AuthContext)

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInURL} className={styles.singnInWhithGitHub}>
                <VscGithubInverted size={24} />
                Entrar com o GitHub
            </a>

        </div>
    )
}
