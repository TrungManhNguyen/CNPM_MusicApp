import React, { useEffect, useRef, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import NextPost from '../../../components/NextPost/NextPost';
import Card from './../../../components/Cards/Card';
import { Input, Upload, Button, message } from 'antd';
import { EnterOutlined, MehOutlined, HeartOutlined, ArrowDownOutlined, ShareAltOutlined, MoreOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import { Call_Post_Api } from '../../../CallApis/CallApis';
import Cookies from 'js-cookie';
import { Divider, Modal, Popover, Segmented } from 'antd';
import { Spin } from 'antd';
import Lottie from "lottie-react";
import listen from "../../../access/animation_lmz2pi2d.json"
const cx = classNames.bind(styles);

function Detail() {
    const audioRef = useRef(null);

    const { id } = useParams();
    const [isLoad, setIsLoad] = useState(false);

    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);

    const mergedArrow = useMemo(() => {
        if (arrowAtCenter) return { pointAtCenter: true };
        return showArrow;
    }, [showArrow, arrowAtCenter]);

    const [apis, setApi] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        Call_Post_Api(
            null, null, null, '/music/getMusicById/' + id
        )
            .then((data) => {
                setApi(data.metadata)
            })
    }, [])

    const [isPlaying, setIsPlaying] = useState(false);

    const [userId, setUserId] = useState()

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const name = Cookies.get('name');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');
        const cleanName = name?.replace(/^"|"$/g, '');

        setUserId(cleanId)

    }, [])

    //xử lý yêu thihcs

    const handerYeuThich = () => {

        const token = Cookies.get('accessToken');
        const name = Cookies.get('name');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');
        const cleanName = name?.replace(/^"|"$/g, '');
        if (token != "") {
            Call_Post_Api(
                {
                    music_name: apis.music_name,
                    music_genre: apis.music_genre,
                    music_img: apis.music_img,
                    music_url: apis.music_url,
                    user_id: cleanId,
                }, cleanedJwtString, cleanId, "/yeuthich/createYeuThich"
            ).then(() => {
                message.success(`Đã thêm bài nhac vào yêu thích!!!`);

            })
        } else {
            alert("Bạn Cần đăng nhập để yêu thích bài nhạc!!!")
        }
    }

    const [conten, setConten] = useState("")


    const handleInputChange = (event) => {
        // setState({ inputValue: event.target.value });
        setConten(event.taget.value)
    }


    const [comments, setComment] = useState([])

    const getById = () => {
        Call_Post_Api(
            null, null, null, "/comment/getByIdCommnet/" + id
        )
            .then((data) => {
                setComment(data.metadata)
            })
    }

    useEffect(() => {
        getById()
    }, [])

    const handleKeyPress = (event) => {

        const token = Cookies.get('accessToken');
        const name = Cookies.get('name');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');
        const cleanName = name?.replace(/^"|"$/g, '');


        if (event.key === 'Enter') {
            if (token != "") {
                setIsLoad(true)
                Call_Post_Api(
                    {
                        user_id: cleanId,
                        music_id: apis._id,
                        conten: conten,
                        user_name: cleanName
                    },
                    cleanedJwtString, cleanId, "/comment/createComment"
                )
                    .then(() => {
                        getById()
                        setConten("")
                        setIsLoad(false)
                        message.success("Bạn bình luận thành công!!!")
                    })
            }
            else {
                alert('Bạn hay đăng nhập để bình luận!!!')
            }

        }
    }

    const text = <span></span>
    const content = (
        <div style={{
            width: '100%',
            fontSize: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                borderBottom: '1px solid gray',
                width: '80%',
                textAlign: 'center',
                opacity: 0.7,
                padding: '5px'
            }}
                onClick={() => handerDelete()}
            >
                Xóa
            </div>
            <div style={{
                padding: '5px'

            }}>
                Sửa
            </div>
        </div>
    )

    const handerDelete = () => {

        Call_Post_Api(
            {
                
            }
        )

    }

    return (
        <div
            style={{
                marginTop: '90px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '100px'
            }}
        >
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
            <div
                style={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}
            >

                <div style={{
                    width: '800px'
                }}>
                    {apis && (
                        <>
                            <div>{apis?.music_name}</div>
                            <div style={{
                                height: '100px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                }}>
                                    <img src={apis?.music_img} style={{
                                        width: '80px',
                                        height: '80px',
                                        padding: '0px',
                                        marginLeft: '30px',
                                        marginTop: '10px'
                                    }} />
                                </div>
                                <audio controls ref={audioRef} autoPlay>
                                    <source
                                        type="audio/mpeg"
                                        src={apis?.music_url}
                                    />

                                </audio>

                            </div>
                        </>
                    )}

                    <div style={{
                        marginTop: '60px',
                        fontSize: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <div style={{
                                marginRight: '20px'
                            }}>
                                <HeartOutlined />
                                <span className={cx('hover')} onClick={() => handerYeuThich()}>
                                    Yêu Thích
                                </span>
                            </div>

                            <div style={{
                                marginRight: '20px'
                            }}>
                                <ArrowDownOutlined />
                                <span className={cx('hover')}>

                                    Tải Nhạc
                                </span>
                            </div>

                            <div style={{
                                marginRight: '20px'
                            }}>
                                <ShareAltOutlined />
                                <span className={cx('hover')}>

                                    Chia Sẻ
                                </span>
                            </div>

                            <div style={{
                                marginRight: '20px'
                            }}>
                                <HeartOutlined />
                                <span className={cx('hover')}>

                                    Nhạc Chờ
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bình luận */}

                    <div style={{
                        marginTop: '10px'
                    }}>
                        <div>
                            Bình Luận :
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <div style={{
                                flex: 1
                            }}>
                                <Input
                                    onChange={(e) => setConten(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    value={conten}
                                    style={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        backgroundColor: 'none'
                                    }}
                                />
                            </div>
                            <div style={{
                                // flex: 0.5
                                width: '80px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '20px',
                            }}>
                                <Lottie animationData={listen} />
                            </div>
                        </div>
                    </div>

                    {/* conten bình luận */}
                    {comments.map(comment => (
                        <div style={{
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '0.5px solid gray',

                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    padding: '10px'
                                }}>
                                    <MehOutlined />
                                    <div style={{
                                        marginLeft: '10px'
                                    }}>
                                        <div style={{
                                            fontSize: '18px'
                                        }}>
                                            {comment.user_name}
                                        </div>
                                        <div style={{
                                            fontSize: '12px'
                                        }}>
                                            {comment.conten}
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '30px',
                                    display: 'flex'
                                }}>
                                    <div style={{
                                        textAlign: 'center'
                                    }}>
                                        {comment.updatedAt}
                                    </div>
                                    {
                                        userId == comment.user_id ? (
                                            <Popover placement="topLeft" title={text} content={content} arrow={mergedArrow}>
                                                <div style={{
                                                    fontSize: '20px',
                                                    marginLeft: '20px',

                                                }}>
                                                    <MoreOutlined />
                                                </div>
                                            </Popover>
                                        )
                                            : null
                                    }
                                </div>

                            </div>


                        </div>
                    ))}
                    <div style={{
                        // marginTop: '30px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            borderBottom: '0.5px solid gray',
                            padding: '10px'
                        }}>
                            <MehOutlined />
                            <div style={{
                                marginLeft: '10px'
                            }}>
                                <div style={{
                                    fontSize: '18px'
                                }}>
                                    Ngô Xuân Quy
                                </div>
                                <div style={{
                                    fontSize: '12px'
                                }}>
                                    Nhạc hay quá!!!!
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            borderBottom: '0.5px solid gray',
                            padding: '10px'
                        }}>
                            <MehOutlined />
                            <div style={{
                                marginLeft: '10px'
                            }}>
                                <div style={{
                                    fontSize: '18px'
                                }}>
                                    Ngô Xuân Quy
                                </div>
                                <div style={{
                                    fontSize: '12px'
                                }}>
                                    Nhạc hay quá!!!!
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '60px'
                    }}>
                        <div>
                            PLAYLIST | ALBUM
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                        </div>
                    </div>


                    <div style={{
                        marginTop: '10px'
                    }}>
                        <div>
                            PLAYLIST | ALBUM
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                            <div>
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next post */}
                <div>
                    <NextPost />
                </div>
            </div>
        </div>
    );
}

export default Detail;
