import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

const CallApiVanilla = () => {
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
        fetch('https://reqres.in/api/users/2')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setDataUser(json.data)
            })
    }
    const postData = () => {
        const dataForApi = {
            name: "morpheus",
            job: "leader",
        }
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForApi)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setDataJobs(json)
            }
            )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.Texttitle}>Call Api dengan Vanilla JS</Text>
            <Button title="GET DATA" onPress={getData} />
            <Text>Response GET DATA Dummy</Text>
            <Image source={{ uri: dataUser.avatar }} style={styles.avatar} />
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

export default CallApiVanilla

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
