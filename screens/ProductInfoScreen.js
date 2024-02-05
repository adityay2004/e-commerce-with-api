import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    ImageBackground,
    Dimensions,
    Image
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

import { useNavigation, useRoute } from "@react-navigation/native";
const ProductInfoScreen = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const navigation = useNavigation();
    const [addedToCart, setAddedToCart] = useState(false);
    const height = (width * 100) / 100;
    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
          setAddedToCart(false);
        }, 60000);
      };
      const cart = useSelector((state) => state.cart.cart);
      console.log(cart);
    return (
        <ScrollView
            style={{ marginTop: 0, flex: 1, backgroundColor: "white" }}
            showsVerticalScrollIndicator={false}
        >
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params.carouselImages.map((item, index) => (
                    <ImageBackground
                        style={{ width, height, marginTop: 25, resizeMode: "contain" }}
                        source={{ uri: item }}
                        key={index}
                    >
                        <View
                            style={{
                                padding: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#C60C30",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontWeight: "600",
                                        fontSize: 12,
                                    }}
                                >
                                    20% off
                                </Text>
                            </View>

                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#E0E0E0",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Image
                                    style={{ width: 30, height: 30, }}
                                    source={require('../icon/share.png')}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop: "auto",
                                marginLeft: 20,
                                marginBottom: 20,
                            }}
                        >
                            <Image
                                style={{ width: 30, height: 30, }}
                                source={require('../icon/heart.png')}
                            />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    {route?.params?.title}
                </Text>

                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
                    ₹{route?.params?.price}
                </Text>
            </View>

            <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Color: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route?.params?.color}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route?.params?.size}
                </Text>
            </View>

            <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
                    Total : ₹{route.params.price}
                </Text>
                <Text style={{ color: "#00CED1" }}>
                    FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 5,
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    <Image
                        style={{ width: 30, height: 30, marginLeft: 20, marginRight: 10 }}
                        source={require('../icon/location.png')}
                    />

                    <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        Deliver To Aditya - Jaunpur 222132
                    </Text>
                </View>
            </View>

            <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
                IN Stock
            </Text>

            <Pressable
                onPress={() => addItemToCart(route?.params?.item)}
                style={{
                    backgroundColor: "#FFC72C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
            >
                {addedToCart ? (
                    <View>
                        <Text>Added to Cart</Text>
                    </View>
                ) : (
                    <Text>Add to Cart</Text>
                )}
            </Pressable>

            <Pressable
            
                style={{
                    backgroundColor: "#FFAC1C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
            >
                <Text>Buy Now</Text>
            </Pressable>
        </ScrollView>
    );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
