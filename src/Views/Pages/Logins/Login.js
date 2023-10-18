import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Cookies from 'js-cookie';
import { Call_Post_Api } from '../../../CallApis/CallApis';
// import CryptoJS from 'crypto-js';
// import { useNavigate } from 'react-router-dom';
// import firebase, { auth } from '../config/index'

// const authProvider = new firebase.auth.FacebookAuthProvider();

import { Spin, message } from 'antd';
import Backgroug from '../../../components/Backgroug/Backgroug';

const cx = classNames.bind(styles);

function Login() {

    const navigate = useNavigate();

    const [isLoad, setIsLoad] = useState(false)

    // const URL = process.env.REACT_APP_URL;
    // // const URL = process.env.REACT_APP_URL

    // console.log(URL + '/login')

    const [email, setEmail] = useState("")
    const [matkhau, setMatKhau] = useState("")
    const [apis, setApi] = useState([])


    function handerSubmit() {

        if (email != "" && matkhau != "" && email != undefined && matkhau != undefined) {
            setIsLoad(true)

            Call_Post_Api(
                {
                    email: email,
                    password: matkhau
                },
                null, null,
                '/shop/login'
            ).then((data) => {
                // if (data.metadata.shop.verify == true) {
                //     alert("Tài khoản đã đăng nhập ở 1 nơi khác!!!")
                // }
                console.log(data.metadata)
                if (data.metadata.msg !== 'Sai mật khẩu hoặc tài khoản!!' && data.metadata.status !== "error") {

                    const token = data.metadata?.tokens?.accessToken
                    const name = data.metadata?.shop?.email

                    const secretKey = 'my-secret-key';

                    Cookies.set('accessToken', JSON.stringify(token), { expires: 7 });
                    Cookies.set('name', JSON.stringify(name), { expires: 7 });


                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": process.env.REACT_APP_KEY,
                        },
                    };

                    // fetch(URL + '/shop/update_verify/' + data.metadata.shop._id, requestOptions)

                    Cookies.set('id', JSON.stringify(data.metadata?.shop?._id), { expires: 7 });
                    Cookies.set('timeeexp', JSON.stringify(data.metadata?.tokens?.timeExp), { expires: 7 });
                    setIsLoad(false)

                    navigate('/')

                }
                else {
                    // alert("Sai mật khẩu hoặc tài khoản!!")
                    message.error("Sai mật khẩu hoặc tài khoản!!!")

                    setIsLoad(false)

                }

            });
        }
        else {
            // alert("Vui lòng nhập đủ thông tin!!!")
            message.warning(" Vui lòng nhập đủ thông tin !!")
        }

    }

    // const handleFacebookLogin = () => {
    //     // Xử lý đăng nhập bằng Facebook
    //     auth.signInWithPopup(authProvider)
    //         .then((result) => {
    //             // Handle successful login
    //             console.log("Successfully logged in:", result.user);
    //         })
    //         .catch((error) => {
    //             // Handle login error
    //             console.log("Error occurred during login:", error);
    //         });

    // };

    // auth.onAuthStateChanged((user) => {
    //     // console.log(user._delegate)
    //     if (user) {
    //         Cookies.set('accessToken', JSON.stringify(user._delegate.accessToken), { expires: 7 });
    //         Cookies.set('name', JSON.stringify(user._delegate.displayName), { expires: 7 });
    //         Cookies.set('img', JSON.stringify(user._delegate.photoURL), { expires: 7 });

    //         // navigate('/');

    //     }
    // })

    // const handleGoogleLogin = () => {
    //     // Xử lý đăng nhập bằng Google
    // };


    return (
        <div className={cx('container')}>
            {isLoad &&
                <div style={{
                    position: 'fixed',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    height: '100vh',
                    zIndex: 100,
                    top: 0,
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <Spin />
                </div>
            }
            <div>
                <div className={cx('box')}>
                    <div style={{
                        width: '100%',
                        height: '100%'
                    }}>
                        <Backgroug />
                    </div>
                    <div className={cx('form')}>
                        <div className={cx('all')}>
                            <div className={cx('left')}>
                                <div className={cx('login')}>
                                    Đăng Nhập
                                </div>
                                <div className={cx('titer')}>
                                    By logging in you agree to the ridiculously long terms that you didn't bother to read
                                </div>
                                <div className={cx('taikhoan')}>
                                    Bạn Chưa Có Tài Khoản?
                                    <Link to={'/SingUp'}>
                                        <span>
                                            Đăng Ký
                                        </span>
                                    </Link>
                                </div>
                                <button className={cx("loginBtn")}
                                // onClick={handleFacebookLogin}
                                >
                                    Login with Facebook
                                </button>

                                <button className={cx("loginBtn1")}
                                // onClick={handleGoogleLogin}
                                >
                                    Login with Google
                                </button>
                            </div>
                            <div className={cx('rigth')}>
                                <div>
                                    <div className={cx('email')}>
                                        Email
                                    </div>
                                    <div>
                                        <input className={cx('input')}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className={cx('matkhau')}>
                                        Mật Khẩu
                                    </div>
                                    <div>
                                        <input type="password" className={cx('input')}
                                            onChange={(e) => setMatKhau(e.target.value)}

                                        />
                                    </div>
                                </div>

                                <div >
                                    <button className={cx('submit')}
                                        onClick={() => handerSubmit()}
                                    >
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login
