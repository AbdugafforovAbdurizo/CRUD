import styles from './User.module.css';


function Index({ handleEdit, first_name, last_name, username, birth_date, role, id, setDeleteModal }) {

    // const handleOnSubmit = () => {
    //     fetch(`https://crud11.pythonanywhere.com/employee/${id}/`, {
    //         method: "DELETE",
    //     }).then(() => handleSwitch())
    // }


    return (
        <>
            <tr className={styles.user_data} >
                <td headers='name'>{first_name}</td>
                <td headers='surname'>{last_name}</td>
                <td headers='username'>{username}</td>
                <td headers='birth'>{birth_date.slice(0, 10)}</td>
                <td headers='role'>{role}</td>
                <td headers='actions'>
                    {/* <Link to={`/edit-user/${id}`} className={styles.edit}>📝 Edit </Link> */}
                    <button className={styles.edit} onClick={() => handleEdit(id)}>📝 Edit </button>
                </td>
                <td headers='actions'>
                    <button className={styles.delete}
                        onClick={() => setDeleteModal(id)}
                    >
                        🗑️ Delete
                     </button>
                </td>
            </tr>

        </>
    );
}

export default Index;