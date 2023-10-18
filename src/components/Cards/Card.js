import React from 'react'
import classNames from "classnames/bind"
import styles from "./Card.module.scss"

const cx = classNames.bind(styles)
function Card({ width }) {
    return (
        <div className={cx("container")}>
            <div>
                <div>
                    <button style={{
                        border: 'none'
                    }}>
                        <img src='https://img4.thuthuatphanmem.vn/uploads/2020/08/28/hinh-anh-dep-ve-thien-nhien_101329902.jpg'
                            className={cx("img_card")}
                            style={{
                                width: width
                            }}
                        />
                        <div className={cx('text_card')}>
                            Nam ca sĩ việt
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card