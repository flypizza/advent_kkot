import { useState } from "react";
import db from '../utils/firestore'
import { collection, addDoc } from "@firebase/firestore";

const AddItem = () => {
    const [value, setValue] = useState('')

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const docRef = await addDoc(collection(db, "items"), {
                name: value,
            })
            console.log("Document written with ID: ", docRef.id)
            setValue('')
        }catch (error){
            console.log('Error adding document : ', error)
        }
    }

    return (
        <form onSubmit = { handleSubmit}>
            <input
                type = 'text'
                value = {value}
                onChange = {(e) => setValue(e.target.value)}
                placeholder = "Add a new item"
                className="border p-2 rounded-lg mr-4"
            />
            <button type = "submit">Add item</button>
        </form>
    )
}

export default AddItem