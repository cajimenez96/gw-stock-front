import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/authApi"
import decodeToken from "../utils/decodeToken";
import { loginUser } from "../redux/services/authSlice";


export const useAuthService = () => {
  const [userLogin] = useLoginMutation();

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
  
  return { loginUserService };
}