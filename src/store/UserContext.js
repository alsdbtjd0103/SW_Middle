import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  users: [],
  deleteUser: (id) => {},
  addUser: (id, name, region) => {},
  getNextId:() => {},
  reset:() => {},
  isButtonClick:false,
  setIsButtonClick: () => {}
});

function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isButtonClick,setIsButtonClick] = useState(false) ;

  function reset(){
    setUsers([]);
  }

  function getNextId(){
    if (users.length==0){
        return 1;
    }
    const nextId = users[users.length-1].id+1;
    return nextId;
  }

  function deleteUser(id) {
    setUsers((users) => {
      const newUsers = users.filter((user) => user.id !== id);
      return newUsers;
    });
  }

  function addUser(id, name, region,info) {
    const newUser = {
      id: id,
      name: name,
      region: region,
      info:info,
    };
    setUsers((users) => [...users, newUser]);
  }

  const value={
    users:users,
    deleteUser:deleteUser,
    addUser:addUser,
    getNextId:getNextId,
    reset:reset,
    isButtonClick:isButtonClick,
    setIsButtonClick:setIsButtonClick,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserContextProvider;
