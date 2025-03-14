import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic=useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };

    const updateUserProfile = (name, photoUrl) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:photoUrl,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("Current User", currentUser);
            const userInfo = { email: currentUser?.email };
            if (currentUser) {
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token);
                            setLoading(false);

                        }
                })
            }
            else {
                localStorage.removeItem("access-token");
                setLoading(false);

            }
        });
        return () => {
            return unsubscribe();
        }
    },[axiosPublic])


    const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      logOut,
      updateUserProfile,
      googleSignIn,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;