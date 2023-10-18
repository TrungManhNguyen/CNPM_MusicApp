import React, { useEffect, useState } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
// import { CallPostApi } from '../../CallApis/CallApis'
import Cookies from 'js-cookie';
import { Call_Post_Api } from '../../CallApis/CallApis';
import { Link, useNavigate } from "react-router-dom"

function BoxRigth() {

    const [apis, setApi] = useState([])

    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        Call_Post_Api(
            null, cleanedJwtString, cleanId, '/music/getMusic'
        ).then((data) => {
            setApi(data.metadata)
        })

    }, [])


    return (
        <div style={{
            paddingLeft: '40px'
        }}>
            <div>
                BXH Bài Hát
            </div>
            <ButtonGroup variant="contained">
                <Button color="primary">Việt Nam</Button>
                <Button >Châu Âu</Button>
                <Button >Button 3</Button>
            </ButtonGroup>

            <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '30px',
                    marginRight: '10px'
                }}>
                    1
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <img src='https://4.bp.blogspot.com/-HeLxjkHnkMU/UZCLtr3Ab8I/AAAAAAAAIkA/QAtVz6Q5-gI/s1600/hinh-anh-song-bien-6.jpg'
                        style={{
                            width: '100px',
                            height: '100px'
                        }}
                    />
                    <div style={{
                        fontSize: '14px',
                        padding: '10px'
                    }}>
                        <div>
                            id 1812
                        </div>
                        <div style={{
                            opacity: 0.6
                        }}>
                            W/n
                        </div>
                    </div>
                </div>

            </div>
            {apis.map((api, index) => (
                <Link to={`/Detail/${api._id}`} style={{
                    textDecoration: 'none',
                }}>
                    <div style={{
                        fontSize: '14px',
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '10px',
                        borderBottom: '0.4px solid #D9D9D9',
                        color: 'black'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '6px',
                            marginRight: '10px',
                            fontSize: '20px',
                            textDecoration: 'none',
                            listStyle: 'none'
                        }}>
                            {index + 1}
                        </div>
                        <div>
                            <div>
                                {api.music_name}
                            </div>
                            <div style={{
                                opacity: 0.6
                            }}>
                                {api.author || <>
                                    Ngô Xuân Quy
                                </>}
                            </div>
                        </div>
                    </div>
                </Link>

            ))
            }
            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    2
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>

            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    3
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>

            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    4
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>

            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    5
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>


            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    5
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>


            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    6
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>


            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    7
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>


            <div style={{
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
                borderBottom: '0.4px solid #D9D9D9',

            }}>
                <div style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '6px',
                    marginRight: '10px',
                    fontSize: '20px'
                }}>
                    10
                </div>
                <div>
                    <div>
                        Khi Cơn Mưa Dần Phai
                    </div>
                    <div style={{
                        opacity: 0.6
                    }}>
                        ngô xuân quy
                    </div>
                </div>
            </div>

            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    width: '300px',
                    height: '250px',
                    backgroundImage: `url('https://stc-id.nixcdn.com/v11/images/bg_web.png')`,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <div style={{
                        fontSize: '20px',
                        color: 'white',
                        textAlign: 'center',

                    }}>
                        <div style={{
                            marginTop: '50px'

                        }}>
                            GIỢI Ý DÀNH CHO BẠN
                        </div>
                    </div>
                    <div style={{
                        fontSize: '16px',
                        padding: '15px',
                        textAlign: 'center',
                        marginTop: '50px'

                    }}>
                        Thưởng thức những ca khúc phù hợp nhất với bạn
                    </div>

                    <div style={{
                        backgroundColor: 'white',
                        width: '150px',
                        textAlign: 'center'
                    }}>
                        Nghe bài hát
                    </div>
                </div>
            </div>

            {/* Chủ đề Hot */}

            <div style={{
                marginTop: '25px'
            }}>
                <div style={{
                    fontSize: '30px',
                    color: '#2daaed'
                }}>
                    Chủ Đề Hot
                </div>
                <div style={{
                    marginTop: '10px'
                }}>
                    <img src='https://avatar-ex-swe.nixcdn.com/topic/thumb/2020/06/18/9/5/f/7/1592451702890_org.jpg' />
                </div>
                <div style={{
                    marginTop: '10px'
                }}>
                    <img src='https://avatar-ex-swe.nixcdn.com/topic/thumb/2021/10/05/5/9/a/4/1633419154617_org.jpg' />
                </div>
                <div style={{
                    marginTop: '10px'
                }}>
                    <img src='https://avatar-ex-swe.nixcdn.com/topic/thumb/2020/06/15/b/1/e/6/1592214676121_org.jpg' />
                </div>
                <div style={{
                    marginTop: '10px'
                }}>
                    <img src='https://avatar-ex-swe.nixcdn.com/topic/thumb/2020/06/22/9/7/b/e/1592812644825_org.jpg' />
                </div>
                <div style={{
                    marginTop: '10px'
                }}>
                    <img src='https://avatar-ex-swe.nixcdn.com/topic/thumb/2020/06/18/9/5/f/7/1592468690285_org.jpg' />
                </div>
            </div>

        </div >
    )
}

export default BoxRigth