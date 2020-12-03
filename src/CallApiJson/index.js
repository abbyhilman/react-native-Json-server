import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImagePicker from 'react-native-image-picker'
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Item = ({ name, email, field, onPress, onDelete }) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={onPress} style={styles.desc}>
                <View >
                    <Text style={styles.descName}>{name}</Text>
                    <Text style={styles.descEmail}>{email}</Text>
                    <Text style={styles.descField}>{field}</Text>
                </View>
            </TouchableOpacity>
            {/* <Image source={{ uri: `https://api.adorable.io/avatars/285/10@adorable.io.png` }} style={styles.avatar} /> */}
            <TouchableOpacity onPress={onDelete}>
                <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
        </View>
    )
}
const CallApiJson = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [field, setField] = useState("");
    const [users, setUsers] = useState([]);
    const [gallery, setGallery] = useState(null);
    const [button, setButton] = useState("Save");
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const submit = () => {
        const data = {
            name, email, field
        }
        if (button === "Save") {
            Axios.post('http://125.160.225.148:3004/users', data)
                .then(res => {
                    console.log(res)
                    setName("");
                    setEmail("");
                    setField("");
                    setGallery(null);
                    getData();

                })
        } else {
            Axios.put(`http://125.160.225.148:3004/users/${selectedUser.id}`, data)
                .then(res => {
                    console.log('res update: ', res)
                    setName("");
                    setEmail("");
                    setField("");
                    getData();
                    setButton("Save");
                })
        }
    }

    const getData = () => {

        Axios.get('http://10.0.2.2:3004/users')
            .then(res => {
                setUsers(res.data)
                console.log('res getData: ', res);

            })
    }

    const selectItem = (item) => {
        console.log('select item: ', item)
        setSelectedUser(item);
        setName(item.name);
        setEmail(item.email);
        setField(item.field);
        setButton("Update");
    }

    const deleteItem = (item) => {
        console.log('delete item: ', item)
        Axios.delete(`http://10.0.2.2:3004/users/${item.id}`)
            .then(res => {
                console.log('res delete: ', res)
                getData();
            })
    }


    return (
        <View style={styles.container}>
            <Text style={styles.Texttitle}>Local API ( JSON Server )</Text>
            <Text style={styles.TextName}>Insert Member For Test</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={(text) => setName(text)} />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="field" style={styles.input} value={field} onChangeText={(text) => setField(text)} />
            <Button
                title="Select image"
                onPress={() =>
                    ImagePicker.launchImageLibrary(
                        {
                            mediaType: 'photo',
                            includeBase64: false,
                            maxHeight: 200,
                            maxWidth: 200,
                        },
                        (gallery) => {
                            setGallery(gallery);
                        }
                    )
                }
            />
            <Text>Res: {JSON.stringify(gallery)}</Text>
            {gallery && (

                <Image style={styles.avatar} source={{ uri: gallery.uri }} />

            )}
            <Button title={button} onPress={submit} />
            <View style={styles.line} />
            {users.map(user => {
                return (
                    <Item
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        field={user.field}
                        onPress={() =>
                            selectItem(user)}
                        onDelete={() => Alert.alert(
                            'Warning',
                            'Are you sure delete this user ?',
                            [
                                {
                                    text: 'No',
                                    onPress: () => console.log('No Button')
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => deleteItem(user)
                                }
                            ]
                        )}
                    />
                )

            })}
            {console.log(users)}

        </View>
    )
}

export default CallApiJson

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    Texttitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    line: {
        height: 2,
        backgroundColor: 'black',
        marginVertical: 20
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 80
    },
    input: {
        borderWidth: 1,
        marginBottom: 12,
        borderRadius: 25,
        paddingHorizontal: 18,
    },
    TextName: {
        textAlign: 'center',
        marginVertical: 20,
        color: 'blue'
    },
    itemContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20,
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderRadius: 5
    },
    desc: {
        marginLeft: 18,
        flex: 1,
    },
    descName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    descEmail: {
        fontSize: 16
    },
    descField: {
        fontSize: 12,
        marginTop: 8
    },
    delete: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    }
})
