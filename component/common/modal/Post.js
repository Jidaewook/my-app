import React, {useState, useRef} from 'react';
import {View, Text, Modal, TouchableWithoutFeedback, StyleSheet, SafeAreaView, Keyboard, TextInput} from 'react-native';
import axios from 'axios';

import { colors, fonts, sizes,  } from '../../../consts';
import HLine from '../HLine';


const Post = ({visible, close, complete}) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tag, setTag] = useState('');

    const [inquire, setInquire] = useState('게시판');
    const [list, setList] = useState('게시판');
    const [value, setValue] = useState('');
    const [show, setShow] = useState(true);

    const refRBSheet = useRef();

    const postCategory = ['자유게시판', '질문게시판', '합격수기'];

    const openBottom = () => {
        refRBSheet.current.open();
    }

    const closeBottom = () => {
        refRBSheet.current.close();
    }

    const DismissKeyboard = ({children}) => (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            {children}
        </TouchableWithoutFeedback>
    )

    const UselessTextInput = (props) => {
        return (
            <TextInput 
                {...props}
                editable
                maxLength={2000}
                multiline={true}
            />
        )
    }

    const inquireMenu = (param) => {
        if(param === '자유게시판') {
            setInquire("bbs")
            setList("자유게시판")
        } else if (param === '자유게시판') {
            setInquire('qnas')
            setList('질문게시판')
        } else if (param === '합격수기') {
            setInquire('pass')
            setList('합격수기')
        }
        closeBottom();
    }

    const registerPost = () => {
        const userData = {
            category: list, 
            title: title,
            desc: desc,
            tag: tag
        }

        if(inquire === "게시판" || "title" === "" || desc === ""){
            return alert("빈 칸이 있으면 등록할 수 없습니다.")
        }

        axios 
            .post('http://localhost:8081/bbs', userData)
            .then(() => {

            })
            .catch(err => console.log("Error", err))
    }
    
    return (
        <DismissKeyboard>
            <Modal
                animationType="slide"
                visible={show}
                onRequestClose={setShow(false)}
                presentationStyle={'overFullScreen'}
            >
                {/* <SafeAreaView
                    style={styles.Container}
                >
                    <View
                        style={styles.ContainerView}
                    >
                        <Text>
                            글쓰기
                        </Text>
                    </View>
                </SafeAreaView> */}

            </Modal>
        </DismissKeyboard>
    );
};

export default Post;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: colors.white
    },
    ContainerView: {
        marginTop: sizes.sideLine, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: colors.white
    },
    ModalTitle: {
        // ...fonts.h2,
        // fontWeight: 'bold', 
        // colors: colors.black
    }
})