import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { colors } from '../../consts';

const FormInput = ({
    value,
    containerStyle,
    label, 
    labelStyle,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType='default',
    autoCompleteType='off',
    autoCapitalize='none',
    errorMsg=''
}) => {
    return (
        <View style={{...containerStyle}}>
            <View style={styles.formContainer}>
               <Text style={styles.label}>
                   {label}
               </Text>
               <Text style={styles.errorStyle}>
                   {errorMsg}
               </Text>
            </View>
            <View style={styles.prependStyle}>
                {prependComponent}
                <TextInput 
                    value={value}
                    style={{flex: 1, ...inputStyle}}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray2}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                />
                {appendComponent}
            </View>
        </View>
    );
};

export default FormInput;


const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: colors.gray1,
    },
    errorStyle: {
        color: colors.purple,
    },
    prependStyle: {
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 25,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: colors.gray6
    },
})