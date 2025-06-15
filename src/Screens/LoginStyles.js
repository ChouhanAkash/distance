import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 0.5,
  },
  logo: {
    width:80 ,
    height: 100,
    alignSelf: 'center',
  },
  deliveryText: {
    color: 'white',
    fontSize: 1.7,
    textAlign: 'center',
    top: -1,
    letterSpacing: 1.4,
  },
  authContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  googleBtn: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  googleBtnText: {
    color: 'black',
    fontSize: 1.7,
    fontWeight: '700',
  },
  inputWrapper: {
    marginTop: 20,
  },
  phoneInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    color: 'white',
  },
  sendOtpBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    borderRadius: 8,
  },
  verifyBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
