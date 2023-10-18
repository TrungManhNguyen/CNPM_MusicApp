import React, { useState, useRef } from 'react';
import { Input, Upload, Button, message } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './LoadMusic.module.scss';
import axios from 'axios'
import { Call_Post_Api } from '../../../CallApis/CallApis';
import Cookies from 'js-cookie';
import { Spin, Modal } from 'antd';
// Define a custom function to get base64 data
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        callback(reader.result);
    });
    reader.readAsDataURL(img);
};

function LoadMusic() {

    const fileInputRef = useRef(null);

    const [fileValue, setFileValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [soures, setSoures] = useState('');

    // const uploadProps = {
    //     name: 'file',
    //     action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     maxFileSize: 1050 * 1024 * 1024, // Corrected typo in property name
    //     onChange(info) {
    //         if (info.file.status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //             getBase64(info.file.originFileObj, (url) => {
    //                 setFileValue(url);
    //                 console.log(url)

    //             })
    //         } else if (info.file.status === 'error') {
    //             getBase64(info.file.originFileObj, (url) => {
    //                 setFileValue(url);
    //                 console.log(url)
    //             })
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };


    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setFileValue(reader.result);
        };

        reader.readAsDataURL(file);
    };




    // const handleChange = (info) => {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get the URL of the uploaded image from the response
    //         getBase64(info.file.originFileObj, (url) => {
    //             setImageUrl(url);
    //             console.log({ url })

    //         })

    //         setLoading(false);

    //     }
    // };


    //test
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (file.url) {
            setPreviewImage(file.url);
            setPreviewVisible(true);
        }
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const beforeUpload = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSizeMB = 2;

        if (!allowedTypes.includes(file.type)) {
            message.error('You can only upload JPG/PNG files!');
            return false; // Prevent file upload
        }

        if (file.size / 1024 / 1024 > maxSizeMB) {
            message.error(`Image must be smaller than ${maxSizeMB}MB!`);
            return false; // Prevent file upload
        }

        return true; // Allow the file to be uploaded
    };


    //upda ảnh trên cloudinmary


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

        formData.append('file', fileList[0].thumbUrl)

        const res = await axios.post(api, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },

        })
        return res.data.secure_url;
    }

    // const uploadButton = (
    //     <div>
    //         {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //         <div style={{ marginTop: 8 }}>Upload</div>
    //     </div>
    // );

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
            const base64Data = fileValue.split(",")[1];
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



    //khai tạo name
    const [name, setName] = useState('');
    const [tacgia, setTacgia] = useState('');
    const [theLoai, setTheLoai] = useState('');

    const [isLoad, setIsLoad] = useState(false)

    const handleUpload = async () => {
        try {
            setIsLoad(true)
            const token = Cookies.get('accessToken');
            const id = Cookies.get('id');
            const cleanedJwtString = token?.replace(/^"|"$/g, '');
            const cleanId = id?.replace(/^"|"$/g, '');



            if (fileList[0]?.thumbUrl != undefined && fileValue != undefined && name != "" && theLoai != "") {


                const audioUrl = await uploadMP3();
                const url = await uploadImage()


                Call_Post_Api({
                    music_name: name,
                    music_genre: theLoai,
                    img: url,
                    url: audioUrl,
                    tacgia: tacgia,
                    user_id: cleanId
                },
                    cleanedJwtString, cleanId,
                    '/music/createMusic'

                ).then(() => {
                    setName("")
                    setTheLoai("")
                    setImageUrl("")
                    setFileValue("")
                    setIsLoad(false)
                    message.success(`Tải nhạc thành công!!!`);

                })
            } else {
                setIsLoad(false)
                message.error(`Nhập đầy đủ thông tin!!!!`);
            }


        } catch (error) {
            console.error('MP3 upload failed:', error);
        }
    };



    return (
        <div>
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
            <div style={{
                width: '100%',
                marginTop: '20px',
                marginBottom: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: 0,
                margin: 0

            }}>

                <div style={{
                    backgroundImage: 'url("https://stc-id.nixcdn.com/v11/upload_v3/images/bg_upload_full.png")',
                    width: '80%',
                    height: '600px',
                    textAlign: 'center',
                    backgroundRepeat: 'no-repeat',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center',    // Center vertically
                    display: 'flex',
                    marginLeft: '300px',
                    marginTop: '100px'

                }}>

                    <div style={{
                        textAlign: 'center',
                        marginLeft: '-200px'
                    }}>
                        <div style={{
                            marginTop: '-100px',
                            marginBottom: '30px'
                        }}>
                            Thông tin bài nhạc
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontSize: '18px',
                            marginBottom: '20px'
                        }}>
                            <div>
                                Tên bài hát
                            </div>
                            <div style={{
                                width: '300px',
                                marginLeft: '20px'
                            }}>
                                <Input onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontSize: '18px',
                            marginBottom: '20px'
                        }}>
                            <div>
                                Tác giả
                            </div>
                            <div style={{
                                width: '300px',
                                marginLeft: '50px'
                            }}>
                                <Input onChange={(e) => setTacgia(e.target.value)} />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontSize: '18px',
                            marginBottom: '20px'
                        }}>
                            <div>
                                Thể Loại
                            </div>
                            <div style={{
                                width: '300px',
                                marginLeft: '40px'
                            }}>
                                <Input onChange={(e) => setTheLoai(e.target.value)} />
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontSize: '18px',
                            marginBottom: '30px'

                        }}>
                            <div>
                                Nhạc
                            </div>
                            <div style={{
                                marginLeft: '65px'
                            }}>
                                {/* <Upload {...uploadProps} className={styles['your-custom-classname']} onChange={handleFileInputChange}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload> */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileInputChange}
                                />
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontSize: '18px',
                            marginBottom: '20px',
                            marginLeft: '-1px',
                        }}>
                            <div>
                                Ảnh
                            </div>
                            <div style={{
                                marginLeft: '80px'
                            }}>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-circle"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </div>
                        <Button type="primary" onClick={handleUpload}>Upload MP3</Button>
                        {/* <div>{soures}</div> */}
                    </div>

                </div>
            </div >
            {/* luwu ys */}

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '60px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '80%',
                    fontSize: '17px'
                }}>
                    <div>
                        <span style={{
                            fontSize: '23px',
                            fontWeight: 500
                        }}>
                            Hướng dẫn:
                        </span> <br />
                        - Tài khoản đã được kích hoạt và đăng nhập thành công. <br />

                        - File upload không quá 120Mb, bit-rate 128kbs trở lên. <br />

                        - Định dạng file upload: .mp3, .wma, .mp2, .asf, .wav, .wmv, .mp4, .flv, .mpg, .mpe, .avi, .3gp, .dat, .flac. <br />

                        - Thời gian kiểm duyệt: 72 giờ (User Thường) và 12 giờ (User VIP). <br />

                        - Hình ảnh bài hát (cover) phải có kích thước ít nhất là 640x640 pixel, hình ảnh video (cover) phải có kích thước ít nhất là 840x472 pixel. <br />
                    </div>
                    <div>
                        <span style={{
                            fontSize: '23px',
                            fontWeight: 500
                        }}>

                            Quy định: <br />
                        </span>
                        - Bài hát đăng tải vi phạm nội dung cung cấp trong Thỏa thuận sử dụng sẽ bị xóa khỏi hệ thống và tài khoản sẽ bị xóa vĩnh viễn. <br />

                        - Hình ảnh có nội dung không phù hợp sẽ bị xóa. <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadMusic;
