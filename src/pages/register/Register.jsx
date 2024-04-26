import { useContext, useState } from "react";
import "./register.css"
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const { createUser, upadatedProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        password: "",
        confirmpassword:''           

    })
    console.log(user);
    const fname = user.firstname?.length;
    const lname = user.lastname?.length;
    const emai = user.email?.length;
    const contactNumber = user.contact?.length;
    const pass = user.password?.length;
    const confirmpass = user.password?.length;
    const username =user.firstname+ " " + user.lastname;
    console.log(username);

    const handleResister = async () => {
        const emailVerification = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user?.email))
        if (fname > 0 && lname > 0 && contactNumber > 0 && emai > 0 && pass > 0 && confirmpass > 0) {
            if (emailVerification === true) {
                if(user.password === user.confirmpassword){
                 return await createUser(user?.email, user?.password)
                    .then((result) => {
                        if (result?.user) {
                            upadatedProfile(username)
                                .then(() => { })
                            console.log(result?.user?.displayName);
                            console.log(result?.user?.email);
                            console.log(result?.user?.emailVerified);
                            toast.success('login successfully....!');
                            navigate("/")
                        }
                    })
                    .catch(err => toast.error(err.message))
                } else{
                    return toast.error("password doesn't match! please try again....!")
                }
                
            } else {

                return toast.error("please enter your valid email.....!")
            }

        }
        return toast.error("Please fill in the all input field...!")
    }

    return (
        <div className="register-header">
            <h1>Register Now!</h1>
            <div className="register-content">
                <div className="content">
                    <label htmlFor="firstname">First Name*</label> <br />
                    <input type="text" value={user.firstname} onChange={(e) => setUser({ ...user, firstname: e.target.value })} placeholder="Enter your firstname..." />
                </div>
                <div className="content">
                    <label htmlFor="lastname">Last Name*</label> <br />
                    <input type="text" value={user.lastname} onChange={(e) => setUser({ ...user, lastname: e.target.value })} placeholder="Enter your lastname..." />
                </div>
                <div className="content">
                    <label htmlFor="email">Email*</label> <br />
                    <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Enter your email..." />
                </div>
                <div className="content">
                    <label htmlFor="contact">Contact*</label> <br />
                    <input type="number" value={user.contact} onChange={(e) => setUser({ ...user, contact: e.target.value })} placeholder="Enter your contact..." />
                </div>
                <div className="content">
                    <label htmlFor="password">Password*</label> <br />
                    <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Enter your password..." />
                </div>
                <div className="content">
                    <label htmlFor="confirmpassword">Confirm Password*</label> <br />
                    <input type="password" value={user.confirmpassword} onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })} placeholder="Enter your password..." />
                </div>
                <div className="btn-content">
                    <button onClick={handleResister} className="btn">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Register;