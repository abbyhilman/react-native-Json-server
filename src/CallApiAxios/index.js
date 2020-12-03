import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

const CallApiAxios = () => {
    const [dataUser, setDataUser] = useState({
        avatar: '',
        email: '',
        first_name: '',
        last_name: ''
    })
    const [dataJobs, setDataJobs] = useState({
        name: '',
        job: '',
    })
    useEffect(() => {
        // Call API Method Get
        // fetch('https://reqres.in/api/users/2')
        //     .then(response => response.json())
        //     .then(json => console.log(json))

        // Call API Method POST
        // const dataForApi = {
        //     name: "morpheus",
        //     job: "leader",
        // }
        // fetch('https://reqres.in/api/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(dataForApi)
        // })
        //     .then(response => response.json())
        //     .then(json => { console.log(json) }
        //     )
    }, []);

    const getData = () => {
        // fetch('https://reqres.in/api/users/2')
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json)
        //         setDataUser(json.data)
        //     })
        Axios.get('https://reqres.in/api/users/3')
            .then(result => {
                setDataUser(result.data.data)
            })
            .catch(err => console.log('err: ', err))
    }
    const postData = () => {
        const dataForApi = {
            name: "morpheus",
            job: "leader",
        }
        // fetch('https://reqres.in/api/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(dataForApi)
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json)
        //         setDataJobs(json)
        //     })
        Axios.post('https://reqres.in/api/users', dataForApi)
            .then(result => {
                setDataJobs(result.data)
            })
            .catch(err => console.log('err: ', err))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.Texttitle}>Call Api dengan Axios</Text>
            <Button title="GET DATA" onPress={getData} />
            <Text>Response GET DATA Dummy</Text>
            {dataUser.avatar.length > 0 && (
                <Image source={{ uri: dataUser.avatar }} style={styles.avatar} />
            )}
            <Text>{`${dataUser.first_name} ${dataUser.last_name}`}</Text>
            <Text>{dataUser.email}</Text>
            <View style={styles.line} />
            <Button title="POST DATA" onPress={postData} />
            <Text>Response POST DATA Dummy</Text>
            <Text>{dataJobs.name}</Text>
            <Text>{dataJobs.job}</Text>
        </View>
    )
}

export default CallApiAxios

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    Texttitle: {
        textAlign: "center",
    },
    line: {
        height: 2,
        backgroundColor: 'black',
        marginVertical: 20
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
})
