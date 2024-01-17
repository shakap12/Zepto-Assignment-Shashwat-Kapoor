import React, { useState } from "react";
import users from "../Constants/Users";
import { IoClose } from "react-icons/io5";

const MainComponent = () => {
    const [style, setStyle] = useState("w-3/4 flex flex-col mt-1 shadow-lg shadow-gray overflow-y-scroll hidden")
    const [usersAdded, setUsersAdded] = useState([]);
    const [allUser, setAllUsers] = useState(users);
    const [searchtext, setSearchText] = useState('');
    const [bkspaceCount,setBkSpace]=useState(1);

    const toggleDropDown = () => {
        setStyle("w-3/4 flex flex-col mt-1 shadow-lg shadow-gray h-72 overflow-y-scroll")
    }
    const addUser = (user) => {
        let temp = [...usersAdded, user];
        setUsersAdded(temp)
        //updating the all users toggle-down list to remove the added user
        allUser.forEach((u, idx) => {
            if (u.name == user.name) allUser.splice(idx, 1);
        })
        let newAllUsers = [...allUser];
        setAllUsers(newAllUsers);
    }
    const deleteUser = (delUser) => {
        usersAdded.forEach((user, index) => {
            if (user.name === delUser.name) {
                usersAdded.splice(index, 1);
            }
        });
        let temp = [...usersAdded];
        setUsersAdded(temp);

        //updating the all users toggle-down list to add the removed user
        let newAllUsers = [...allUser, delUser];
        setAllUsers(newAllUsers)
    }
    const handleKeyPress = (e) => {

        if (e.key === "Backspace" && e.target.value==="") {
            setBkSpace(bkspaceCount+1)
            console.log(bkspaceCount);
            if(bkspaceCount==1){
               
            }
            if (bkspaceCount === 2) {
                usersAdded.splice(-1);
                setBkSpace(1)
            }
        }
        let temp = [...usersAdded];
        setUsersAdded(temp);
    }
    return (
        <div className="mt-5">
            <div className="text-blue-700 text-center font-semibold text-4xl font-serif">Pick Users</div>
            <div className="flex flex-col mx-auto w-[60%] mt-4" onFocus={toggleDropDown}>
                <div className="grid grid-cols-3 gap-1 border-b-2 border-violet-800 py-2 ">
                    {
                        usersAdded.map((user) => {
                            return (
                                <div key={user.id} className="flex flex-row bg-gray-200 rounded-full gap-1 pr-3">
                                    <div className="rounded-full w-8 h-8" style={{ backgroundImage: `url(${user.profile})`, backgroundSize: '100% 100%', backgroundRepeat: "no-repeat" }}></div>
                                    <p className="flex items-center justify-center text-[14px] font-semibold ml-1">{user.name}</p>
                                    <div className="ml-auto flex justify-center items-center" onClick={() => deleteUser(user)}><IoClose /></div>
                                </div>
                            )
                        })
                    }

                    <input className="w-full px-1 focus:outline-none" placeholder="Add new user..." onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                </div>
                <div className={style}>
                    {
                        allUser.filter((user) => {
                            return searchtext.toLowerCase() == '' ? user : user.name.toLowerCase().includes(searchtext)
                        }).map((user, idx) => {
                            return (
                                <div key={user.id} className="flex flex-row gap-x-5 hover:bg-gray-200 p-2" onClick={() => addUser(user)}>
                                    <div className="rounded-full w-12 h-12" style={{ backgroundImage: `url(${user.profile})`, backgroundSize: '100% 100%', backgroundRepeat: "no-repeat" }}></div>
                                    <p className="flex items-center justify-center text-[14x] font-semibold">{user.name}</p>
                                    <p className="flex items-center justify-center text-sm font-400 text-gray-700">{user.email}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MainComponent;