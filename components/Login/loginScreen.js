import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from './components/Background';
import Logo from './components/Logo';
import Header from './components/Header';
import Button from './components/Button';
import TextInput from './components/TextInput';
import BackButton from './components/BackButton';
import { theme } from '../../themes/theme';
import { nameValidator, passwordValidator } from '../../until/utils';
import { getUserProfile } from '../../actions/loginActions';
import stores from '../../stores'

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const usernameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      console.log('Username : ' + username.value)
      console.log('Password : ' + password.value)
      Promise.all([
        getUserProfile({ username: username.value, password: password.value }),
        // hydrate('auth', stores.auth)
      ]).then((response) => {
          if (response[0].data.success) {
              console.log("Token : " + response[0].data.token)
              stores.auth.updateToken(response[0].data.token)
              navigation.navigate('Home')
              // authStore.updateToken(response[0].data.token)
          } else {
            alert("Warning Message : " + response[0].data.errorMsg)
          }
        })
    }
  };

  return (
    <Background>
      <Logo />
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        // autoCompleteType="Username"
        // textContentType="Username"
        // keyboardType="Username"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={_onLoginPressed}>
          Login
      </Button>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('ForgotPasswordScreen')}
          onPress={() => alert('Forgot Password')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      
{/* 
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
