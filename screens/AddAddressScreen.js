import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  console.log("userId", userId);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);
  const fetchAddresses = async () => {
    try {
      try {
        console.log("userid  is ", userId);
        fetch(`http://10.0.2.2:8000/addresses/${userId}`)
          .then(res => res.json())
          .then(response => {
            const addre = (response.addresses);
            setAddresses(addre);
            // console.log("address is ==> ", addresses);
          })

      } catch (error) {
        console.log("error message", error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("addresses", addresses);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0 }}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <Image
            style={{ width: 25, height: 25, marginLeft: 10 }}
            source={require('../icon/search.png')}
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>

        <Image
          style={{ width: 30, height: 30, marginLeft: 20, marginRight: 10 }}
          source={require('../icon/mic.png')}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <Image
            style={{ width: 25, height: 25, marginLeft: 20, marginRight: 10 }}
            source={require('../icon/right-arrow.png')}
          />
        </Pressable>

        <Pressable>
          {/* all the added adresses */}
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Image
                  style={{ width: 25, height: 25, marginLeft: 10 }}
                  source={require('../icon/location1.png')}
                />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.landmark}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                India, Jaunpur
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {item?.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                pin code : {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
