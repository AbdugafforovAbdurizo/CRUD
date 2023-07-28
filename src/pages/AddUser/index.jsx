import styles from './AddUser.module.css';
import classN from 'classnames';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import classnames from 'classnames';

import Massage from 'components/Massage';

function Index() {
    // const navigate = useNavigate()
    // const [name, setName] = useState("");
    // const [surname, setSurname] = useState("");
    // const [username, setUsername] = useState("");
    // const [age, setAge] = useState("");
    // const [role, setRole] = useState("not-selected");
    const [options, setOptions] = useState([]);
    const [messageShow, setMassegaShow] = useState(false)


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched"
    })


    useEffect(() => {
        fetch(`https://crud11.pythonanywhere.com/roles/`)
            .then(res => res.json())
            .then(res => setOptions(res))
    }, [])


    const handleOnSubmit = (data) => {
        // console.log(data)
        const jsonData = JSON.stringify({
            first_name: data.firstName,
            last_name: data.lastName,
            birth_date: data.birthday,
            username: data.username,
            role: data.role
        })

        fetch(`https://crud11.pythonanywhere.com/employee/`, {
            method: "POST",
            body: jsonData,
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json');
            const data = isJson ? await response.json() : null;

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            reset()
            setMassegaShow(true)
            setTimeout(() => {
                setMassegaShow(false)
            }, 2000);
        }).catch(() => {
            alert("Serverda xatolik")
        })
        // alert("User has been added")
    }


    console.log(errors)

    return (
        <>
            <form className={classN(styles.wrapper)} onSubmit={e => e.preventDefault()}>
                <p className={styles.name}> First Name <span>:</span></p>
                <div className={styles.input_block}>
                    <input
                        type="text" className={classnames(styles.name_input, { [styles.errorInput]: errors.firstName })}
                        {...register("firstName", {
                            validate: {
                                minLenght: v => {
                                    if (v.length >= 3) {
                                        return true
                                    }
                                    return "Еnter at least 3 characters"
                                },
                                maxLenght: v => {
                                    if (v.length <= 15) {
                                        return true
                                    }
                                    return "Maximum 15"
                                }
                            }
                        })}
                    />
                    <p className={styles.text_error}>{errors.firstName ?.message}</p>
                </div>

                <p className={styles.name}> Last Name <span>:</span></p>
                <div className={styles.input_block}>
                    <input
                        type="text" className={classnames(styles.name_input, { [styles.errorInput]: !!errors.lastName })}
                        {...register("lastName", {
                            validate: {
                                minLenght: v => {
                                    if (v.length >= 3) {
                                        return true
                                    }
                                    return "Еnter at least 3 characters"
                                },
                                maxLenght: v => {
                                    if (v.length <= 30) {
                                        return true
                                    }
                                    return "Maximum 15"
                                }
                            }
                        })}
                    />
                    <p className={styles.text_error}>{errors.lastName ?.message}</p>
                </div>

                <p className={styles.name}> Username <span>:</span></p>
                <div className={styles.input_block}>
                    <input
                        type="text" className={classnames(styles.name_input, { [styles.errorInput]: !!errors.username })}
                        {...register("username", {
                            required: true,
                        })}
                    />
                </div>

                <p className={styles.name}> Birth Date <span>:</span></p>
                <div className={styles.input_block}>
                    <input
                        type="date" className={classnames(styles.name_input, { [styles.errorInput]: !!errors.birthday })}
                        {...register("birthday", {
                            required: true,
                        })}
                    />
                </div>

                <p className={styles.name}> Role <span>:</span></p>
                <select

                    {...register("role", {
                        validate: {
                            required: v => {
                                if (v !== "not-selected" && v) {
                                    return true
                                }
                                return "Tanlang"
                            }
                        }
                    })}
                    name="role"
                    // className={styles.select}
                    className={classnames(styles.select, { [styles.errorInput]: !!errors.role })}

                >
                    <option value="not-selected">Rolni tanglang</option>
                    {
                        options.map(item => <option
                            key={item.id} value={item.id}> {item.title} </option>)
                    }
                </select>
                <button className={styles.creste_btn} onClick={handleSubmit(handleOnSubmit)} >CREATE</button>
                <Link to={'/'}> HOME</Link>
            </form>
            <Massage text={'User has been added'} messageShow={messageShow} />
        </>
    );
}

export default Index;