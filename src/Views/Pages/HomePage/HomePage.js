import React, { useEffect, useRef, useState } from 'react'
import { Sliders } from '../../../components'
import classNames from "classnames/bind"
import styles from "./HomePage.module.scss"
import Card from '../../../components/Cards/Card'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import axios from 'axios'
import BoxRigth from '../../../components/BoxRight/BoxRigth'
import Cookies from 'js-cookie';
import { Call_Post_Api } from '../../../CallApis/CallApis'
import { Link, useNavigate } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';

const cx = classNames.bind(styles)
function HomePage() {

    const audioRef = useRef(null);

    useEffect(() => {
        // Khởi tạo "aos" trong hàm useEffect để đảm bảo nó hoạt động sau khi dự án đã render.
        AOS.init({
            duration: 1000, // Đặt thời gian mặc định cho các hiệu ứng
        });
    }, []);

    // useEffect(() => {
    //     // Sử dụng audioRef.current.play() để tự động phát âm thanh khi component được tải
    //     audioRef.current.play();
    // }, []);

    const fileInputRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUploadedImage(reader.result);
        };

        reader.readAsDataURL(file);
    };


    const uploadImage = async () => {
        // setIsLoading(true)

        const CLOUD_NAME = "dvqmndx5j";
        const PRESET_NAME = "upload";
        const FOLDER_NAME = "banhang"
        const url = [];
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append("upload_preset", PRESET_NAME)
        formData.append("folder", FOLDER_NAME)

        // formData.append('file', image)

        // formData.append("file", {
        //     uri: uploadedImage,
        //     type: "audio/mpeg", // Set the correct content type for MP3 files
        //     name: "audio.mp3", // You can change the name as needed
        // });

        const base64Data = uploadedImage.split(",")[1]; // Extract the base64 data
        const binaryData = atob(base64Data); // Decode base64 to binary

        const byteArray = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
        }

        const mp3Blob = new Blob([byteArray], {
            type: "audio/mpeg", // Set the correct content type for MP3 files
        });

        const res = await axios.post(api, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })

            .catch((err) => {
                console.error("Error uploading image:", err);
            });
        return res.data.url;
    }

    const uploadMP3 = async () => {
        const CLOUD_NAME = "dvqmndx5j"; // Replace with your Cloudinary cloud name
        const PRESET_NAME = "upload"; // Replace with your Cloudinary preset name
        const FOLDER_NAME = "banhang"; // Replace with your desired folder name
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`; // Use 'video/upload' for MP3 files

        try {
            const formData = new FormData();
            formData.append("upload_preset", PRESET_NAME);
            formData.append("folder", FOLDER_NAME);

            // Convert the base64 data URI to binary
            const base64Data = uploadedImage.split(",")[1];
            const binaryData = atob(base64Data);

            // Create a Uint8Array to store the binary data
            const byteArray = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
                byteArray[i] = binaryData.charCodeAt(i);
            }

            // Create a Blob from the Uint8Array
            const mp3Blob = new Blob([byteArray], {
                type: "audio/mpeg", // Set the correct content type for MP3 files
            });

            formData.append("file", mp3Blob, "audio.mp3"); // Use the Blob as the file

            const response = await fetch(api, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error uploading MP3:", errorData);
                throw new Error("Error uploading MP3");
            }

            const responseData = await response.json();
            return responseData.url;
        } catch (error) {
            console.error("Error uploading MP3:", error.message);
            throw error; // Re-throw the error to handle it elsewhere if needed
        }
    };


    const [soures, setSoures] = useState("")

    const handerUpload = async () => {
        // const test = await uploadImage()
        // console.log({ test })

        uploadMP3()
            .then((audioUrl) => {
                setSoures(audioUrl)
                // console.log("MP3 uploaded successfully. URL:", audioUrl);
            })
            .catch((error) => {
                console.error("MP3 upload failed:", error);
            });
    }


    const [apis, setApi] = useState([])

    useEffect(() => {

        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/^"|"$/g, '');
        const cleanId = id?.replace(/^"|"$/g, '');

        Call_Post_Api(
            null, cleanedJwtString, cleanId, '/music/getMusic'
        ).then((data) => {
            setApi(data.metadata.slice(0, 5))
        })

    }, [])


    return (
        <div className={cx('container')}>
            <div>
                <div>
                    <Sliders />
                </div>
            </div>

            {/* conten */}
            <div className={cx("conten")}>
                <div style={{
                    fontSize: "25px",

                }}>
                    <div>
                        Vũ trụ nhạc việt
                    </div>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        // padding: 10
                        marginLeft: "20px",

                    }}>
                        <div style={{

                        }}
                            className={cx("baihat")}
                        >
                            {apis.map(api => (
                                <Link to={`/Detail/${api._id}`} >
                                    <div style={{
                                        width: '180px'
                                    }}>
                                        <div>
                                            <button style={{
                                                border: 'none'
                                            }}>
                                                <img src={api?.music_img}
                                                    className={cx("img_card")}
                                                    style={{
                                                        width: '150px'
                                                    }}
                                                />
                                                <div className={cx('text_card')} style={{
                                                    fontSize: '14px'
                                                }}>
                                                    {api?.music_name}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Nhạc quốc tế */}

                    <div>
                        Nhạc Quốc Tế
                    </div>
                    <div
                        className={cx("baihat_test")}

                    >
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                    </div>

                    {/* Tâm trạng hôm nay */}

                    <div>
                        Tâm trạng hôm nay
                    </div>
                    <div className={cx("baihat_test")}
                        data-aos="zoom-out"
                    >
                        <div style={{
                            marginLeft: '10px'
                        }}
                            data-aos="zoom-in-right"

                        >
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}
                            data-aos="zoom-out-up"
                        >
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}
                            data-aos="zoom-out-up"
                        >
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}
                            data-aos="zoom-out-up"
                        >
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}
                            data-aos="zoom-out-left"
                        >
                            <Card />
                        </div>
                    </div>


                    {/* Tâm trạng hôm nay */}

                    <div>
                        Tâm trạng hôm nay
                    </div>
                    <div className={cx("baihat_test")}
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"

                    >
                        <div style={{
                            marginLeft: '10px'
                        }}
                        // data-aos="fade-up"
                        // data-aos-anchor-placement="top-bottom"
                        >
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                        <div style={{
                            marginLeft: '10px'
                        }}>
                            <Card />
                        </div>
                    </div>

                    {/* MC HOT */}

                    <div>
                        <div>
                            <div>
                                MV HOT
                            </div>
                            <div className={cx("MV_hot")}>
                                <div>
                                    <div style={{
                                        position: 'relative',
                                        cursor: 'pointer'

                                    }}
                                        data-aos="zoom-in-right"
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            color: 'white',
                                            zIndex: 1,
                                            bottom: '10px',
                                            left: '10px'
                                        }}>
                                            <div style={{
                                                fontSize: '18px'
                                            }}>
                                                Từ ngày xa anh
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                opacity: 0.7

                                            }}>
                                                Khởi my
                                            </div>
                                        </div>
                                        <img src='http://3.bp.blogspot.com/-lcTNC8C5MV8/VABtOaylX3I/AAAAAAAADqk/4QbIdx3jFVk/s1600/Hinhnendl.com---Hinh-nen-khong-gian%2B(6).jpg'
                                            style={{
                                                width: '395px',
                                                height: '200px',
                                                position: 'relative'
                                            }}
                                        />

                                    </div>
                                </div>
                                <div>
                                    <div style={{
                                        position: 'relative',
                                        cursor: 'pointer'
                                    }}
                                        data-aos="zoom-out-left"

                                    >
                                        <div style={{
                                            position: 'absolute',
                                            color: 'white',
                                            zIndex: 1,
                                            bottom: '10px',
                                            left: '10px'
                                        }}>
                                            <div style={{
                                                fontSize: '18px'
                                            }}>
                                                Tưởng là hiểu nhau
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                opacity: 0.7

                                            }}>
                                                ngô xuân quy
                                            </div>
                                        </div>
                                        <img src='http://3.bp.blogspot.com/-lcTNC8C5MV8/VABtOaylX3I/AAAAAAAADqk/4QbIdx3jFVk/s1600/Hinhnendl.com---Hinh-nen-khong-gian%2B(6).jpg'
                                            style={{
                                                width: '395px',
                                                height: '200px',
                                                position: 'relative'
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx("fake_mvhot")}>
                        <div >
                            <Card width={190} />
                        </div>
                        <div>
                            <Card width={190} />

                        </div>
                        <div>
                            <Card width={190} />

                        </div>
                        <div>
                            <Card width={190} />

                        </div>
                    </div>

                    <div className={cx("fake_mvhot")}>

                        <div >
                            <Card width={190} />
                        </div>
                        <div>
                            <Card width={190} />

                        </div>
                        <div>
                            <Card width={190} />

                        </div>
                        <div>
                            <Card width={190} />

                        </div>
                    </div>


                    {/* Bài hát */}
                    <div>
                        <div style={{
                            fontSize: '30px',
                            marginTop: '10px',
                            color: '#2daaed'
                        }}>
                            Bài Hát
                        </div>

                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <div style={{
                            width: '400px',
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px'
                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px',
                                marginTop: '5px'

                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px',
                                marginTop: '5px'

                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px',
                                marginTop: '5px'

                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            width: '400px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px',
                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px',
                                marginTop: '5px'

                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px',
                                marginTop: '5px',

                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '1px solid #dddddd',
                                paddingTop: '10px',
                                marginTop: '5px',
                                marginBottom: '40px'


                            }}>
                                <img src='https://phunugioi.com/wp-content/uploads/2020/03/hinh-nen-may-tinh-4k-de-thuong-scaled.jpg'
                                    style={{
                                        width: '70px',
                                        height: '70px'
                                    }}
                                />
                                <div style={{
                                    padding: '10px'
                                }}>
                                    <div style={{
                                        fontSize: '16px'
                                    }}>
                                        Vương
                                    </div>
                                    <div style={{
                                        fontSize: '13px',
                                        opacity: 0.5
                                    }}>
                                        Siu Back
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



                <div >
                    <BoxRigth />
                </div>
            </div >


            {/* tải nhạc

            <div div >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                />
            </div >
            <div>
                <audio controls ref={audioRef}  >
                    <source type="audio/mpeg" src="http://res.cloudinary.com/dvqmndx5j/video/upload/v1695225431/banhang/wslnbjfcorch9borewta.mp3" />
                </audio>
            </div>
            <Button onClick={() => handerUpload()}>
                Upload
            </Button> */}
        </div >
    )
}

export default HomePage