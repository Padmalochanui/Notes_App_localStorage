import React, { useState, useEffect } from "react";
import './notesApp.css'

//to get data from localStorage
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list, "!!data");
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const NotesApp = () => {
    const [inputData, setNotes] = useState("");
    const [notes, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null);
    const [search, setSearch] = useState('')
    const addItem = () => {
        if (!inputData) {
            alert('Please fill the data..')
        } else if (inputData && !toggleSubmit) {
            setItems(
                notes.map((note) => {
                    if (note.id === isEditItem) {
                        return { ...note, name: inputData }
                    }
                    return note;
                })
            )
            setToggleSubmit(true);
            setNotes('')
            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...notes, allInputData]);
            setNotes('');
        }
    }
    const deleteItem = (index) => {
        const updatedItem = notes.filter((note) => {
            return index !== note.id;
        })
        setItems(updatedItem);
    }
    const removeAll = () => {
        setItems([])
    }
    const editItem = (id) => {
        let newEditItem = notes.find((element) => {
            return element.id === id;
        });
        console.log(newEditItem, "chaga")
        setToggleSubmit(false);
        setNotes(newEditItem.name)
        setIsEditItem(id);
    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(notes))
    }, [notes])

    return (
        <div className="container mt-4">
            <div>
                <h2 className="mb-4">Create your notes</h2>
                <hr />
                <div className=" container w-25">
                    <input type="text" onChange={(e) => { setSearch(e.target.value) }} placeholder="Search notes..." className="form-control mb-4 search-field" />
                </div>
                <div className="row">
                    <div className="col-7">
                        <div className="" style={{ height: "" }}>
                            <input
                                type="text"
                                value={inputData}
                                onChange={(e) => { setNotes(e.target.value) }}
                                placeholder="Enter your text here"
                                className="form-control w-50 input-field"
                            />
                        </div>
                    </div>
                    <div className="col-1">
                        {toggleSubmit ?
                            <button className="float-btn" onClick={addItem} title="Create notes">+</button>
                            : <button className="float-btn" onClick={addItem} title="Update note"><i className="far fa-edit btn-info  m-1 rounded"></i></button>}
                    </div>
                </div>

                <div className="content">
                    {notes.filter((note) => {
                        if (search == '') {
                            return note
                        } else if (note.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                            return note
                        }
                    }).map((note) => {
                        return (
                            <div key={note.id} >
                                <h2 className="bg-info text-white form-control mt-1 w-50">
                                    {note.name}
                                </h2>
                                <i
                                    className="fa-solid fa-trash-alt btn-info p-2 rounded"
                                    title="Delete note"
                                    onClick={() => deleteItem(note.id)}
                                ></i>
                                <i className="far fa-edit btn-info p-2 m-1 rounded"
                                    title="Edit note"
                                    onClick={() => editItem(note.id)}></i>
                                <i className="fa-solid fa-copy btn-info p-2 m-1 rounded" title="Copy note" onClick={() => { navigator.clipboard.writeText(note.name) }} ></i>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-2">
                    <button className="btn btn-info" onClick={removeAll}>Clear</button>
                </div>
            </div>
        </div>
    );
};

export default NotesApp;
