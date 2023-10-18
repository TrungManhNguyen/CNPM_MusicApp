

import { Header, Footer } from '../../../components'

import classNames from "classnames/bind"
import styles from "./defaultlayout.module.scss"

const cx = classNames.bind(styles)
const PrivateDefaultLayout = ({ children }) => {

    return (
        <div className={cx('container')}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default PrivateDefaultLayout