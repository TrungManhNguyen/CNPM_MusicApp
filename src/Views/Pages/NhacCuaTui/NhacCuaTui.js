import React, { useEffect, useState } from 'react'
import { Call_Post_Api } from '../../../CallApis/CallApis'
import Cookies from 'js-cookie';
import { StepForwardOutlined, VerticalAlignBottomOutlined, CopyOutlined } from '@ant-design/icons';

function NhacCuaTui() {
    const [apis, setApi] = useState([])
    const [lists, setList] = useState(null);
    const [audioKey, setAudioKey] = useState(0); // Unique key for <audio> element

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const name = Cookies.get('name');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');
        const cleanName = name?.replace(/^"|"$/g, '');

        Call_Post_Api(
            null, cleanedJwtString, cleanId, "/yeuthich/UserYeuThich/" + cleanId
        ).then((data) => {
            setApi(data.metadata)
            setList(data.metadata[0])
        })
    }, [])

    const handeClick = (index) => {
        setList(apis[index]);
        setAudioKey(audioKey + 1); // Change the key to remount the <audio> element
    }

    return (
        <div style={{
            marginTop: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '70%',
                padding: '30px'
            }}>
                <div>
                    Bài hát yêu thích
                </div>
                <div style={{
                    marginTop: '30px'
                }}>
                    {lists?.music_url &&
                        <>
                            <div>{lists?.music_name}</div>
                            <div style={{
                                height: '100px'
                            }}>
                                <audio key={audioKey} autoPlay controls >
                                    <source
                                        type="audio/mpeg"
                                        src={lists?.music_url}
                                    />
                                </audio>
                            </div>
                        </>
                    }
                    <div>
                        <div style={{
                            overflow: 'scroll',
                            height: '200px',
                            marginTop: '50px'
                        }}>
                            {apis.map((api, index) => (
                                <div style={{
                                    borderBottom: '1px solid gray',
                                    fontSize: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingTop: '10px',
                                    paddingBottom: '5px',
                                    cursor: true,
                                    backgroundColor: '#eeeeee',
                                    padding: '10px',
                                }}
                                    onClick={() => handeClick(index)}
                                >
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <div>
                                            {index + 1} .
                                        </div>
                                        <div>
                                            {api.music_name} - <span style={{
                                                opacity: 0.7
                                            }}>
                                                {api?.music_genre}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        fontSize: '18px'
                                    }}>
                                        <div style={{
                                            marginRight: '10px'
                                        }}>
                                            <StepForwardOutlined />
                                        </div>
                                        <div style={{
                                            marginRight: '10px'
                                        }}>
                                            <VerticalAlignBottomOutlined />
                                        </div>
                                        <div>
                                            <CopyOutlined />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NhacCuaTui;
