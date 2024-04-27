"use client";

import userSignUp from "@/libs/userSignUp";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import setOperationResult from "@/libs/setOperationResult";
import OperationResult from "@/components/OperationResult";

const RegistrationForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    telephone: "",
  });

  const [resultChildren, setResultChildren] = useState<Array<OperationResult>>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.telephone
    ) {
      setOperationResult(resultChildren, setResultChildren, {
        success: false,
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      const response = await userSignUp(formData);
      console.log("Registration successful:", response);

      //alert("Registration Successful!");

      setOperationResult(resultChildren, setResultChildren, {
        success: true,
        text: "",
      });
      
      router.refresh();

      setTimeout(()=>{
        router.push('/');
      }, 1500)
    } catch (error) {
      console.error("Registration failed:", error);
      setOperationResult(resultChildren, setResultChildren, {
        success: false,
        text: "" + error,
      });
    }
  };

  return (
    <div className="min-h-[100vh] p-5 bg-pink-50">
      <div className="w-[666px] h-[702px] bg-gradient-to-b from-pink-200 rounded-[50px] shadow m-auto my-16">
        <div className="w-auto h-[61px] text-pink-500 text-5xl font-bold font-sans uppercase m-auto py-12">
          Register form
        </div>
        <form
          className="text-zinc-900 text-3xl font-normal font-sans"
          onSubmit={handleSubmit}
        >
          <div className="relative my-6">
            <input
              type="text"
              className="pl-24 pr-4 py-2 border w-[462px] h-[67px] bg-white rounded-[50px]"
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 left-[120px] pl-3  
                flex items-center  
                pointer-events-none"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAtCAYAAAA+7zKnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN/SURBVHgB7ZlLbhpBEIaLhyVLtmWys2RLgRPEvgHssktyAicnsDmB4QT4BibLrOKcAG7gyQkyEiCxY8xDisQrf8EQNZ15VfcgFIlPGnmmmZn+u7umuqpM9B+Tox1RBAXA578B7YAMpQQLPTk5+ZzJZD7g8pqblJ89HM5yufw6n8/b/X7fpRSwFs+iT09P73B6T9uCQ8EgHieTSd0DZIGV+IuLi+LR0VELYookBCvkTqfTis0qGItn4fl8/oUCZhuDcSHOweHhvIDjGufFgNfw75Ver+eQAUbiI2a8jaPe7Xbb+jOXl5f8HdxjELdbAixWwMjbnJ+fN/CnTNsivkB0dTgcukHPjEajPo7ns7OzV9z7XvmpkM1mi3juGwkRz7xvLr/UNqxAFUv/mPQdWAX2Sk9acyVoxaLIkpBcLvegXkN4UyKcwf1Ndpta80cSIhaPJS6r1/DbdTJDH/AtCRGJZ5NRP1KcO6aujj0MeyWlqVAqld6SAJF42HpRvWZXSBawO1Wv4XVKJEBsNlrnLu0RkfjZbOaq14vF4prs2NrgYEailRS7yqurq4Ha6Xg8fmMSowS5XLhKkR4Ts9myUwRl92QAhOvepU1CTMTrrvGOZ5EE+PfX1LYAvx+LUWwD02mREh5I4pOguIhdJlynyNMwRt6GwwHtehVhYtsPNSGO+zHoB75PD+iw0VXIAOOQmIVixhv/vBCrAC/UxulPWmdQHHi9g2De/oPC56o0vPjbF1kQNoCEeHi22ul0mmSIdRrINoxgrRWSbITR9mfcKAnZkFoC7oe5nHyHRYerJJxCkhUTUhOvgg+zjIEUYPsbG3eQcLu2CfeBAylgZPOb6hj7bz+yTFRs0mBX6cLr/DCtoplElZzDJq6OJRKxHkQTXkiUUiYW74ew32ldh9wJ0hpOIvFsJqi3vISU9TxpErHqOGRT4wGgvnOTxK3mKQGw74akOpYU3g/wh82wvGnjfpAjPEH7p7jnY2fe76ClNbPoGqUE+qjRehAqsUWo2JAYM3GrXTfTFM7473tW2/SaZhCx4vGSrVjFosgUCZJ7PUeIraBFivfTtYLyQiet/2ro8HulRShRJmVbZErwfldyv1XRad9Eij8+PuaZ3lcY6w0Gg9eoGyLFu67r4UO60Wxx53B/3G/cRhW7SfkfaIn9vclOKoFTQ05ikLg4h8TlwI74A06Dv/BrlsXWAAAAAElFTkSuQmCC"
                alt="username"
              />
            </div>
          </div>

          <div className="relative my-6">
            <input
              type="email"
              className="pl-24 pr-4 py-2 border w-[462px] h-[67px] bg-white rounded-[50px]"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 left-[120px] pl-3  
                flex items-center  
                pointer-events-none"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAkCAYAAAAZ4GNvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFjSURBVHgB7ZnLccIwFEVvPvt4maVKSAkuISWkg9BB3EmSClKCS3A6cFIBa1bwHrYGELJ+Rh/P+MxcxmMYfAVHGmGAEx+UnrIvOB3lHQpdwYWnBlE90MOG8oZl8UzZ8cHSPnWZ/m48UPmi/KMcnjDYUalPaEeFclTiCbqFvqf5q6G8IA81pYW5n5NfnxSBNFTj9Vx6uU8QDCtTTEyKOJVvKQ3SqlRjetXbjn061/KMwLDqxFTJpkh7do0WHuUlr5jeNsxRyaQIv2+tvD6ovKSxXMxVpRp2RXTMKs8IhKtkU+QHZg1nl5f4quSrSNTyksZSigcZokiS8oyAWaUQRZKVl5hU8lUEqctLGlyr5KuIjiTlGYGTSiGK6EhWXnLLbcRV+XvE5RcRiV0+Kmv5XKzlc7GWz8VaPhePmnMC8zdRMRDqCb5X2SPdDaVb8sfafGOZHHvzD+Ml/rlwwQblD6LH2Xw8ACjtI2CLR7QoAAAAAElFTkSuQmCC"
                alt="email"
              />
            </div>
          </div>

          <div className="relative my-6">
            <input
              type="password"
              className="pl-24 pr-4 py-2 border w-[462px] h-[67px] bg-white rounded-[50px]"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 left-[120px] pl-3  
                flex items-center  
                pointer-events-none"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALCSURBVHgB7Zm9jtpAEMfHxkiRAIkSiQ+RLiUpUwW6dOG6dHc8wZEnIPcER54g3BOE65IK0qULeYJzARKiOgmQIvGV/yRwQr71ejEDMhI/yfJ612v/dzw7OwsWCZDL5cqWZb1frVYlHEWUi5s2XLu45qOH8n2/3+/SnlgUkjRIJpPXKNb50rQfDwDiW/P5/G44HLoUghiFoFAoXMfj8TaK73C8oN3gAZZjsVg1lUpZ4/H4J+3ITpZeW/crv5TkaE8mk9ojMO1gLDqTyRRh3Q77rM8t/NIu2n9wee3H6eVyyT7+lv4PVOlGfO9sNquYuouxaEy2XziVSC32M6zV1FmLv1Iikaii2NieqBsw2N5gMHhNBhj5NAQ3cPqgaOpC7JvRaPTtD9A9g9vhvz0Iv7dtu4iqV9vtGEgGPp7GPd8pgEBLs1s4jvPgrYdl7mCZKwpJNpttQeiltx5R5WWQm9gUAGZ5w1vHsXc6ndZpDzA/6vwcbz0MFPjcQNGwRlVRfbPLbFfhui5P1pqi6ZL9X9dXK5pXOvLMeLYO3KJFAqxXR+/gOayWdP20ojFhnnWGdX6TILy0K+rCi0aMVX2mHgnCMVpRF949ospJirYQL0v4HLckm08cBF41capZ+Xz+QZNPRA6eA/YpCWZY70n6tONTX6Ho0PFWKEVL7OOkwKr8rO4cp4+FQ8Js7VA4DXjk2Bp21+2HqGjE/FuIfMqHkYv/O2MBayIz/EhCiLmHV/A2WBDqEP6FhBARzXm3n+ANEH61zs/3RsrSZeH7tIiIxmbBaOuFr7HXFu3pfSQARLdM7lssFm0SQEQ0b1JhxaDocCMV+sSiB0JaE8JrPs0VpAafSAjRFdFvly6dy5xzj2NxTpgYzWQUQ1y01E9mOs4+fSyU7iGVjR0KP5/uUIQ5TZ9W/YUQZVgvW/qChH9zPiBdHBd/AafLHc3+VPmFAAAAAElFTkSuQmCC"
                alt="password"
              />
            </div>
          </div>

          <div className="relative my-6">
            <input
              type="string"
              className="pl-24 pr-4 py-2 border w-[462px] h-[67px] bg-white rounded-[50px]"
              placeholder="Telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 left-[120px] pl-3  
                flex items-center  
                pointer-events-none"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAkCAYAAAAZ4GNvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAICSURBVHgB1ZjdVcJAEIVv4MVHrMC1A6zAdCAdaAdqBWgHWoF0gFSAHYAVECsA33wBvDdZOZgD+dlANnznzIkCCXeG2dmZBYBuEATjVqs1p60L2hvvM/ANhcxKiE474Fc7HCO4Xq8NPCPxC7jRgWecxXOdnK54JOnm1QGJ/4Q7ITwi8VM4wooTwiMBzahcwo3FarW6hHvqVUKRj6y5oJzvwhMtex3BAdZ6RTyCJ2Lx/OnfURIK/6BdwaP4Dba/yW0L+Dn1QA9oGGEB4WM0oSHbRVb0rfBGkxl9eN6UcmGEhxkOaD/w3tNk0ckaTE4+fZowiIj2ntcjRlitQ7jnfY2OhnXeaXOrBUZ4kFM6h2jwGuhQ4CQnhbSIDRpKUQd6aChFHJD14UaP9z4hWWOF0zBACfgFL7zc53xMi/15uVwOkI/Kskrvv7aahWBqnxPx+sXGMd296v3yM4QiVOJcx2Q8SkPQpOCzdplzcxgyKrMKTsTTWwXhsnnbUXxEG9GBc+RPUtoTFKWQ9k37saliUI2zUjm/hzuK62vTQs24Rn4bLZ5X7cg6AqzzMOoQ4mM0FsKmEv/u1OHEIdJmFwbJoj5qOh1L/DY9OnBLO/gOXIf4PwySX+PGXiunVZ3i02hmCLk+rpGU01LO8L7Ip/g02i/iEzg6pVnhwv5vkPRWG+fsmdHjL+EnFweR5IWkAAAAAElFTkSuQmCC"
                alt="telephone"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 m-2 text-center text-white text-[40px] font-bold font-sans py-6">
            <button
              id="signin"
              type="submit"
              className="w-[372px] h-[68px] bg-gradient-to-r from-pink-200 to-pink-500 rounded-[20px] hover:bg-pink-300 active:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="h-screen w-1/2 flex flex-col items-end fixed right-0 top-0 mt-[100px] pointer-events-none">
        {
          resultChildren.map((obj) => (
            <OperationResult obj={obj} heading={obj.props.valid ? "Your registration was successful." : "Registration Failed:"}/>
          ))
        }
      </div>
    </div>
  );
};

export default RegistrationForm;
