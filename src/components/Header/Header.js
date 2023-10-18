import { Link, useNavigate } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faBars, faChevronDown, faEnvelope, faPhone, faUser, faHomeAlt } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import classNames from "classnames/bind"
import styles from "./header.module.scss"
// import Cookies from 'js-cookie';
// import { auth } from '../../Views/Pages/config/index'
import { SideSheet, Paragraph, Button } from 'evergreen-ui';
import { faHome, faCloud } from '@fortawesome/free-solid-svg-icons';
import { Divider, Modal, Popover, Segmented } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import Cookies from 'js-cookie';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../access/animation_lmz2x1gc.json"

const cx = classNames.bind(styles)
const Header = () => {

    const navigate = useNavigate();


    const text = <span></span>

    const VietNams = [
        { id: 1, value: " Nhạc Trẻ" },
        { id: 2, value: " Chữ tình" },
        { id: 3, value: "  Remix Việt" },
        { id: 4, value: " Rap Việt" },
        { id: 5, value: " Tiền Chiến" },
        { id: 6, value: " Nhạc Trịnh" },
        { id: 7, value: " Rook Việt" },
        { id: 8, value: " Cách mạng" },
    ]

    const AuMys = [
        { id: 1, value: "Pop" },
        { id: 2, value: "Rock" },
        { id: 3, value: "Electronica|Dance" },
        { id: 4, value: "R&B|HipHop|Rap" },
        { id: 5, value: "Blues|lazz" },
        { id: 6, value: "Country" },
        { id: 7, value: "Latin" },
        { id: 8, value: "Âu Mỹ Khác" },
    ]

    const content = (
        <div style={{
            width: '500px'
        }}>
            <div>
                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '19px',
                                fontWeight: 500
                            }}>
                                Việt Nam
                            </div>
                            <div style={{
                                fontSize: '15px',
                                lineHeight: '35px',
                                marginTop: '10px'
                            }}>
                                {VietNams.map(VietNam => (
                                    <Link to={`/type/${VietNam.value}`} style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }} >
                                        <div
                                            key={VietNam.id}
                                            className={cx('hover')}>
                                            {VietNam.value}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div style={{
                                fontSize: '19px',
                                fontWeight: 500
                            }}>
                                Âu Mỹ
                            </div>
                            <div style={{
                                fontSize: '15px',
                                lineHeight: '35px',
                                marginTop: '10px'
                            }}>
                                {AuMys.map(AuMy => (
                                    <Link to={`/type/${AuMy.value}`} style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }} >
                                        <div
                                            key={AuMy.id}
                                            className={cx('hover')}>
                                            {AuMy.value}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div style={{
                                fontSize: '19px',
                                fontWeight: 500
                            }}>
                                Châu Á
                            </div>
                            <div style={{
                                fontSize: '15px',
                                lineHeight: '35px',
                                marginTop: '10px'
                            }}>
                                <div className={cx('hover')}>
                                    Nhạc Hàn
                                </div>
                                <div className={cx('hover')}>

                                    Nhạc Hoa
                                </div>
                                <div className={cx('hover')}>

                                    Nhạc Việt
                                </div>
                                <div className={cx('hover')}>
                                    Nhạc Trung
                                </div>

                            </div>
                        </div>
                        <div>
                            <div style={{
                                fontSize: '19px',
                                fontWeight: 500
                            }}>
                                Khác
                            </div>
                            <div style={{
                                fontSize: '15px',
                                lineHeight: '35px',
                                marginTop: '10px'
                            }}>
                                <div className={cx('hover')}>
                                    Thiếu Nhi
                                </div>
                                <div className={cx('hover')}>
                                    Không Lời
                                </div>
                                <div className={cx('hover')}>
                                    Nhạc Phim
                                </div>
                                <div className={cx('hover')}>
                                    Thể Loại Khác
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


    const BXH = (
        <div style={{
            width: '100px',
            fontSize: '16px',
            fontWeight: 450
        }}>
            <div className={cx('hover')}>
                Nhạc Việt
            </div>
            <div className={cx('hover')}>
                Nhạc Trung
            </div>
            <div className={cx('hover')}>
                Nhạc Hàn
            </div>
        </div>
    )


    //Xử lý đăng xuất
    const handelLoOut = () => {
        Cookies.set('name', "")
        Cookies.set('accessToken', "")
        navigate('/login')
    }

    const uses = (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%'
        }}>
            <Link to="/UsesPage" >
                <div style={{
                    borderBottom: '1px solid gray',
                    lineHeight: '40px',
                    fontSize: '17px',
                    width: '150px',
                    height: '45px'

                }}>
                    Trang cá nhân
                </div>
            </Link>
            <Link to="/NhacCuaTui" style={{
                textDecoration: 'none',
                color: 'black'
            }}
                className={cx('hover')}
            >

                <div style={{
                    borderBottom: '1px solid gray',
                    lineHeight: '30px',
                    fontSize: '17px',
                    width: '150px',
                    height: '40px'


                }}>
                    Nhạc của tui
                </div>
            </Link>
            <div style={{
                borderBottom: '1px solid gray',
                lineHeight: '30px',
                fontSize: '17px',
                width: '150px',
                height: '40px',
                cursor: 'pointer'
            }}>
                Tài khoản
            </div>
            <div style={{
                borderBottom: '1px solid gray',
                lineHeight: '30px',
                fontSize: '17px',
                width: '150px',
                height: '40px',
                cursor: 'pointer'

            }}>
                Lịch sử
            </div>
            <div style={{
                borderBottom: '1px solid gray',
                lineHeight: '30px',
                fontSize: '17px',
                width: '150px',
                height: '40px',
                cursor: 'pointer'

            }}
                onClick={() => handelLoOut()}
            >
                Thoát
            </div>
        </div>
    )

    const buttonWidth = 70;

    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);

    const mergedArrow = useMemo(() => {
        if (arrowAtCenter) return { pointAtCenter: true };
        return showArrow;
    }, [showArrow, arrowAtCenter]);


    //Khai báo token
    const [token, setToken] = useState('')
    const [name, setName] = useState('')


    useEffect(() => {
        const token = Cookies.get('accessToken');
        const name = Cookies.get('name');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');
        const cleanName = name?.replace(/^"|"$/g, '');


        setToken(cleanedJwtString)
        setName(cleanName)
    }, [])

    const [state, setState] = useState([])

    const handleInputChange = (event) => {
        setState({ inputValue: event.target.value });
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && state.inputValue != undefined && state.inputValue != "") {
            navigate('/search/' + state.inputValue)
            setState(state.inputValue);
        }
    }

    //xử lý load ảnh
    const handelUpload = () => {
        if (token != "") {
            navigate('/LoadMusic')
        }
        else {
            alert('Bạn cân đăng nhập để load nhạc !!!')
            navigate('/login')

        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx("header")}>
                <MenuOutlined className={cx('menu')} />
                <div className={cx("lg_fake")}>
                    <Link to="/" >
                        <img src="https://stc-id.nixcdn.com/v11/images/header_new/logo_new.png"
                            style={{
                                width: '70px'
                            }}
                        />
                    </Link>
                </div>
                <div className={cx("header_left")}>
                    <div>
                        <Link to="/" >
                            <img src="https://stc-id.nixcdn.com/v11/images/header_new/logo_new.png"
                                style={{
                                    width: '70px'
                                }}
                            />
                        </Link>
                    </div>
                    <Popover placement="topLeft" title={text} content={content} arrow={mergedArrow}>
                        <div style={{
                            marginTop: '5px',
                            color: '#2daaed'
                        }}>
                            Bài hát
                        </div>
                    </Popover>
                    <Popover placement="topLeft" title={text} content={content} arrow={mergedArrow}>

                        <div style={{
                            marginTop: '5px'
                        }}>
                            Playlist
                        </div>
                    </Popover>

                    <div style={{
                        marginTop: '5px'
                    }}>
                        Tuyển Tập
                    </div>
                    <div style={{
                        marginTop: '5px'
                    }}>
                        Video
                    </div>

                    <Popover placement="topLeft" title={text} content={BXH} arrow={mergedArrow} style={{
                        width: '80px'
                    }}>
                        <div style={{
                            marginTop: '5px',
                        }}>
                            BXH
                        </div>
                    </Popover>
                    <div style={{
                        marginTop: '5px'
                    }}>
                        Top 100
                    </div>
                </div>

                {/* search  */}
                <div className={cx("header_rigth")}>
                    <div style={{
                        position: 'absolute',
                        zIndex: 100
                    }}>
                        <Lottie animationData={groovyWalkAnimation} style={{
                            fontSize: '20px',
                            width: '65px',
                            marginTop: '-13px',
                            marginLeft: '-50px'

                        }} />

                    </div>
                    <div >
                        <input
                            placeholder="Tìm kiếm"
                            style={{
                                fontSize: '14px',
                                color: 'black',
                                border: 'none',
                                backgroundColor: "#eeeeee",
                                padding: '4px',
                                opacity: 0.7,
                                paddingLeft: '10px',
                                marginTop: '5px'
                                // borderRadius: '2px'
                            }}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div>

                        <FontAwesomeIcon
                            icon={faHome}
                            style={{
                                fontSize: "20px",
                                color: 'rgb(45, 170, 237)',
                                marginTop: '5px'

                            }}
                        />
                    </div>
                    <div onClick={() => handelUpload()}>
                        <FontAwesomeIcon icon={faCloud}
                            style={{
                                fontSize: "20px",
                                color: 'rgb(45, 170, 237)',
                                marginTop: '5px'
                            }}
                        />
                    </div>
                    <div>
                        {
                            token == "" ?
                                <>
                                    <Button >
                                        <Link to="/Login" style={{
                                            textDecoration: 'none'
                                        }}>
                                            Đăng nhập
                                        </Link>
                                    </Button>
                                    <Button color="private">
                                        <Link to="/SingUp" style={{
                                            color: 'black',
                                            textDecoration: 'none'
                                        }}>
                                            Đăng ký
                                        </Link>
                                    </Button>
                                </>
                                :

                                <Popover placement="topLeft" title={text} content={uses} arrow={mergedArrow} style={{
                                    width: '80px'
                                }}>
                                    <Avatar shape="square" icon={<UserOutlined />} />
                                </Popover>
                        }
                        {name}
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Header