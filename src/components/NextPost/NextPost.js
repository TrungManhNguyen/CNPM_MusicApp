import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'

function NextPost() {
    return (
        <div>
            <div>
                <div style={{
                    color: '#2daaed',
                    fontSize: '30px'
                }}>
                    Nghe Tiếp
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottom: '1px solid gray',
                    padding: '10px'
                }}>
                    <div>
                        <PlayCircleOutlined />
                    </div>
                    <div style={{
                        fontSize: '18px',
                        marginLeft: '10px'
                    }}>
                        <div>
                            Những gì anh nói
                        </div>
                        <div style={{
                            fontSize: '12px'
                        }}>
                            Nguyễn Quang Quý
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default NextPost