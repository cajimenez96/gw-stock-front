import { FieldValues } from "react-hook-form";
import { useLoginMutation, useRegisterMutation, useRegisterNewUserMutation } from "../redux/features/authApi"
import decodeToken from "../utils/decodeToken";
import { loginUser } from "../redux/services/authSlice";


export const useAuthService = () => {
  const [userLogin] = useLoginMutation();
  const [userRegistration] = useRegisterMutation();
  const [newUserRegistration] = useRegisterNewUserMutation();


  const loginUserService = async (data: FieldValues, dispatch: any) => {
    try {
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }))
        return ({success: true});
      }
    } catch (error: any) {
      throw new Error(error?.data?.message || 'Login failed');
    }
  }

  const registerUserService = async (data: FieldValues) => {
    try {
      const res = await userRegistration(data).unwrap();

      if (res.statusCode === 201) {
        return ({success: true});
      }
    } catch (error: any) {
      throw new Error(error?.data?.message || 'Register failed');
    }
  }

  const registerNewUserService = async (data: any) => {
    try {
      const res = await newUserRegistration(data).unwrap();

      if (res.statusCode === 201) {
        return ({success: true});
      }
    } catch (error: any) {
      throw new Error(error?.data?.message || 'Register failed');
    }
  }
  
  return {
    loginUserService,
    registerUserService,
    registerNewUserService
  };
}