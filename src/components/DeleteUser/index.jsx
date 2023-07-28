import styles from './DeleteUser.module.css';

import Modal from 'rodal';
import 'rodal/lib/rodal.css';

import Massage from 'components/Massage';

import { useState } from 'react';

function Index({ setDeleteModal, deleteModal, handleSwitch,}) {

    const [messageShow,setMessageShow] = useState(false)

    const handleOnSubmit = (id) => {
        fetch(`https://crud11.pythonanywhere.com/employee/${id}/`, {
            method: "DELETE",
        }).then(() => {
            handleSwitch()

            setMessageShow(true)
            
            setTimeout(() => {
                setMessageShow(false)
            },1500);
            // alert("User deleted")
            setDeleteModal(false)
        })
    }
 
    const handleCloseModal = () => {
        setDeleteModal(false)
    }

    return (
        <>
        <Modal
            visible={!!deleteModal}
            onClose={() => {
                setDeleteModal(false)
            }}
            animation="zoom"
        >
            <div className={styles.wrapper}>
                <p className={styles.text}>Do you really want to delete</p>
                <div>
                    <button className={styles.cancel} onClick={() => handleCloseModal()}>
                        Cancel
                    </button>
                    <button className={styles.delete} onClick={() => handleOnSubmit(deleteModal)}>
                        Delete
                    </button>
                </div>
                
            </div>
        </Modal>
            <Massage messageShow={messageShow} text={'User deleted'} />
        </>
    );
}

export default Index;