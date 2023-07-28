import styles from './Massage.module.css';
import className from 'classnames';

function Index({ text, messageShow, }) {
    return (
        <div className={className(styles.wrapper_message, { [styles.display_none]: !messageShow })}>
            <p className={styles.messages}>{text}</p>
        </div>
    );
}

export default Index;