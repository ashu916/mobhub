import React from 'react';
import {useState,useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
  
} from 'react-native';
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function NewSignUpScreen({navigation}) {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('')
const [cPassword,setCPassword]=useState('')
const [customError,setCustomError]=useState('')
const[isgmail,setIsgmail] = useState(false)
const[successmsg,setSuccessmsg] =useState(null)
const[submitSpinner,setSubmitSpinner] = useState(false)

 const handleEmailChange = (text) => {
    if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(text)) {
      setEmail(text);
      setCustomError('')
    }else if((/^[a-zA-Z0-9._%+-]+@[a-fh-zA-FH-Z]/.test(text))){setCustomError('only Gmail addresses are allowed')
  setEmail('gmail')}
  };

//signup function 
const handleSignup = () => {
if (password != cPassword) {
  // alert("Password doesn't match");
  setCustomError("Password doesn't match");
  return;
}
else if (phone.length != 10) {
  setCustomError("Phone number should be 10 digit");
  return;
}


try {
  auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
          console.log(userCredentials?.user.uid);
          console.log('user created')
          // setSuccessmsg('User created successfully')
          if (userCredentials?.user.uid != null) {
              const userRef = firestore().collection('UserData')
              userRef.add(
                  {
                      email: email,
                      password: password,
                      // cpassword: cpassword,
                      phone: phone,
                      name: name,
                    
                      uid: userCredentials?.user?.uid,
                  }
              ).then(() => {
                  console.log('data added to firestore')
                  setSuccessmsg('User created successfully')
              }).catch((error) => {
                  console.log('firestore error ', error)
              }

              )
          }


      })
      .catch((error) => {
          console.log('sign up firebase error ', error.message)
          if (error.message == '[auth/email-already-in-use] The email address is already in use by another account.') {
              setCustomError('Email already exists')
          }
         else if (error.message == '[auth/invalid-email] The email address is badly formatted.') {
              setCustomError('Invalid Email')
          }
          else if (error.message == '[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]') {
              setCustomError('Password should be at least 6 characters')
          }
          else {
              setCustomError(error.message)
          }
      })
}
catch (error) {
  console.log('sign up system error ', error.message)
}


}

//signup function












if(successmsg==null){

  return (
    
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
   

      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>A.L</Text>
            </View>
            <Text style={styles.loginTitleText}>SignUp</Text>
            <View style={styles.hr}></View>
<View style={{justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:15,color:'red'}}>{customError}</Text></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
               onChangeText={(e) => setName(e)}
               returnKeyType="next"
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
              />


            </View>


            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Gmail</Text>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText={handleEmailChange}
                ref={(input) => { this.secondTextInput = input; }}
                returnKeyType="next"
                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
              />
            </View>



            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                keyboardType='number-pad'
                
                onChangeText={(e) => setPhone(e)}
                ref={(input) => { this.thirdTextInput = input; }}
                returnKeyType="next"
                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
              />
            </View>
          


            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry={true}
                textContentType='password'
                onChangeText={(e)=>setPassword(e)}
               
                returnKeyType="next"
                onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                ref={(input) => { this.fourthTextInput = input; }}
              />


            </View>


            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
               ref={(input) => { this.fifthTextInput = input; }}
               
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry={true}
               onChangeText={(e) => setCPassword(e)}
              />
</View>





            <TouchableOpacity style={styles.CreateButton}
            onPress={()=> {handleSignup();
            setSubmitSpinner(true)
            }}    >
              <Text style={styles.loginButtonText}>Create Account</Text>
              {submitSpinner? (<ActivityIndicator style={{position:'absolute',right:30,top:15
            }} color = "black" size = "small" />) : null}
            </TouchableOpacity>
          
          </View>
        </View>
      </View>

    </TouchableWithoutFeedback>
    )
}else{
return(<View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#fe2959',flex:1
}
}>
  
  <Text style={styles.dataText}>Name : {name}</Text>
  <Text style={styles.dataText}>Email : {email}</Text>
  <Text style={styles.dataText}>Phone : {phone}</Text>
  
<Text style={{fontSize:25,color:'white',fontWeight:'bold',position:'absolute',top:50}}>User Created Successfully</Text>
<TouchableOpacity style={styles.loginButton} 
onPress={()=> navigation.navigate('WelcomeScreen')}
><Text style={styles.loginButtonText}>Log In</Text></TouchableOpacity></View>)
}
  };


const styles = StyleSheet.create({
  container: {
  flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#16ccf8',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#16ccf8',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '10%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#0f6cf7',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  address: {
    width: '100%',
    height: 80,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#48f442',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width:100,
    elevation:10
    
  },
  CreateButton: {
    backgroundColor: '#21c0e2',

    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    
    elevation:10
    
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  btn:{

    backgroundColor:'#48f442',
    width:200,
    height:35,
fontSize:25,
fontWeight:'bold',
color:'black',
textAlign:'center',
borderRadius:20,
elevation:50,
borderWidth:2,
borderColor:'white',

  },
  dataText:{
    fontSize:25,
    color:'white',
    fontWeight:'bold',
    marginVertical:20
  }
});