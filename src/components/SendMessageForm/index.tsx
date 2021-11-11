import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export const SendMessageForm: React.FC = () => {
    const { user, signOut } = useContext(AuthContext)
    const [message, setMessage] = useState('')

    const handleSendMessage = async (event: FormEvent) => {
        event.preventDefault();
        if (!message.trim()) {
            return
        }

        await api.post('messages', { message }).then(() =>
            setMessage('')
        ).catch(err => {
            alert("Erro ao enviar mensagem!" + err)
        })
        window.location.reload()
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size={32} />
            </button>
            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>

                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userLogin}>
                    <VscGithubInverted size={16} />
                    {user?.login}
                </span>
            </header>

            <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    className={styles.sendMessageTextArea}
                    name="message"
                    id="message"
                    placeholder="Qual a sua expectativa?"
                    onChange={(evt) => setMessage(evt.target.value)}
                    value={message}
                />

                <button type='submit'>Enviar mensagem</button>
            </form>
        </div>
    )
}

