import styles from './Home.module.css';
// import className from 'classnames';

import { Link, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import User from 'components/User';
import EditUser from 'components/EditUser';
import DeleteUser from 'components/DeleteUser';

function Index() {

    // const [name, setName] = useState("");
    // const [surname, setSurname] = useState("");
    // const [username, setUsername] = useState("");
    // const [age, setAge] = useState("");
    // const [role, setRole] = useState("not-selected");

    const [data, setData] = useState({
        results: []
    });
    const [switcher, setSwitcher] = useState(false);
    const [options, setOptions] = useState([]);

    const [selectedId, setSelectedId] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
 
    const [messageShow, setMessageShow] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            name: "",
            surname: "",
            age: "",
            username: "",
            role: "not-selected"
        }
    })

    useEffect(() => {

        fetch(`https://crud11.pythonanywhere.com/employee/?page_size=2&p=2`)
            .then(res => res.json())
            .then(res => setData(res))

    }, [switcher])

    useEffect(() => {
        fetch(`https://crud11.pythonanywhere.com/roles/`)
            .then(res => res.json())
            .then(res => {
                setOptions(res)
            })
    }, [])


    const handleOnEdit = (data) => {
        const jsonData = JSON.stringify({
            first_name: data.name,
            last_name: data.surname,
            birth_date: data.age,
            username: data.username,
            role: data.role
        })

        fetch(`http://crud11.pythonanywhere.com/employee/${selectedId}/`, {
            method: "PATCH",
            body: jsonData,
            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            reset({
                name: "",
                surname: "",
                username: "",
                age: "",
                role: "not-selected",
            })
            setMessageShow(true)
            setTimeout(() => {
                setMessageShow(false)
            }, 1500);
            // alert("User Edited Successfully")
            setOpen(false)
            setSwitcher(p => !p)
        })
    }

    const handleEdit = (id) => {
        const user = data.results.find(user => user.id === id)
        reset({
            name: user.first_name,
            surname: user.last_name,
            username: user.username,
            age: user.birth_date.slice(0, 10),
            role: options.find(option => option.title === user.role).id,
        })
        setOpen(true)
        setSelectedId(id)
    }

    return (
        <div >
            <Link to={'/add-user'} className={styles.btn_add_user}> + Add User </Link>
            <table className={styles.wrapper_table}>
                <thead>
                    <tr className={styles.header} >
                        <th id='name'>First Name</th>
                        <th id='surname'>Last Name</th>
                        <th id='username'>Username</th>
                        <th id='birth'>Birth Date</th>
                        <th id='role'>Role</th>
                        <th id='actions' colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.results.map((item) => {
                            return (
                                <User handleEdit={handleEdit}
                                    setDeleteModal={setDeleteModal}
                                    handleSwitch={() => setSwitcher(p => !p)} key={item.id} {...item} />
                            )
                        })
                    }
                </tbody>
            </table>

            <EditUser
                handleOnEdit={handleOnEdit}
                open={open}
                setOpen={setOpen}
                setSelectedId={setSelectedId}
                options={options}
                register={register}
                handleSubmit={handleSubmit}
                watch={watch}
                reset={reset}
                errors={errors}
                messageShow={messageShow}
            />

            <DeleteUser 
            deleteModal={deleteModal} 
            setDeleteModal={setDeleteModal} 
            handleSwitch={() => setSwitcher(p => !p)}/>
        </div>
    );
}

export default Index;