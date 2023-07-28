import styles from './EditUser.module.css';
import className from 'classnames';

import { useState, } from 'react';

import Modal from 'rodal';
import 'rodal/lib/rodal.css';

import Massage from 'components/Massage';

function Index({ handleOnEdit, open, setOpen, setSelectedId, options, handleSubmit, watch, reset, register, errors, messageShow }) {

    const [name, setName] = useState("");
    // const [messageShow, setMessageShow] = useState(false)

    return (
        <>
            <Modal
                visible={open} onClose={() => {
                    setOpen(false)
                    setSelectedId(undefined)
                    reset()
                }}
                isOpen={open}
                animation="zoom"
                measure={'%'}
                width={30}
                height={50}
            >
                <form className={className(styles.wrapper)} onSubmit={e => e.preventDefault()}>
                    <p className={styles.name}> First Name <span>:</span></p>
                    <div>
                        <input
                            onChange={({ target }) => setName(target.value)}
                            // value={name}
                            type="text" className={className(styles.name_input, { [styles.errorInput]: errors.name })}
                            {...register("name", {
                                validate: {
                                    minLenght: v => {
                                        if (v.length >= 3) {
                                            return true
                                        }
                                        return "enter at least 3 characters"
                                    },
                                    maxLenght: v => {
                                        if (v.length <= 15) {
                                            return true
                                        }
                                        return "Maximum 15"
                                    }
                                }
                            })}
                        // placeholder={errors.name ?.message}
                        />
                        <p className={styles.text_error}>{errors.name ?.message}</p>
                    </div>

                    <p className={styles.name}> Last Name <span>:</span></p>
                    <div>
                        <input
                            // onChange={({ target }) => setSurname(target.value)} value={surname}
                            type="text" className={className(styles.name_input, { [styles.errorInput]: errors.surname })}
                            {...register("surname", {
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
                        <p className={styles.text_error}>{errors.surname ?.message}</p>
                    </div>

                    <p className={styles.name}> Username <span>:</span></p>
                    <div>
                        <input
                            type="text" className={className(styles.name_input, { [styles.errorInput]: errors.username })}
                            {...register("username", {
                                validate: {
                                    minLenght: v => {
                                        if (v.length >= 1) {
                                            return true
                                        }
                                        return "Еnter at least 1 characters"
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
                        <p className={styles.text_error}>{errors.username ?.message}</p>
                    </div>

                    <p className={styles.name}> Birth Date <span>:</span></p>
                    <input
                        // onChange={({ target }) => setAge(target.value)} value={age}
                        type="date" required className={styles.name_input}
                        {...register("age")}
                    />

                    <p className={styles.name}> Role <span>:</span></p>
                    <select
                        // onChange={({ target }) => setRole(target.value)} value={role}
                        name="role" className={styles.select}
                        {...register("role")}
                    >
                        <option
                            disabled={watch("role") !== "not-selected"}
                            value="not-selected">Rolni tanglang</option>
                        {
                            options.map(item => <option key={item.id} value={item.id}>{item.title}</option>)
                        }

                    </select>
                    <button className={styles.creste_btn} onClick={handleSubmit(handleOnEdit)}>EDIT</button>
                </form>
            </Modal>
            <Massage text={"User Edited Successfully"} messageShow={messageShow} />
        </>
    );
}

export default Index;