export const logout = () => {
  //const curruser = JSON.parse(localStorage.getItem("userID"));
  //const curlyuser = "{" + curruser + "}";
  //const fixeduser = JSON.parse(curlyuser);
  

  localStorage.removeItem("userID");
  navigate('/login');
}