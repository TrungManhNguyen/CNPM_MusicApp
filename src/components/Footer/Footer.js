import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import React, { useEffect, useRef } from "react"
import classNames from "classnames/bind"
import styles from "./footer.module.scss"

const cx = classNames.bind(styles)
const Footer = () => {

    const [test, settest] = useState('');

    return (
        <div
            className={cx("svg")}
        >
            <div>
                <svg
                    className={cx("svg")}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1600 900"
                    preserveAspectRatio="xMidYMax slice"
                >
                    <defs>
                        <linearGradient id="bg">
                            <stop offset="0%" style={{ stopColor: 'rgba(130, 158, 249, 0.06)' }} />
                            <stop offset="50%" style={{ stopColor: 'rgba(76, 190, 255, 0.6)' }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(115, 209, 72, 0.2)' }} />
                        </linearGradient>
                        <path
                            id="wave"
                            fill="url(#bg)"
                            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
          s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                        />
                    </defs>
                    <g>
                        <use xlinkHref="#wave" opacity=".3">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="translate"
                                dur="10s"
                                calcMode="spline"
                                values="270 230; -334 180; 270 230"
                                keyTimes="0; .5; 1"
                                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                repeatCount="indefinite"
                            />
                        </use>
                        <use xlinkHref="#wave" opacity=".6">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="translate"
                                dur="8s"
                                calcMode="spline"
                                values="-270 230;243 220;-270 230"
                                keyTimes="0; .6; 1"
                                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                repeatCount="indefinite"
                            />
                        </use>
                        <use xlinkHref="#wave" opacity=".9">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="translate"
                                dur="6s"
                                calcMode="spline"
                                values="0 230;-140 200;0 230"
                                keyTimes="0; .4; 1"
                                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                repeatCount="indefinite"
                            />
                        </use>
                    </g>
                </svg>

                <div className={cx('container')}>

                    <div className="container">
                        <div className={cx('box')}>
                            <div className={cx('row')}>
                                <h1>Nhóm G06</h1>
                                <p>Address: 60-49 Road 11378 New York</p>
                                <p>New York</p>
                                <p>Phone: +65 11.188.888</p>
                                <p>Email: hello@colorlib.com</p>
                            </div>
                            <div className={cx('footer__widget')}>
                                <h2>Useful Links</h2>
                                <table>
                                    <tr>
                                        <td>
                                            <ul>
                                                <li><Link to={'#'}> About Us </Link> </li>
                                                <li><Link to={'#'}> About Our Shop </Link> </li>
                                                <li><Link to={'#'}> Secure Shopping </Link> </li>
                                                <li><Link to={'#'}> Delivery infomation </Link> </li>
                                                <li><Link to={'#'}> Privacy Policy </Link> </li>
                                                <li><Link to={'#'}> Our Sitemap</Link> </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul>
                                                <li><Link to={'#'}> Who We Are </Link> </li>
                                                <li><Link to={'#'}> Our Services </Link> </li>
                                                <li><Link to={'#'}> Projects </Link> </li>
                                                <li><Link to={'#'}> Contact </Link> </li>
                                                <li><Link to={'#'}> Innovation </Link> </li>
                                                <li><Link to={'#'}> Testimonials </Link> </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className={cx('footer_right')}>
                                <h6>Join Our Newsletter Now</h6>
                                <p>Get E-mail updates about our latest shop and special offers.</p>
                                <div className={cx('icon')}>
                                    <Link to={'#'}><i style={{
                                        border: '1px solid black',
                                        marginLeft: '10px',
                                        width: '40px'
                                    }} class="fa fa-facebook"> </i> </Link>
                                    <Link to={'#'}> <i class="fa fa-instagram"></i> </Link>
                                    <Link to={'#'}> <i class="fa fa-twitter"></i> </Link>
                                    <Link to={'#'}><i class="fa fa-pinterest"></i></Link>

                                </div>

                            </div>
                        </div>
                        {/* <div className={cx('bottom')}>
                            <div>

                                <p >Copyright ©2022 All rights reserved | This template is made with  by Colorlib</p>
                            </div>
                            <div><img src='https://technext.github.io/ogani/img/payment-item.png' /></div>
                        </div> */}
                    </div >
                </div >
            </div >
        </div >
    )
}

export default Footer;
