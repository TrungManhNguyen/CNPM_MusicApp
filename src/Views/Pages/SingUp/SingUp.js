import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SingUp.module.scss';
import { Call_Post_Api } from '../../../CallApis/CallApis';
import { Spin, message } from 'antd';
import Backgroug from '../../../components/Backgroug/Backgroug';

const cx = classNames.bind(styles);

function SingUp() {
    const [isLoad, setIsLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [re_Pass, setRe_Pass] = useState('');
    const [number, setNumber] = useState('');

    function handerSubmit() {
        if (email !== "" && pass !== "" && re_Pass !== "") {
            // Check if the email is in the correct format
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailPattern.test(email)) {
                // alert("Vui lòng nhập một địa chỉ email hợp lệ");
                message.warning("Vui lòng nhập một địa chỉ email hợp lệ");

                return;
            }

            // Check if the password is at least 6 characters long
            if (pass.length < 6) {
                // alert("Mật khẩu phải chứa ít nhất 6 ký tự");
                message.warning("Mật khẩu phải chứa ít nhất 6 ký tự!!");

                return;
            }
            // Check if the password is at least 6 characters long
            if (pass.length > 20) {
                // alert("Mật khẩu phải chứa ít nhất 6 ký tự");
                message.warning("Mật khẩu quá 20 kí tự!!");

                return;
            }

            // Check if the password and re_Pass match
            if (re_Pass !== pass) {
                // alert("Mật khẩu và Mật khẩu nhập lại không trùng khớp");
                message.warning("Mật khẩu và Mật khẩu nhập lại không trùng khớp")

                return;
            }

            setIsLoad(true);

            Call_Post_Api({
                email: email,
                password: pass,
            }, null, null, "/shop/signup")
                .then((data) => {
                    alert(data.metadata.msg || "Đăng ký thành công!!");
                    setIsLoad(false);

                    if (data.metadata.msg === "Tài khoản đã đc đăng ký!!!") {
                        return;
                    } else if (data.metadata.msg !== "Error: Shop already registered") {
                        window.location = "/login";
                    } else {
                        return;
                    }
                });
        } else {
            // alert("Vui lòng nhập đầy đủ thông tin");
            message.warning("Vui lòng nhập đủ thông tin!!!")

        }
    }

    return (
        <div className={cx('container')}>
            {isLoad && (
                <div
                    style={{
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
                    }}
                >
                    <Spin />
                </div>
            )}
            <div>
                <div className={cx('box')}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        zIndex: -1
                    }}>
                        <Backgroug />
                    </div>
                    <div className={cx('form')}>
                        <div className={cx('all')}>
                            <div className={cx('left')}>
                                <div className={cx('login')}>Đăng Ký</div>
                                <div className={cx('titer')}>
                                    By logging in you agree to the ridiculously long terms that you didn't bother to read
                                </div>
                                <div className={cx('taikhoan')}>
                                    Bạn Chưa Có Tài Khoản? <Link to={'/login'}><span>Đăng Nhập</span></Link>
                                </div>
                            </div>
                            <div className={cx('rigth')}>
                                <div>
                                    <div className={cx('email')}>Email</div>
                                    <div>
                                        <input className={cx('input')} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <div className={cx('matkhau')}>Mật Khẩu</div>
                                    <div>
                                        <input className={cx('input')} type="password" onChange={(e) => setPass(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <div className={cx('matkhau')}>Mật Lại Mật Khẩu</div>
                                    <div>
                                        <input className={cx('input')} type="password" onChange={(e) => setRe_Pass(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <button className={cx('submit')} onClick={() => handerSubmit()}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingUp;
